import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import Race from "../../../types/Race";
import { formatTime } from "../../../utils/utils";
import { usePuzzle } from "../../../hooks/puzzle";
import { useHistory } from "react-router-dom";

const RaceStanding: React.FC<{ race: Race }> = ({ race }) => {
  const {puzzleCount, puzzleIndex, user} = usePuzzle()
  const history = useHistory();
  return (
    <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>{""}</Avatar>
            </ListItemAvatar>            
            <ListItemText
              style={{cursor:"pointer"}}
              onClick={()=> history.push(`/`)}
              primary={user}
              secondary={
                `Solved ${puzzleIndex} of ${puzzleCount} puzzles`
              }
            />
          </ListItem>
    </List>
  );
};

export default RaceStanding;
