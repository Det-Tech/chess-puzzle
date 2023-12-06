import React, { ReactNode, useEffect, useMemo, useState } from "react";

export interface PuzzleProviderContext {
  user: string,
  userHandler: (name: string) => void;
  puzzleCount: number;
  puzzleCountHandler: (num: number) => void;
  puzzleIndex: number;
  puzzleIndexHandler: () => void;
  puzzleHintIndex: number,
  puzzleHintIndexHandler: (num: number) => void,
  puzzleTimer: "",
  puzzleTimerHandler: (num: any) => void,
}

export const PuzzleContext = React.createContext<PuzzleProviderContext>({
  user: "",
  userHandler: (name: string) => {},
  puzzleCount: 0,
  puzzleCountHandler: (num: number) => {},
  puzzleIndex: 0,
  puzzleIndexHandler: () => {}, 
  puzzleHintIndex: 0,
  puzzleHintIndexHandler: (num: number) => {},
  puzzleTimer: "",
  puzzleTimerHandler: (num: any) => {},
});

const PuzzleProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [puzzleCount, setPuzzleCount] = useState<number>(0);
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const [user, setUser] = useState<string>("");
  const [puzzleHintIndex, setPuzzleHintIndex] = useState<number>(0);
  const [puzzleTimer, setPuzzleTimer] = useState<any>("");
  
  const puzzleTimerHandler = (num: any) => {
    setPuzzleTimer(num);
  };

  const puzzleHintIndexHandler = (num: number) => {
    setPuzzleHintIndex(num);
  };

  const userHandler = (name: string) =>{
    setUser(name);
  }

  const puzzleCountHandler = (num: number) => {
    setPuzzleCount(num);
  };

  const puzzleIndexHandler = () => {
    setPuzzleIndex(puzzleIndex+1);
  };

  const value = useMemo(
    () => ({
      puzzleCount,
      puzzleCountHandler,
      puzzleIndex,
      puzzleIndexHandler,
      user,
      userHandler,
      puzzleHintIndex,
      puzzleHintIndexHandler,
      puzzleTimer,
      puzzleTimerHandler
    }),
    [puzzleCount, puzzleCountHandler, puzzleIndex, puzzleIndexHandler, user, userHandler,
      puzzleHintIndex, puzzleHintIndexHandler, puzzleTimer, puzzleTimerHandler]
  );

  return (
    <PuzzleContext.Provider value={value}>{children}</PuzzleContext.Provider>
  );
};

const usePuzzle = () => React.useContext(PuzzleContext);

export { PuzzleProvider, usePuzzle };
