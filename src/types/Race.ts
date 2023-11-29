import Puzzle from "./Puzzle";
import Racer from "./Racer";

export default interface Race {
  hostId: string;
  name: string;
  puzzleList: Puzzle[];
  startedAt: any;
  createdAt: any;
  time: number;
}
