import Puzzle from "./types/Puzzle";
import { Howl } from "howler";

export const moveSound = new Howl({
  src: ["/move.mp3"],
});

export const errorSound = new Howl({
  src: ["/error.mp3"],
});

export const getPuzzleList = async(level: string)=>{
  const data = await fetch(`/puzzles/${level}.txt`)
      .then(async(res) => { return await res.text()})
  const lines = data.split(",");
  const puzzles: Puzzle[] = [];
  for(let i = 0; i< lines.length - 1; i+=8) {
    puzzles.push({
      id:"",
      name:"",
      startFen: lines[i].trim(),
      solution: lines[i+1].trim().split(" ")
    })
  }
  console.log(puzzles)
  return puzzles;
}

export const START_FEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";