import React, { useState, useEffect } from "react";
import { ChessInstance, ShortMove } from "chess.js";
import ReactResizeDetector from "react-resize-detector";
import Chessboard from "chessboardjsx";
import { usePuzzle } from "../hooks/puzzle";
import bb from "../assets/bb.png";
import bk from "../assets/bk.png";
import bn from "../assets/bn.png";
import bq from "../assets/bq.png";
import br from "../assets/br.png";
import bp from "../assets/bp.png";

import wb from "../assets/wb.png";
import wk from "../assets/wk.png";
import wn from "../assets/wn.png";
import wq from "../assets/wq.png";
import wp from "../assets/wp.png";
import wr from "../assets/wr.png";

const Chess = require("chess.js");

interface Props {
  fen: string;
  solution: ShortMove[];
  onCorrectMove?: () => void;
  onIncorrectMove: () => void;
  onSolve: () => void;
  movable: boolean;
  squareStyles: any;
  puzzleHintIndex: number;
}

const PuzzleBoard: React.FC<Props> = ({
  onCorrectMove,
  onIncorrectMove,
  onSolve,
  fen: initialFen,
  solution: initialSolution,
  movable,
  squareStyles,
  puzzleHintIndex,
}) => {
  const [chess, setChess] = useState(new Chess(initialFen));
  const [turn, setTurn] = useState(false);
  const [orientation, setOrientation] = useState(chess.turn());
  const [solution, setSolution] = useState<ShortMove[]>(initialSolution);

  useEffect(() => {
    const newChess = new Chess(initialFen);
    setChess(newChess);
    setOrientation(newChess.turn());
    setSolution(initialSolution);
  }, [initialFen, initialSolution]);

  useEffect(() => {

    if (turn || puzzleHintIndex == 0) {
      // make computer's move
      setTurn(false);
      setTimeout(() => {
        const computerResult = makePCMove(chess, solution, puzzleHintIndex);
        if (computerResult) {
          setChess(computerResult.chess);
          setSolution(computerResult.solution);
          if (computerResult.solution.length === 0) {
            return onSolve();
          } else {
            onCorrectMove && onCorrectMove();
          }
        }
      }, 1000);
    }
  }, [turn, puzzleHintIndex, initialFen, chess]);

  const handleMove = async (move: ShortMove) => {

    const result = makeMove(chess, move, solution, puzzleHintIndex);

    if (!result) {
      return onIncorrectMove();
    }

    setChess(result.chess);
    setSolution(result.solution);

    if (result.solution.length === 0) {
      return onSolve();
    } else {
      onCorrectMove && onCorrectMove();
    }

    setTurn(true);
  };

  return (
    <ReactResizeDetector handleHeight handleWidth>
      {({ width, height }: { width: number; height: number }) => {
        const size = Math.min(width, height, 500) || 400;
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Chessboard
              boardStyle={{ margin: "auto" }}
              position={chess.fen()}
              width={size}
              draggable={movable && solution && solution.length > 0}
              onDrop={({ sourceSquare, targetSquare }) =>
                handleMove({ from: sourceSquare, to: targetSquare })
              }
              squareStyles={squareStyles}
              transitionDuration={100}
              lightSquareStyle={{ backgroundColor: "#eeeed2", fontSize:"24px" }}
              darkSquareStyle={{ backgroundColor: "#769656", fontSize:"24px" }}
              pieces={{
                wR: ({ squareWidth, isDragging }) => (
                  <img
                    style={{
                      width: isDragging ? squareWidth * 1.75 : squareWidth,
                      height: isDragging ? squareWidth * 1.75 : squareWidth
                    }}
                    src={wr}
                    alt={"wR"}
                  />
                ),
                wQ: ({ squareWidth, isDragging }) => (
                  <img
                    style={{
                      width: isDragging ? squareWidth * 1.75 : squareWidth,
                      height: isDragging ? squareWidth * 1.75 : squareWidth
                    }}
                    src={wq}
                    alt={"elvis"}
                  />
                ),
                wB: ({ squareWidth, isDragging }) => (
                  <img
                    style={{
                      width: isDragging ? squareWidth * 1.75 : squareWidth,
                      height: isDragging ? squareWidth * 1.75 : squareWidth
                    }}
                    src={wb}
                    alt={"elvis"}
                  />
                ),
                wN: ({ squareWidth, isDragging }) => (
                  <img
                    style={{
                      width: isDragging ? squareWidth * 1.75 : squareWidth,
                      height: isDragging ? squareWidth * 1.75 : squareWidth
                    }}
                    src={wn}
                    alt={"elvis"}
                  />
                ),
                wP: ({ squareWidth, isDragging }) => (
                  <img
                    style={{
                      width: isDragging ? squareWidth * 1.75 : squareWidth,
                      height: isDragging ? squareWidth * 1.75 : squareWidth
                    }}
                    src={wp}
                    alt={"elvis"}
                  />
                ),
                wK: ({ squareWidth, isDragging }) => (
                  <img
                    style={{
                      width: isDragging ? squareWidth * 1.75 : squareWidth,
                      height: isDragging ? squareWidth * 1.75 : squareWidth
                    }}
                    src={wk}
                    alt={"wK"}
                  />
                ),

                bR: ({ squareWidth, isDragging }) => (
                  <img
                    style={{
                      width: isDragging ? squareWidth * 1.75 : squareWidth,
                      height: isDragging ? squareWidth * 1.75 : squareWidth
                    }}
                    src={br}
                    alt={"wR"}
                  />
                ),
                bQ: ({ squareWidth, isDragging }) => (
                  <img
                    style={{
                      width: isDragging ? squareWidth * 1.75 : squareWidth,
                      height: isDragging ? squareWidth * 1.75 : squareWidth
                    }}
                    src={bq}
                    alt={"elvis"}
                  />
                ),
                bB: ({ squareWidth, isDragging }) => (
                  <img
                    style={{
                      width: isDragging ? squareWidth * 1.75 : squareWidth,
                      height: isDragging ? squareWidth * 1.75 : squareWidth
                    }}
                    src={bb}
                    alt={"elvis"}
                  />
                ),
                bN: ({ squareWidth, isDragging }) => (
                  <img
                    style={{
                      width: isDragging ? squareWidth * 1.75 : squareWidth,
                      height: isDragging ? squareWidth * 1.75 : squareWidth
                    }}
                    src={bn}
                    alt={"elvis"}
                  />
                ),
                bP: ({ squareWidth, isDragging }) => (
                  <img
                    style={{
                      width: isDragging ? squareWidth * 1.75 : squareWidth,
                      height: isDragging ? squareWidth * 1.75 : squareWidth
                    }}
                    src={bp}
                    alt={"elvis"}
                  />
                ),
                bK: ({ squareWidth, isDragging }) => (
                  <img
                    style={{
                      width: isDragging ? squareWidth * 1.75 : squareWidth,
                      height: isDragging ? squareWidth * 1.75 : squareWidth
                    }}
                    src={bk}
                    alt={"wK"}
                  />
                ),
              }}
            />
          </div>
        );
      }}
    </ReactResizeDetector>
  );
};

function makePCMove(
  chess: ChessInstance,
  solution: any,
  puzzleHintIndex: number
): null | { solution: ShortMove[]; chess: ChessInstance } {
  if (solution.length === 0) {
    return null;
  }

  const correctMove = solution[0];
  const move = {
    from: correctMove?.slice(0, 2),
    to: correctMove.slice(2, 4),
  };

  if (!chess.move(move)) {
    return null;
  }

  return {
    chess: new Chess(chess.fen()),
    solution: solution.slice(1),
  };
}

function makeMove(
  chess: ChessInstance,
  move: ShortMove,
  solution: any,
  puzzleHintIndex: number
): null | { solution: ShortMove[]; chess: ChessInstance } {
  if (solution.length === 0) {
    return null;
  }

  const correctMove = solution[0];

  if (
    move.from !== correctMove?.slice(0, 2) ||
    move.to !== correctMove.slice(2, 4) ||
    move.promotion !== correctMove?.promotion
  ) {
    return null;
  }

  if (!chess.move(move)) {
    return null;
  }

  return {
    chess: new Chess(chess.fen()),
    solution: solution.slice(1),
  };
}

export default PuzzleBoard;
