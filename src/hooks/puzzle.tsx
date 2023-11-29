import React, { ReactNode, useEffect, useMemo, useState } from "react";

export interface PuzzleProviderContext {
  user: string,
  userHandler: (name: string) => void;
  puzzleCount: number;
  puzzleCountHandler: (num: number) => void;
  puzzleIndex: number;
  puzzleIndexHandler: () => void;
}

export const PuzzleContext = React.createContext<PuzzleProviderContext>({
  user: "",
  userHandler: (name: string) => {},
  puzzleCount: 0,
  puzzleCountHandler: (num: number) => {},
  puzzleIndex: 0,
  puzzleIndexHandler: () => {},
});

const PuzzleProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [puzzleCount, setPuzzleCount] = useState<number>(0);
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const [user, setUser] = useState<string>("");

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
      userHandler
    }),
    [puzzleCount, puzzleCountHandler, puzzleIndex, puzzleIndexHandler, user, userHandler]
  );

  return (
    <PuzzleContext.Provider value={value}>{children}</PuzzleContext.Provider>
  );
};

const usePuzzle = () => React.useContext(PuzzleContext);

export { PuzzleProvider, usePuzzle };