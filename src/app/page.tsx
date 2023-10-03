"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./page.module.css";
import { Button, Container, Modal } from "react-bootstrap";
import Chatbot from "./chatbot";
import askImage from "../app/assets/ask.jpg";

const Home = () => {
  const initialBoard = Array.from({ length: 4 }, () => Array(4).fill(0));

  const [keyCode, setKeyCode] = useState(0);
  const [direction, setDirection] = useState("");
  const [isShow, setIsShow] = useState(false);

  const fillInitialRandomCell = (initialBoard: number[][]) => {
    const rowIndex = Math.floor(Math.random() * 4);
    const columnIndex = Math.floor(Math.random() * 4);
    if (initialBoard[rowIndex][columnIndex] === 0) {
      initialBoard[rowIndex][columnIndex] = 2;
    }
    return initialBoard;
  };
  
  const [board, setBoard] = useState(fillInitialRandomCell(initialBoard));

  const handleKeyPress = (event: any) => {
    setKeyCode(event.keyCode);
  };

  const generateRandomSquareNumber = () => {
    const squareNumbers = [2, 4];
    const randomIndex = Math.floor(Math.random() * squareNumbers.length);
    return squareNumbers[randomIndex];
  };

  const isGameOver = () => {
    // Check for valid moves (no more valid moves)
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
        const currentCell = board[rowIndex][columnIndex];

        // Check if adjacent cells can merge
        if (
          (rowIndex > 0 && currentCell === board[rowIndex - 1][columnIndex]) ||
          (rowIndex < 3 && currentCell === board[rowIndex + 1][columnIndex]) ||
          (columnIndex > 0 &&
            currentCell === board[rowIndex][columnIndex - 1]) ||
          (columnIndex < 3 && currentCell === board[rowIndex][columnIndex + 1])
        ) {
          return false; // There's a valid move, game is not over
        }
      }
    }

    // Check if 2048 tile is present
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
        if (board[rowIndex][columnIndex] === 2048) {
          return true; // Player has won
        }
      }
    }

    // Check if there are empty tiles left
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
        if (board[rowIndex][columnIndex] === 0) {
          return false; // There are empty tiles, game is not over
        }
      }
    }

    return true; // No valid moves and no empty tiles, game is over
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

  const handleMove = () => {
    if (keyCode === 38 || direction === "upper") {
      for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
        const updatedBoard = mergeUpperColumn(board, columnIndex, "upper");
        setBoard(updatedBoard);
      }
      setKeyCode(0);
      placeRandomSquareInBoard(board);
    } else if (keyCode === 40 || direction === "lower") {
      for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
        const updatedBoard = mergeLowerColumn(board, columnIndex, "lower");
        setBoard(updatedBoard);
      }
      setKeyCode(0);
      placeRandomSquareInBoard(board);
    } else if (keyCode === 39 || direction === "right") {
      for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
        const updatedBoard = mergeLowerColumn(board, rowIndex, "right");
        setBoard(updatedBoard);
      }
      setKeyCode(0);
      placeRandomSquareInBoard(board);
    } else if (keyCode === 37 || direction === "left") {
      for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
        const updatedBoard = mergeUpperColumn(board, columnIndex, "left");
        setBoard(updatedBoard);
      }
      setKeyCode(0);
      placeRandomSquareInBoard(board);
    } else {
      if (isGameOver()) {
        console.log("GameOver");
      }
    }
  };

  let startX: 0;
  let startY: 0;
  const handleTouchStart = (event: any) => {
    console.log(event.touches[0], "touch");
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    handleMove();
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [keyCode, direction]);

  const handleTouchMove = (event: any) => {
    event.preventDefault(); // Prevent scrolling while swiping
    const deltaX = event.touches[0].clientX - startX;
    const deltaY = event.touches[0].clientY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        setDirection("right");
      } else {
        setDirection("left");
      }
    } else {
      if (deltaY > 0) {
        setDirection("lower");
      } else if (deltaY < 0) {
        setDirection("upper");
      } else {
        setDirection("");
      }
    }
  };

  const handleTouchEnd = () => {
    setDirection("");
  };

  return (
    <Container style={{}}>
      <h1 className={`text-center ${styles.title}`}>2048 Game</h1>
      <div className={styles.main}>
        <div
          className={styles.gameBoard}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
      </div>
      {isGameOver() && (
        <div className={styles.gameOverlay}>
          <div className={styles.gameOverMessage}>Game Over</div>
        </div>
      )}
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

      <div className={styles.askImageContainer} onClick={() => setIsShow(true)}>
        <img src={askImage?.src} alt="Ask" className={styles.askImage} />
      </div>
      <Chatbot isModalOpen={isShow} modalClose={() => setIsShow(false)} />
    </Container>
  );
}

export default Home;