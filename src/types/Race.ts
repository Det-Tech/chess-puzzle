import Puzzle from "./Puzzle";
import Racer from "./Racer";

export default interface Race {
  puzzleList: Puzzle[];
  startedAt: any;
  time: number;
}
