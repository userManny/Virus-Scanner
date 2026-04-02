import React, { useState, useEffect } from "react";
import "./App.css";
import Cell from "./components/Cell";

const rows = 16;
const cols = 16;
const virusCount = 40;

function App() {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [status, setStatus] = useState("Scanning...");
  const [isWin, setIsWin] = useState(false);
const [time, setTime] = useState(0);
const [score, setScore] = useState(0);

  useEffect(() => {
    startGame();
  }, []);


  useEffect(() => {
  if (gameOver) return;

  const interval = setInterval(() => {
    setTime(prev => (prev < 999 ? prev + 1 : prev));
  }, 1000);

  return () => clearInterval(interval);
}, [gameOver]);


  function startGame() {
    setIsWin(false);
    setTime(0);
    setScore(0);
    let newGrid = [];
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < cols; c++) {
        row.push({
          virus: false,
          revealed: false,
          flagged: false,
          value: 0,
        });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
    setGameOver(false);
    setFirstClick(true);
    setStatus("Scanning...");
  }

  function placeViruses(grid, safeR, safeC) {
    let count = 0;
    while (count < virusCount) {
      let r = Math.floor(Math.random() * rows);
      let c = Math.floor(Math.random() * cols);

      if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1)
        continue;

      if (!grid[r][c].virus) {
        grid[r][c].virus = true;
        count++;
      }
    }
  }

  function calculateNumbers(grid) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c].virus) continue;

        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            let nr = r + dr;
            let nc = c + dc;
            if (nr >= 0 && nc >= 0 && nr < rows && nc < cols) {
              if (grid[nr][nc].virus) count++;
            }
          }
        }
        grid[r][c].value = count;
      }
    }
  }

  function reveal(r, c) {
    if (gameOver) return;

    let newGrid = [...grid];
    let cell = newGrid[r][c];

    if (cell.revealed || cell.flagged) return;

    if (firstClick) {
      placeViruses(newGrid, r, c);
      calculateNumbers(newGrid);
      setFirstClick(false);
    }

    cell.revealed = true;

    if (cell.virus) {
      setGameOver(true);
      setStatus("💥 System Infected!");
      revealAll(newGrid);
      return;
    }

    if (cell.value === 0) {
      floodFill(newGrid, r, c);
    }

    checkWin(newGrid);
    setGrid([...newGrid]);
  }

  function floodFill(grid, r, c) {
    let stack = [[r, c]];

    while (stack.length) {
      let [cr, cc] = stack.pop();

      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          let nr = cr + dr;
          let nc = cc + dc;

          if (
            nr >= 0 &&
            nc >= 0 &&
            nr < rows &&
            nc < cols
          ) {
            let neighbor = grid[nr][nc];

            if (!neighbor.revealed && !neighbor.virus) {
              neighbor.revealed = true;

              if (neighbor.value === 0) {
                stack.push([nr, nc]);
              }
            }
          }
        }
      }
    }
  }

function toggleFlag(r, c) {
  if (gameOver) return;

  let newGrid = [...grid];
  let cell = newGrid[r][c];

  if (!cell.revealed) {
    cell.flagged = !cell.flagged;

    // 🎯 Score logic
    if (cell.flagged && cell.virus) {
      setScore(prev => prev + 1);
    } else if (!cell.flagged && cell.virus) {
      setScore(prev => prev - 1);
    }
  }

  setGrid(newGrid);
}

  function revealAll(grid) {
    grid.forEach(row =>
      row.forEach(cell => (cell.revealed = true))
    );
    setGrid([...grid]);
  }

  function checkWin(grid) {
    let safeCells = rows * cols - virusCount;
    let revealed = 0;
    

    grid.forEach(row =>
      row.forEach(cell => {
        if (cell.revealed && !cell.virus) revealed++;
      })
    );

    if (revealed === safeCells) {
     setGameOver(true);
     setIsWin(true);
     setStatus("✅ System Clean!");
    }
  }

  return (
    <div className="container">
      <h1>🦠 Virus Scanner</h1>

     <div className="top-bar">
  <div className="timer">⏱ {time}</div>

  <button onClick={startGame}>🔄 Restart</button>

  <div className="score">🎯 {score}</div>
</div>

<div className="status">{status}</div>

      <div className="grid">
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <Cell
              key={`${r}-${c}`}
              cell={cell}
              onClick={() => reveal(r, c)}
              onRightClick={(e) => {
                e.preventDefault();
                toggleFlag(r, c);
              }}
            />
          ))
        )}
      </div>

      <div className="instructions">
        <h2>📘 Instructions</h2>
        <ul>
          <li>Click to scan files</li>
          <li>Numbers show nearby infected files</li>
          <li>Right-click to flag</li>
          <li>Clear all safe files to win</li>
        </ul>
      </div>

      {isWin && (
  <div className="overlay">
    <div className="popup">
      <h2>🎉 System Secured!</h2>
      <p>All viruses eliminated successfully.</p>
      <button onClick={startGame}>Play Again</button>
    </div>
  </div>
)}
    </div>
  );
}

export default App;