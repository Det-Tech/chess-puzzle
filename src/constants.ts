import Puzzle from "./types/Puzzle";
import { Howl } from "howler";

import fs from "fs";

export const moveSound = new Howl({
  src: ["/move.mp3"],
});

export const errorSound = new Howl({
  src: ["/error.mp3"],
});

export const getPuzzleList = async()=>{
  const data = await fetch('/puzzle.txt')
      .then(async(res) => { return await res.text()})
  const lines = data.split("####,");
  const puzzles: Puzzle[] = [];
  for(let i = 1; i< lines.length - 1; i++) {
    puzzles.push({
      id:"",
      name:"",
      startFen: lines[i].split(",")[0],
      solution: lines[i].split(",")[1].split(" ")
    })
  }

  return puzzles;

}
export const START_FEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";