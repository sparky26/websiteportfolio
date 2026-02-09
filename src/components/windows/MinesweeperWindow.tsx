"use client";

import { useState, useCallback } from 'react';

const ROWS = 8;
const COLS = 8;
const MINES = 10;

type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighbors: number;
};

function createBoard(): CellState[][] {
  const board: CellState[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isMine: false, isRevealed: false, isFlagged: false, neighbors: 0,
    }))
  );
  // Place mines
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      placed++;
    }
  }
  // Calculate neighbors
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].isMine) count++;
        }
      }
      board[r][c].neighbors = count;
    }
  }
  return board;
}

function cloneBoard(board: CellState[][]): CellState[][] {
  return board.map(row => row.map(cell => ({ ...cell })));
}

const NUMBER_COLORS: Record<number, string> = {
  1: '#0000FF', 2: '#008000', 3: '#FF0000', 4: '#000080',
  5: '#800000', 6: '#008080', 7: '#000000', 8: '#808080',
};

export function MinesweeperWindow() {
  const [board, setBoard] = useState(createBoard);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [face, setFace] = useState('\uD83D\uDE42');

  const flagsCount = board.flat().filter(c => c.isFlagged).length;

  const reveal = useCallback((r: number, c: number) => {
    if (gameOver || won) return;
    const newBoard = cloneBoard(board);
    const cell = newBoard[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    cell.isRevealed = true;
    if (cell.isMine) {
      // Reveal all mines
      newBoard.forEach(row => row.forEach(c => { if (c.isMine) c.isRevealed = true; }));
      setBoard(newBoard);
      setGameOver(true);
      setFace('\uD83D\uDE35');
      return;
    }

    // Flood fill for 0-neighbor cells
    if (cell.neighbors === 0) {
      const queue: [number, number][] = [[r, c]];
      while (queue.length > 0) {
        const [cr, cc] = queue.shift()!;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = cr + dr, nc = cc + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
              const neighbor = newBoard[nr][nc];
              if (!neighbor.isRevealed && !neighbor.isMine && !neighbor.isFlagged) {
                neighbor.isRevealed = true;
                if (neighbor.neighbors === 0) queue.push([nr, nc]);
              }
            }
          }
        }
      }
    }

    // Check win
    const unrevealed = newBoard.flat().filter(c => !c.isRevealed && !c.isMine).length;
    if (unrevealed === 0) {
      setWon(true);
      setFace('\uD83D\uDE0E');
    }

    setBoard(newBoard);
  }, [board, gameOver, won]);

  const flag = useCallback((e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || won) return;
    const newBoard = cloneBoard(board);
    const cell = newBoard[r][c];
    if (cell.isRevealed) return;
    cell.isFlagged = !cell.isFlagged;
    setBoard(newBoard);
  }, [board, gameOver, won]);

  const reset = () => {
    setBoard(createBoard());
    setGameOver(false);
    setWon(false);
    setFace('\uD83D\uDE42');
  };

  return (
    <div className="minesweeper">
      <div className="minesweeper-header">
        <div className="minesweeper-counter">{String(MINES - flagsCount).padStart(3, '0')}</div>
        <button className="minesweeper-face" onClick={reset}>{face}</button>
        <div className="minesweeper-counter">{won ? 'WIN' : gameOver ? 'RIP' : '\u23F1\uFE0F'}</div>
      </div>
      <div className="minesweeper-board">
        {board.map((row, r) => (
          <div key={r} className="minesweeper-row">
            {row.map((cell, c) => (
              <button
                key={c}
                className={`minesweeper-cell ${cell.isRevealed ? 'minesweeper-cell--revealed' : ''} ${cell.isRevealed && cell.isMine ? 'minesweeper-cell--mine' : ''}`}
                onClick={() => reveal(r, c)}
                onContextMenu={(e) => flag(e, r, c)}
                disabled={cell.isRevealed}
              >
                {cell.isRevealed
                  ? cell.isMine
                    ? '\uD83D\uDCA3'
                    : cell.neighbors > 0
                    ? <span style={{ color: NUMBER_COLORS[cell.neighbors], fontWeight: 'bold' }}>{cell.neighbors}</span>
                    : ''
                  : cell.isFlagged
                  ? '\uD83D\uDEA9'
                  : ''}
              </button>
            ))}
          </div>
        ))}
      </div>
      {(gameOver || won) && (
        <div style={{ textAlign: 'center', marginTop: '6px', fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}>
          {won ? 'You cleared all mines! You win!' : 'BOOM! Game Over!'}
          <br />
          <button className="win95-button" onClick={reset} style={{ marginTop: '4px', fontSize: '11px' }}>
            New Game
          </button>
        </div>
      )}
    </div>
  );
}
