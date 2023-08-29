"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./page.module.css";
import { Button } from "react-bootstrap";

export default function Home() {
  const [keyCode, setKeyCode] = useState(0);

  const initialBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 2, 0, 0],
  ];
  const [board, setBoard] = useState(initialBoard);

  const handleKeyPress = (event: any) => {
    setKeyCode(event.keyCode);
  };

  const generateRandomSquareNumber = () => {
    const squareNumbers = [2, 4];
    const randomIndex = Math.floor(Math.random() * squareNumbers.length);
    return squareNumbers[randomIndex];
  };

  const placeRandomSquareInBoard = (updatedBoard: any) => {
    const randomSquare = generateRandomSquareNumber();
    const emptyCells = [];
    for (let row = 0; row < updatedBoard.length; row++) {
      for (let col = 0; col < updatedBoard[row].length; col++) {
        if (updatedBoard[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const randomCell = emptyCells[randomIndex];
      updatedBoard[randomCell.row][randomCell.col] = randomSquare;
    } else {
      alert("Game Over");
    }
    setBoard(updatedBoard);
  };

  const mergeUpperColumn = (
    board: any,
    columnIndex: number,
    direction: string
  ) => {
    const newBoard = [...board];
    const column = newBoard.map((row) => row[columnIndex]);
    const rowOrColumn = direction === "upper" ? column : newBoard[columnIndex];

    for (let rowIndex = 1; rowIndex < rowOrColumn.length; rowIndex++) {
      if (rowOrColumn[rowIndex] !== 0) {
        let mergeIndex = rowIndex - 1;

        while (mergeIndex >= 0 && rowOrColumn[mergeIndex] === 0) {
          mergeIndex--;
        }

        if (
          mergeIndex >= 0 &&
          rowOrColumn[mergeIndex] === rowOrColumn[rowIndex]
        ) {
          rowOrColumn[mergeIndex] *= 2;
          rowOrColumn[rowIndex] = 0;
        } else {
          if (mergeIndex !== rowIndex - 1) {
            rowOrColumn[mergeIndex + 1] = rowOrColumn[rowIndex];
            rowOrColumn[rowIndex] = 0;
          }
        }
      }
    }

    if (direction === "upper") {
      for (let rowIndex = 0; rowIndex < column.length; rowIndex++) {
        newBoard[rowIndex][columnIndex] = column[rowIndex];
      }
    }

    return newBoard;
  };

  const mergeLowerColumn = (
    board: any,
    columnIndex: number,
    direction: string
  ) => {
    const newBoard = [...board];
    const column = newBoard.map((row) => row[columnIndex]);

    const rowOrColumn = direction === "lower" ? column : newBoard[columnIndex];
    for (let rowIndex = rowOrColumn.length - 2; rowIndex >= 0; rowIndex--) {
      if (rowOrColumn[rowIndex] !== 0) {
        let mergeIndex = rowIndex + 1;

        while (
          mergeIndex < rowOrColumn.length &&
          rowOrColumn[mergeIndex] === 0
        ) {
          mergeIndex++;
        }

        if (
          mergeIndex < rowOrColumn.length &&
          rowOrColumn[mergeIndex] === rowOrColumn[rowIndex]
        ) {
          rowOrColumn[mergeIndex] *= 2;
          rowOrColumn[rowIndex] = 0;
        } else {
          if (mergeIndex !== rowIndex + 1) {
            rowOrColumn[mergeIndex - 1] = rowOrColumn[rowIndex];
            rowOrColumn[rowIndex] = 0;
          }
        }
      }
    }

    if (direction === "lower") {
      for (let rowIndex = 0; rowIndex < rowOrColumn.length; rowIndex++) {
        newBoard[rowIndex][columnIndex] = rowOrColumn[rowIndex];
      }
    }

    return newBoard;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    if (keyCode === 38) {
      for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
        const updatedBoard = mergeUpperColumn(board, columnIndex, "upper");
        setBoard(updatedBoard);
      }
      setKeyCode(0);
      placeRandomSquareInBoard(board);
    }
    if (keyCode === 40) {
      for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
        const updatedBoard = mergeLowerColumn(board, columnIndex, "lower");
        setBoard(updatedBoard);
      }
      setKeyCode(0);
      placeRandomSquareInBoard(board);
    } else if (keyCode === 39) {
      for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
        const updatedBoard = mergeLowerColumn(board, rowIndex, "right");
        setBoard(updatedBoard);
      }
      setKeyCode(0);
      placeRandomSquareInBoard(board);
    } else if (keyCode === 37) {
      for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
        const updatedBoard = mergeUpperColumn(board, columnIndex, "left");
        setBoard(updatedBoard);
      }
      setKeyCode(0);
      placeRandomSquareInBoard(board);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [keyCode]);

  return (
    <div className="container mt-5 px-3 py-5 game-container">
      <h1 className="text-center">2048 Game</h1>

      <div className={styles.gameBoard}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cellValue, colIndex) => (
              <div
                key={colIndex}
                className={`${styles.cell} ${styles[`tile-${cellValue}`]}`}
              >
                {cellValue !== 0 ? cellValue : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.newGameBtn}
          variant="info"
          onClick={() => setBoard(initialBoard)}
        >
          New Game
        </Button>
        <Button
          className={styles.resetBtn}
          variant="danger"
          onClick={() => setBoard(initialBoard)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
