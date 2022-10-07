const User = require("../Models/user");
const Rooms = require("../Models/chatRoom");
const Comment = require("../Models/dailyComment");

const controller = {
  getChatRooms: async (req, res, next) => {
    const getAllChats = await User.find({ _id: req.user.id })
      .populate()
      .select("chatRoom -password")
      .catch(next);
    res.json(getAllChats);
  },
  postComment: async (req, res, next) => {
    const { content } = req.body;
    if (!content)
      return res.status(302).json({ msg: "Content message is necessary" });

    const newMessage = new Rooms({
      content: content,
    });
    await newMessage
      .save()
      .then(() => {
        return res.json({ msg: "New comment added" });
      })
      .catch(next);
  },

  /* Daily comments */

  getDailyComment: async (req, res, next) => {
    const getAllComments = await Comment.find({ user: req.user.id })
      .catch(next);
    res.json(getAllComments);
  },
  postDailyComment: async (req, res, next) => {
    const { content } = req.body;
    if (!content)
      return res.status(302).json({ msg: "Content message is necessary" });
    const newDailyComment = new Comment({
      content: content,
      commentTo: req.params.id,
      user: req.user.id,
    });
    await newDailyComment
      .save()
      .then(() => {
        return res.json({ msg: "New comment added" });
      })
      .catch(next);
  },
  deleteDailyComment: async (req, res, next) => {},
  /*
  updateAct: async (req, res, next) => {
    const {
      description,
      observable,
      subject,
      dateToComplete,
      collaborator_id,
      statusDone,
      importanceLevel,
      evidenceImage
    } = req.body;

    await Act.findByIdAndUpdate(
      { _id: req.params.id },
      { description, observable, subject, dateToComplete, collaborator_id, statusDone,importanceLevel,evidenceImage }
    )
      .then(() => {
        return res.json({ msg: "Activity updated" });
      })
      .catch(next);
  },
  deleteAct: async (req, res, next) => {
    await Act.findByIdAndRemove({ _id: req.params.id })
      .then(async () => {
        return res.json({ msg: "activity deleted" });
      })
      .catch(next);
  },

  DoneAct: async (req, res, next) => {
    await Act.findByIdAndUpdate(
      { _id: req.params.id },
      { StatusDone: true }
    ).then(() => {
      return res.json({ msg: "Activity done" });
    });
  }, */
};

module.exports = controller;
