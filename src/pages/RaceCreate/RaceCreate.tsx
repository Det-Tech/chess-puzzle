import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import shortid from "shortid";
import { getPuzzleList } from "../../constants";
import Race from "../../types/Race";
import _ from "lodash";
import { usePuzzle } from "../../hooks/puzzle";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: "10rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

const RaceCreate: React.FC = () => {
  getPuzzleList();
  const { userHandler, puzzleCountHandler } = usePuzzle();
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const { control, getValues } = useForm({
    defaultValues: { name: "", time: 120, puzzleCount: 5 },
  });

  const handleCreateRace = async () => {
    try {
      const values = getValues();
      if(values.puzzleCount > 500) return; 

      setLoading(true);

      puzzleCountHandler(values.puzzleCount);
      userHandler(values.name);

      const raceId = shortid();

      const puzzles = await getPuzzleList();

      const race: Race = {
        puzzleList: _.sampleSize(puzzles, values.puzzleCount),
        startedAt: null,
        time: values.time,
      };

      history.push(`/${raceId}`);
    } finally {
      setLoading(false);
      setDetailsDialogOpen(false);
    }
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Typography variant="h5" align="center">
        Start a Puzzle
      </Typography>
      <Box height={8} />
      <Typography variant="body1" align="center">
        Improve your puzzle skills
      </Typography>
      <Box height={16} />
      <Controller
        name="name"
        control={control}
        as={<TextField variant="outlined" placeholder="Your name" fullWidth />}
      />

      <Box height={8} />
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={() => setDetailsDialogOpen(true)}
      >
        Start puzzle
      </Button>
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
      >
        <DialogTitle>Info</DialogTitle>
        <DialogContent>
          <Controller
            name="puzzleCount"
            control={control}
            as={
              <TextField margin="dense" label="Number of puzzles" fullWidth />
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateRace} color="primary" disabled={loading}>
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RaceCreate;
