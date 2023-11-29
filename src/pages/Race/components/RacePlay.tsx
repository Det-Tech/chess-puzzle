import { Box, Button, Container, Typography } from "@material-ui/core";
import { Alert, AlertProps } from "@material-ui/lab";
import _ from "lodash";
import React, { useState, useCallback, useEffect } from "react";
import PuzzleBoard from "../../../components/PuzzleBoard";
import { errorSound, moveSound } from "../../../constants";
import Race from "../../../types/Race";
import { formatTime, getSideToPlayFromFen } from "../../../utils/utils";
import RaceStanding from "./RaceStanding";
import { usePuzzle } from "../../../hooks/puzzle";

const RacePlay: React.FC<{
  race: Race;
  userId: string;
  onSolve: () => void;
  onFinish: () => void;
  onTimeout: () => void;
}> = ({ race, userId, onSolve, onFinish, onTimeout }) => {
  const { puzzleCount, puzzleIndex, user } = usePuzzle();

  useEffect(() => {
    setSquareStyles({});
  }, [puzzleIndex]);

  const puzzle = race.puzzleList[puzzleIndex];
  const [squareStyles, setSquareStyles] = useState<any>();

  const [time, setTime] = useState("0:00");

  const [help, setHelp] = useState<
    "sideToPlay" | "incorrect" | "correct" | "solved"
  >();
  const sideToPlay = getSideToPlayFromFen(puzzle?.startFen);

  useEffect(() => {
    setHelp("sideToPlay");
  }, [puzzle?.startFen]);

  const tickTimer = useCallback(async () => {
    if (!race) {
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setupTimer = useCallback(() => {
    setTimeout(tickTimer, 1000);
  }, [tickTimer]);

  useEffect(() => {
    setupTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (puzzleIndex > puzzleCount - 1) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDirection="column"
      >
        <Container maxWidth="sm">
          <Typography variant="h5" align="center">
            Finished
          </Typography>

          <Typography variant="body1" align="center">
            You finished the puzzle, Please again.
          </Typography>

          <RaceStanding race={race} />
        </Container>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      maxWidth={768}
      margin="auto"
    >
      <Box height={60} paddingTop={1} display="flex">
          <Box
            boxShadow="0px 0px 5px 0px #cccccc"
            borderRadius={5}
            padding={1}
            marginX={1}
            width={120}
          >
            <Box>
              <Typography variant="body1">{user}</Typography>
            </Box>
            <Box>
              <Typography variant="body2">
                {puzzleIndex}/{puzzleCount} puzzle
              </Typography>
            </Box>
          </Box>
      </Box>
      <Box flex={1}>
        <PuzzleBoard
          fen={puzzle?.startFen}
          solution={puzzle?.solution}
          movable={true}
          onIncorrectMove={() => {
            errorSound.play();
            setHelp("incorrect");
            setTimeout(() => setHelp("sideToPlay"), 1000);
          }}
          onSolve={() => {
            // snackbar.show("Solved!");
            setHelp("solved");
            moveSound.play();

            setTimeout(() => {
                onSolve();
            }, 500);
          }}
          onCorrectMove={() => {
            moveSound.play();
            setHelp("correct");
          }}
          squareStyles={squareStyles}
        />
      </Box>

      <Box padding={2} display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h5">Puzzles</Typography>
          {puzzleIndex}/{puzzleCount}
        </Box>

        {help === "sideToPlay" && (
          <MyAlert variant="filled" severity="info">
            {sideToPlay === "w" ? "White" : "Black"} to move
          </MyAlert>
        )}

        {help === "correct" && (
          <MyAlert variant="filled" severity="success">
            Correct!
          </MyAlert>
        )}

        {help === "solved" && (
          <MyAlert variant="filled" severity="success">
            Solved!
          </MyAlert>
        )}

        {help === "incorrect" && (
          <MyAlert variant="filled" severity="error">
            Incorrect
          </MyAlert>
        )}

        <Box>
          <Button
            className="copy-invite-link"
            fullWidth
            color="primary"
            variant="outlined"
            data-clipboard-text={window.location.href}
            onClick={() => {
              if (puzzle && puzzle?.solution) {
                const data = {
                  [puzzle?.solution[0].to]: { background: "darkviolet" },
                  [puzzle?.solution[0].from]: { background: "slateblue" },
                };
                setSquareStyles(data);
              }
            }}
          >
            Hint
          </Button>{" "}          
        </Box>
      </Box>
    </Box>
  );
};

const MyAlert: React.FC<AlertProps> = (props) => {
  return <Alert {...props} style={{ height: "min-content" }} />;
};

export default RacePlay;
