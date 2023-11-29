import { Box, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import RaceType from "../../types/Race";
import RacePlay from "./components/RacePlay";
import { puzzleList } from "../../constants";
import _ from "lodash";
import { usePuzzle } from "../../hooks/puzzle";

interface Props extends RouteComponentProps<{ raceId: string }> {}
const hostId = "hostId";
console.log("total puzzle count:", puzzleList.length)
const Race: React.FC<Props> = () => {
  
  const {puzzleIndexHandler, puzzleIndex, puzzleCount} = usePuzzle();
  const userId = hostId; 
  const params = useParams<{ raceId: string }>();
  const [race, setRace] = useState<null | RaceType>(
    {
      hostId: hostId,
      name: "values.name",
      puzzleList: _.sampleSize(puzzleList, puzzleCount),
      startedAt: null,
      createdAt: {".sv": "timestamp"},
      time: new Date().getMilliseconds(),
    }
  );

  if (race === null) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <RacePlay
      race={race}
      userId={userId}
      onFinish={() => {
      }}
      onSolve={() => {        
        if(puzzleIndex <= puzzleCount - 1){
          puzzleIndexHandler();
        }
      }}
      onTimeout={() => {
      }}
    />
  );
};

export default Race;
