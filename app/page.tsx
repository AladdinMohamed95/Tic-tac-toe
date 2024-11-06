"use client";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [channelName, setChannelName] = useState<string>("");

  const generateRandomWord = (length = 4) => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  useEffect(() => {
    setChannelName(generateRandomWord()); // Set the generated word as the channel name
  }, []);

  const sendMessage = async () => {
    const response = await fetch("/api/send-message", {
      method: "POST",
      body: JSON.stringify({ message, channelName }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Message sent:", message);
      setMessage("");
    } else {
      console.error("Failed to send message");
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <main className="bg-gradient-to-r from-cyan-500 to-blue-500  flex justify-center items-center h-[100vh]">
      <div className=" bg-gray-800 flex flex-col text-center rounded-md justify-center gap-2 p-20">
        <h1 className="text-slate-300 font-extrabold text-4xl">Copyfier</h1>
        <p className="text-slate-300 font-semibold text-lg">
          Channel Name:{" "}
          <span className="text-slate-100 font-bold">{channelName}</span>
        </p>
        <div className="mr-auto">
          <input
            type="text"
            placeholder="Paste your text here "
            value={message}
            onChange={handleTextChange}
            multiple
            className="border border-gray-800 p-4 text-slate-900 rounded-xl"
          />
          <button
            className="border border-blue-600 p-4 m-4 bg-slate-200 font-bold text-slate-900 rounded-xl"
            onClick={sendMessage}
          >
            send a message!
          </button>
        </div>
      </div>
    </main>
  );
}
