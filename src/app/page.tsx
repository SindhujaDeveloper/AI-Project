"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Chatbot from "./chatbot";

const Home = () => {
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