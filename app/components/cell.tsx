import React, { Dispatch, SetStateAction } from "react";

export type cellProps = {
  id: number;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  cells: string[];
  setCells: Dispatch<SetStateAction<string[]>>;
  cell: string;
  winningMessage: string;
};

const Cell = ({
  id,
  value,
  setValue,
  cells,
  setCells,
  cell,
  winningMessage,
}: cellProps) => {
  const handleClick = (_event: any) => {
    const notTaken = !cells[id];
    console.log(id, notTaken);
    if (winningMessage) {
      return;
    }
    if (notTaken) {
      if (value === "circle") {
        handleCellChange("circle");
        setValue("cross");
      } else if (value === "cross") {
        handleCellChange("cross");
        setValue("circle");
      }
    }
  };

  const handleCellChange = (cellToChange: string) => {
    let copyFromCells = [...cells];
    copyFromCells[id] = cellToChange;
    setCells(copyFromCells);
  };
  return (
    <div
      id="square"
      className="flex justify-center items-center border-yellow-600"
      onClick={handleClick}
    >
      <div className="text-[60px] font-bold">
        {cell ? (
          cell === "circle" ? (
            <span className="text-blue-500">O</span>
          ) : (
            <span className="text-red-500">X</span>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Cell;
