import { useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  const handleCheckValid = (e) => {
    if (e.target.value == "sizamen") setIsValid(true);
    else {
      setIsValid(false);
    }
  };
  return (
    <>
      <input type="text" onChange={(e) => handleCheckValid(e)} />
      {isValid && (
        <div className=" pt-24 space-y-8 flex flex-col justify-center max-w-md m-auto items-center  ">
          {!showChat ? (
            <>
              <h3 className="text-5xl font-semibold">Join a Chat</h3>
              <div className="flex flex-col justify-center items-center w-full space-y-4">
                <input
                  className="border border-gray-500 rounded-md p-4 w-1/2"
                  type="text"
                  placeholder="Jhon..."
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
                <input
                  type="text"
                  className="border border-gray-500 rounded-[4px] p-4 w-1/2"
                  placeholder="Room ID..."
                  onChange={(event) => {
                    setRoom(event.target.value);
                  }}
                />
                <button
                  className="rounded-[4px] text-white font-bold bg-green-600 py-3 px-16"
                  onClick={joinRoom}
                >
                  Join a Room
                </button>
              </div>
            </>
          ) : (
            <Chat socket={socket} username={userName} room={room} />
          )}
        </div>
      )}
    </>
  );
}

export default App;
