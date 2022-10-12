import React, { useContext, useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";
import LoadMore from "../components/LoadMore";
import { AuthContext } from "../context";
let socket;
import io from "socket.io-client";
import axios from "axios";
import { chatService } from "../service/chatServices";
socket = io();

function Messenger() {
  const state = useContext(AuthContext);
  const [itemsDashBoard, setItemsDashBoard] = state.User.itemsDashBoard;
  const [userId] = state.User.userId;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const divRef = useRef(null);
  const { getChats, postComments } = chatService();
  const [chatListUser, setChatListUser] = useState([]);
  const [userInfoLogged, setUserInfoLogged] = useState({});

  /* Selected ChatRoom */
  const [currentSelectChat, setCurrentSelectChat] = useState({});

  const getAllChats = async () => {
    const res = await getChats(userId);
    setChatListUser(res.data?.chatRoom);
    setUserInfoLogged(res.data);
  };

  const getChatRoom = ({ item }) => {
    const FindIDRoom = chatListUser.find((obj) => {
      return obj._id === item._id;
    });
    setCurrentSelectChat(FindIDRoom._id);
  };

  const socketInitializer = async () => {
    await axios("/api/socket");

    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", receiveMessage);
    divRef.current.scrollIntoView({ behavior: "smooth" });

    return () => {
      socket.off("update-input", socketInitializer);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
      chatRoom: currentSelectChat
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
    socket.emit("update-input", newMessage.body,newMessage.chatRoom);
  };

  useEffect(() => {
    socketInitializer();

    return () => {
      socket.off("update-input", socketInitializer);
    };
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getAllChats();
    }, 2500);
    return () => clearTimeout(timer);
  }, [userId]);

  return (
    <>
      <div className="card">
        <div className="row g-0">
          <div className="col-12 col-lg-5 col-xl-3 border-end">
            <div className="px-4 d-none d-md-block">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <input
                    type="text"
                    className="form-control my-3"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>

            {chatListUser.map((item) => {
              return (
                <div
                  onClick={() => getChatRoom({ item })}
                  type="submit"
                  className="p-2 border-bottom"
                  key={item._id}
                >
                  <a href="#!" className="d-flex justify-content-between">
                    <div className="d-flex flex-row">
                      {/* <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      /> */}

                      {item?.guestUserB?.userImage?.url ? (
                        <img
                          src={item?.guestUserB?.userImage?.url}
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          alt="Sharon Lessman"
                          width="60"
                          height="50"
                        />
                      ) : (
                        <img
                          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          alt="Sharon Lessman"
                          width="60"
                          height="50"
                        />
                      )}

                      <div className="pt-1">
                        <p className="fw-bold mb-0">
                          {item?.guestUserB?.name} {item?.guestUserB?.lastName}
                        </p>
                        <p className="small text-muted">
                          {/*  Hello, Are you there? */}
                        </p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-muted mb-1">Just now</p>
                      <span className="badge bg-danger float-end">1</span>
                    </div>
                  </a>
                </div>
              );
            })}

            <hr className=" d-block d-lg-none mt-1 mb-0" />
          </div>
          <div className="col-12 col-lg-7 col-xl-9">
            <div className="py-2 px-4 border-bottom d-none d-lg-block">
              <div className="d-flex align-items-center py-1">
                <div className="position-relative">
                  {userInfoLogged.userImage?.url ? (
                    <img
                      src={userInfoLogged.userImage?.url}
                      className="rounded-circle mr-1"
                      alt="Sharon Lessman"
                      width="40"
                      height="40"
                    />
                  ) : (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1511/1511084.png"
                      className="rounded-circle mr-1"
                      alt="Sharon Lessman"
                      width="40"
                      height="40"
                    />
                  )}
                </div>
                <div className="flex-grow-1 pl-3">
                  <strong>
                    {userInfoLogged.name} {userInfoLogged.lastName}
                  </strong>
                  {/* <div className="text-muted small">
                    <em>Typing...</em>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="position-relative">
              <div className="chat-messages p-4 chatRoom">
                {messages.length === 0 ? (
                  <div className="text-center">
                    <h1>!!! Select a user to start talking.</h1>
                  </div>
                ) : null}
                {messages
                  .map((message, index) => (
                    <li
                      className="d-flex justify-content-between mb-4"
                      key={index}
                    >
                      {message.from !== "Me" ? (
                        <>
                          {" "}
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                            width="60"
                          />{" "}
                        </>
                      ) : null}

                      <div
                        className={`card ${
                          message.from === "Me" ? "w-100" : ""
                        }`}
                      >
                        <div className="card-header d-flex justify-content-between p-3">
                          <p className="fw-bold mb-0">{message.from} </p>
                          <p className="text-muted small mb-0">
                            <i className="far fa-clock"></i> 10 mins ago
                          </p>
                        </div>
                        <div className="card-body">
                          <p className="mb-0">{message.body}</p>
                        </div>
                      </div>
                      {message.from === "Me" ? (
                        <>
                          {" "}
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                            width="60"
                          />{" "}
                        </>
                      ) : null}
                    </li>
                  ))
                  .reverse()}
              </div>
            </div>

            <div className="flex-grow-0 py-3 px-4 border-top">
              <div className="input-group">
                <input
                  ref={divRef}
                  type="text"
                  className="form-control"
                  placeholder="Type your message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*       <section>
        <div className="content-wrap py-5">
          <div className="row">
            <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
              <h5 className="font-weight-bold mb-3 text-center text-lg-start">
                Members
              </h5>

              <div className="card">
                <div className="card-body">
                  <ul className="list-unstyled mb-0">
                    {itemsDashBoard.map((item) => {
                      return (
                        <div
                          onClick={() => getCatRoom({ item })}
                          type="submit"
                          className="p-2 border-bottom"
                          key={item._id}
                        >
                          <a
                            href="#!"
                            className="d-flex justify-content-between"
                          >
                            <div className="d-flex flex-row">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                                alt="avatar"
                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                width="60"
                              />
                              <div className="pt-1">
                                <p className="fw-bold mb-0">
                                  {item.name} {item.lastName}
                                </p>
                                <p className="small text-muted">
                                  Hello, Are you there?
                                </p>
                              </div>
                            </div>
                            <div className="pt-1">
                              <p className="small text-muted mb-1">Just now</p>
                              <span className="badge bg-danger float-end">
                                1
                              </span>
                            </div>
                          </a>
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <br />
              <LoadMore />
            </div>

            <div className="col-md-6 col-lg-7 col-xl-8">
              <form onSubmit={handleSubmit}>
                <ul className="list-unstyled">
                  {messages
                    .map((message, index) => (
                      <li
                        className="d-flex justify-content-between mb-4"
                        key={index}
                      >
                        {message.from !== "Me" ? (
                          <>
                            {" "}
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                              width="60"
                            />{" "}
                          </>
                        ) : null}

                        <div
                          className={`card ${
                            message.from === "Me" ? "w-100" : ""
                          }`}
                        >
                          <div className="card-header d-flex justify-content-between p-3">
                            <p className="fw-bold mb-0">{message.from} </p>
                            <p className="text-muted small mb-0">
                              <i className="far fa-clock"></i> 10 mins ago
                            </p>
                          </div>
                          <div className="card-body">
                            <p className="mb-0">{message.body}</p>
                          </div>
                        </div>
                        {message.from === "Me" ? (
                          <>
                            {" "}
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                              width="60"
                            />{" "}
                          </>
                        ) : null}
                      </li>
                    ))
                    .reverse()}

                  <li className="bg-white mb-3" ref={divRef}>
                    <div className="form-outline">
                      <textarea
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="form-control"
                        id="textAreaExample2"
                        rows="2"
                      ></textarea>

                      <label className="form-label" htmlFor="textAreaExample2">
                        Message
                      </label>
                    </div>
                  </li>
                  <button
                    type="submit"
                    className="btn btn-info btn-rounded float-end"
                  >
                    Send
                  </button>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default Messenger;
