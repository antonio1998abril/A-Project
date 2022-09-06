const User = require("../Models/user");

const controller = {
  getInfoCollaborator: async (req, res, next) => {
   
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(400).json({ msg: "Error to get user." });
    res.json(user);
  },
  
  /* getAllManager: async (req, res, next) => {
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
      userImage
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

    const user = await User.findOne({email});

    const newPassword = generatePassword();
    const passwordHash = await bCrypt.hash(newPassword, 10);

    let saveUser = {
      name,
      email,
      lastName,
      occupation,
      role,
      userImage,
      status,
 
      manager,
    };
    if (status === "private") saveUser["password"] = passwordHash;
    if (user.status !== status && status === "private")
      notifyPassword({ email, res });
    if (user.status !== status && status === "public")
      updateUserAndNotifyAccount({ email, newPassword, res });

    await User.findByIdAndUpdate({ _id: req.params.id }, saveUser).catch(
      (err) => {
        return next(err);
      }
    );
  },
  deleteUserAccount: async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id)
      .then(() => {
        res.json({ msg: "User account deleted" });
      })
      .catch((err) => {
        return next({ msg: "not found" });
      });
  }, */
};

module.exports = controller;
