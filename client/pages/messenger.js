import React, { useContext, useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";
import LoadMore from "../components/LoadMore";
import { AuthContext } from "../context";
let socket;
import io from "Socket.IO-client";
import axios from "axios";
socket = io();

function messenger() {
  const state = useContext(AuthContext);
  const [itemsDashBoard, setItemsDashBoard] = state.User.itemsDashBoard;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const divRef = useRef(null);

  const getCatRoom = ({ item }) => {
    console.log(item);
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
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
    socket.emit("update-input", newMessage.body);
  };

  useEffect(() => {
    socketInitializer();

    /*      return () =>{
        socket.off("update-input",socketInitializer)
    }  */
  }, [messages]);

  return (
    <>
      <section>
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
      </section>
    </>
  );
}

export default messenger;
