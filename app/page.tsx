"use client";
import { useEffect, useState } from "react";
import Cell, { cellProps } from "./components/cell";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Home() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [value, setValue] = useState("circle");
  const [winningMessage, setWinningMessage] = useState("");
  console.log(cells);
  useEffect(() => {
    winningCombos.forEach((combo) => {
      const circleWins = combo.every((cell) => cells[cell] === "circle");
      const crossWins = combo.every((cell) => cells[cell] === "cross");
      if (circleWins) {
        setWinningMessage("circle Wins!");
      } else if (crossWins) {
        setWinningMessage("cross Wins!");
      }
    });
  }, [cells]);

  useEffect(() => {
    if (cells.every((cell) => cell !== "" && !winningMessage)) {
      setWinningMessage("draw!");
    }
  }, [cells, winningMessage]);

  return (
    <main className="bg-amber-500 flex justify-center items-center h-[100vh]">
      <div className=" bg-gray-800 flex flex-col text-center rounded-md justify-center gap-2 p-4 px-8">
        <h1 className="text-slate-300 font-extrabold text-4xl">Tic Tac Toe</h1>
        <div className="mr-auto">
          <button
            className="border border-amber-300 p-2  text-slate-300"
            onClick={() => {
              window.location.reload();
            }}
          >
            New Game!
          </button>
        </div>
        <div id="gameboard">
          {cells.map((cell, i) => (
            <Cell
              id={i}
              value={value}
              setValue={setValue}
              key={i}
              cells={cells}
              setCells={setCells}
              cell={cell}
              winningMessage={winningMessage}
            />
          ))}
        </div>
        <div className="text-slate-300">{winningMessage}</div>
        <div className="text-slate-300">
          {winningMessage ? "" : `this is ${value} turn!`}
        </div>
      </div>
    </main>
  );
}
