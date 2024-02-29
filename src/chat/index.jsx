import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./chat.css";
import { socket } from "../socket";

function Chat() {
  const [meId, setMeId] = useState(localStorage.getItem("id"));
  const [groupId, setGroupId] = useState();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [currentUserChat, setCurrentUserChat] = useState();

  const onClickChatUser = async (groupId) => {
    setGroupId(groupId);

    axios
      .get(`http://localhost:3003/chats/getAllMessages/${groupId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((data) => {
        setMessages(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });

    // setCurrentUserChat(
    //   data.data[0].sellerId._id === meId
    //     ? data.data[0].sellerId.firstName +
    //         " " +
    //         data.data[0].sellerId.lastName
    //     : data.data[0].buyerId.firstName +
    //         " " +
    //         data.data[0].buyerId.lastName
    // );
  };

  const onClickSendMessage = (e) => {
    e.preventDefault();
    const mes = {
      userId: meId,
      text: message,
      groupId: groupId,
    };
    socket.emit("sendMessage", mes);
  };
  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    socket.on("receivedMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    axios
      .get(`http://localhost:3003/chats/getAllRoom/${meId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((data) => {
       
        setGroups(data.data);
        setGroupId(data.data[0]._id);
        setCurrentUserChat(
          data.data[0].buyerId._id === meId
            ? data.data[0].sellerId.firstName +
                " " +
                data.data[0].sellerId.lastName
            : data.data[0].buyerId.firstName +
                " " +
                data.data[0].buyerId.lastName
        );
        socket.emit("createRoom", data.data[0]);
        axios
          .get(
            `http://localhost:3003/chats/getAllMessages/${data.data[0]._id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((data) => {
            setMessages(data.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      {loading ? (
        <>Loading...</>
      ) : (
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              <div id="plist" className="people-list">
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  {groups.map((data) => (
                    <li
                      className={`clearfix ${
                        groupId === data._id ? "active" : ""
                      }`}
                      onClick={() => onClickChatUser(data._id)}
                    >
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt="avatar"
                      />
                      <div className="about">
                        <div className="name">
                          {data.buyerId._id === meId
                            ? data.sellerId.firstName + data.sellerId.lastName
                            : data.buyerId.firstName + data.buyerId.lastName}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="chat">
                <div className="chat-header clearfix">
                  <div className="row">
                    <div className="col-lg-6">
                      <a data-toggle="modal" data-target="#view_info">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          alt="avatar"
                        />
                      </a>
                      <div className="chat-about">
                        <h6 className="m-b-0">
                          {currentUserChat ?? currentUserChat}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chat-history">
                  <ul className="m-b-0">
                    {messages.map((data) => (
                      <li className="clearfix">
                        <div
                          className={`message ${
                            data.userId === meId
                              ? "other-message float-right"
                              : "my-message"
                          } `}
                        >
                          {data.text}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="chat-message clearfix">
                  <div className="input-group mb-0">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-send"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter text here..."
                      value={message}
                      onChange={onChangeMessage}
                    />
                    <button onClick={onClickSendMessage}>send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
