const User = require("../Models/user");
const bCrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { generatePassword } = require("../utils/apiUtils");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MESSAGE_EMAIL,
    pass: process.env.PASS_EMAIL, /// 2 step verification account, Generate another passWord
  },
});

const notifyPassword = async ({ email, newPassword, res }) => {
  let mailOptions;
  if (!newPassword) {
    mailOptions = {
      from: process.env.MESSAGE_EMAIL,
      to: email,
      subject: `Your email has been blocked to access  A-Project`,
      text: `your current password is not working anymore`,
    };
  } else {
    mailOptions = {
      from: process.env.MESSAGE_EMAIL,
      to: email,
      subject: `Your email has access to A-Project`,
      text: `Here is your password assigned ${newPassword}`,
    };
  }

  await transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return res.status(302).json({ msg: "Something went wrong" });
    } else {
      return res.status(200).json({ msg: "Email send" });
    }
  });
};

const createUserAndNotifyAccount = async ({ newUser, res, newPassword }) => {
  const email = newUser.email;
  await newUser.save().then(() => {
    notifyPassword({ email, res, newPassword });
  });
};

const createUserAndBlockAccount = async ({ newUser, res }) => {
  await newUser.save().then(() => {
    return res.status(200).json({ msg: "New user created and not notified" });
  });
};

const updateUserAndNotifyAccount = async ({ email, newPassword, res }) => {
  notifyPassword({ email, res, newPassword });
};

/////////////////////////////////////////////////////////////////////////////// Controllers

const controller = {
  getAllUser: async (req, res, next) => {
    const getAllUser = await User.find();
    return res.status(200).json({ getAllUser });
  },
  getAllManager: async (req, res, next) => {
    const getAllManagers = await User.find({ role: "Manager" });
    return res.status(200).json({ getAllManagers });
  },
  registerNewUserAccount: async (req, res, next) => {
    const {
      name,
      email,
      lastName,
      occupation,
      role,
      userImage,
      status,
      manager,
    } = req.body;

    if ((!name, !email, !lastName, !occupation))
      return res.status(401).json({ msg: "Complete all fields" });
    const user = await User.findOne({ email });
    if (user) return res.status(401).json({ msg: "Email already exist" });

    const newPassword = generatePassword();
    const passwordHash = await bCrypt.hash(newPassword, 10);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      lastName,
      occupation,
      role,
      status,
      manager,
    });

    if (status === "public") {
      createUserAndNotifyAccount({ newUser, res, newPassword });
    }
    if (status === "private") {
      createUserAndBlockAccount({ newUser, res });
    }
  },

  updateUserAccount: async (req, res, next) => {
    const {
      name,
      email,
      lastName,
      occupation,
      role,
      userImage,
      status,
      manager,
    } = req.body;

    const newPassword = generatePassword();
    const passwordHash = await bCrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(
      { _id:req.params.id },
      {
        name,
        email,
        lastName,
        occupation,
        role,
        userImage,
        status,
        password: passwordHash,
        manager,
      }
    ).catch((err)=>{
        return next(err)
    })

    if (status === "public") {
      updateUserAndNotifyAccount({ email, newPassword, res });
    }
    if (status === "private") {
      notifyPassword({ email, res });
    }
  },
  deleteUserAccount: async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id)
      .then(() => {
        res.json({ msg: "User account deleted" });
      })
      .catch((err) => {
        return next({ msg: "not found" });
      });
  },
};

module.exports = controller;
