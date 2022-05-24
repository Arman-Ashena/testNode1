import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessgeList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessgeList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessgeList((list) => [...list, data]);
    });
  }, [socket]);
  const handleSendMessage = (event) => {
    if (event.key === "Enter") {
      sendMessage();
      setCurrentMessage("");
    }
  };

  return (
    <div className="space-y-[0.5] ">
      <div className="flex flex-col  ">
        <h3 className="text-xl bg-slate-500 text-white py-1 px-2 rounded-tr-[3px] rounded-tl-[3px]">
          Live Chat
        </h3>
      </div>

      <div
        className="min-h-[20em] border border-gray-300  overflow-y-auto 
      overflow-x-hidden h-[50%] w-[100%] max-h-[20em]"
      >
        {messageList.map((messageContent) => (
          <div
            className="flex p-1"
            id={username === messageContent.author ? "you" : "other"}
          >
            <div
              className={`flex justify-end flex-col 
            ${
              username === messageContent.author ? "items-start" : "items-end"
            } `}
            >
              <div
                className={`text-xl ${
                  username === messageContent.author
                    ? "bg-blue-300"
                    : "bg-green-300"
                }
               px-5 py-1 rounded-lg`}
              >
                <p>{messageContent.message}</p>
              </div>

              <div className="flex   space-x-1 items-center justify-center">
                <p className=" font-normal ">{messageContent.time}</p>
                <p className="-mt-[1px]">{messageContent.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex  ">
        <input
          type="text"
          className="border   p-4 w-full border-green-500 "
          placeholder="hey... this is a message"
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            handleSendMessage(event);
          }}
        />
        <button
          className=" flex items-center justify-center 
            text-white text-4xl font-bold bg-green-600  px-3 "
          onClick={sendMessage}
        >
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default Chat;
