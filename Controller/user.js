const User = require("../Models/user");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MESSAGE_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});

const generatePassword = () => {  
  const Allowed = {
    Uppers: "QWERTYUIOPASDFGHJKLZXCVBNM",
    Lowers: "qwertyuiopasdfghjklzxcvbnm",
    Numbers: "1234567890",
    Symbols: "!@#$%^&*"
}
let length = 8; // password will be @Param-length, default to 8, and have at least one upper, one lower, one number and one symbol
const getRandomCharFromString = (str) => str.charAt(Math.floor(Math.random() * str.length))
    let pwd = "";
    pwd += getRandomCharFromString(Allowed.Uppers); //pwd will have at least one upper
    pwd += getRandomCharFromString(Allowed.Lowers); //pwd will have at least one lower
    pwd += getRandomCharFromString(Allowed.Numbers); //pwd will have at least one number
    pwd += getRandomCharFromString(Allowed.Symbols);//pwd will have at least one symbolo
    for (let i = pwd.length; i < length; i++)
        pwd += getRandomCharFromString(Object.values(Allowed).join('')); //fill the rest of the pwd with random characters
    return pwd

};

const verifyPass = (pass) => {
  let charCheck = pass.length > 7 && pass.length < 31;
  let capitalCheck = /[A-Z]/g.test(pass);
  let numberCheck = /[0-9]/g.test(pass);
  let symbolCheck = /[,?!:;.@#%]/g.test(pass);
  return charCheck && capitalCheck && numberCheck && symbolCheck;
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

// Controllers

const controller = {
  register: async (req, res, next) => {
    console.log(req.body);

    const { name, email, lastName, password, role, repeatPassword } = req.body;

    if (password != repeatPassword)
      return res.status(401).json({ msg: "Passwords do not match" });

    const user = await User.findOne({ email });
    if (user) return res.status(401).json({ msg: "Email already exist" });

    if (!verifyPass(password))
      return res.status(400).json({
        msg: "Create a password with numbers, using these symbols , ? ! : ; . @ # % and capital letters one o more letters",
      });
    const passwordHash = await bCrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
      lastName,
      role,
    });
    await newUser
      .save()
      .then((result) => {
        const accessToken = createAccessToken({
          id: newUser._id,
          email: newUser.email,
        });
        const refreshToken = createRefreshToken({
          id: newUser._id,
          email: newUser.email,
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/api/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        });
        res.json({ accessToken });
      })
      .catch((err) => {
        return next(err);
      });
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ msg: "User does not exist." });

    const isMatch = await bCrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ msg: "Incorrect password." });

    const accessToken = createAccessToken({ id: user._id, email: user.email });
    const refreshToken = createRefreshToken({
      id: user._id,
      email: user.email,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });
    res.json({ accessToken });
  },

  logout: async (res, next) => {
    res.clearCookie("refreshToken", { path: "/api/refresh_token" });
    return res.json({ msg: "Logged out" }).catch(next);
  },

  refreshToken: async (req, res, next) => {
    const rf_token = req.cookies.refreshToken;
    if (!rf_token)
      return res.status(302).json({ msg: "Please Login or Register" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(302).json({ msg: "Please Login or Register" });

      const accessToken = createAccessToken({ id: user.id, email: user.email });
      res.json({ accessToken });
    });
  },

  getInfo: async (req, res, next) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(400).json({ msg: "Error to get user." });
    res.json(user);
  },

  getRole: async (err, req, res, next) => {
    const user = await User.findById(req.user.id).select("role -_id");
    if (!user) return res.status(400).json({ msg: "Error to get role." });
    res.json(user);
    next(err);
  },

  restorePassword: async () => {
    const user = await User.findById(req.user.id).select("email -_id");
    /*     let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    }); */
    const newPassword = generatePassword()
    console.log(user);
    console.log(newPassword);

    let mailOptions = {
      from: process.env.MESSAGE_EMAIL,
      to: user,
      subject: `PassWord ReStore`,
      text: `New Password ${State.Activityname}`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("No sent");
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};

module.exports = controller;
