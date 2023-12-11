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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@material-ui/core";

import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import shortid from "shortid";
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
    const { userHandler, puzzleCountHandler, puzzleTimer, puzzleTimerHandler, selectedLevel, selectedLevelHandler } =
        usePuzzle();
    const history = useHistory();
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    
    const { control, getValues } = useForm({
        defaultValues: { name: "", time: 300, puzzleCount: 5 },
    });
 

    const handleCreateRace = async () => {
        try {
            const values = getValues();
            if (values.puzzleCount > 500) {
              toast.success("Should be less than 500", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
              });
              return;
            }

            if (puzzleTimer == "") {
              toast.success("plz select the timer", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
              });
              return;
            }

            setLoading(true);

            puzzleCountHandler(values.puzzleCount);
            userHandler(values.name);

            const raceId = shortid();

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
                as={
                    <TextField
                        variant="outlined"
                        placeholder="Your name"
                        fullWidth
                    />
                }
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
                            <TextField
                                margin="dense"
                                label="Number of puzzles"
                                fullWidth
                            />
                        }
                    />

                    <FormControl fullWidth>
                        <InputLabel id="time-select">Timer</InputLabel>

                        <Select
                            label="Number of select"
                            labelId="time-select-label"
                            id="time-select"
                            value={puzzleTimer}
                            onChange={(e) => {
                                puzzleTimerHandler(e.target.value);
                            }}
                            fullWidth
                        >
                            <MenuItem value={"300"}>5min</MenuItem>
                            <MenuItem value={"600"}>10min</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="time-select">Level</InputLabel>

                        <Select
                            label="level of select"
                            labelId="level-select-label"
                            id="level-select"
                            value={selectedLevel}
                            onChange={(e) => {
                                selectedLevelHandler(e.target.value);
                            }}
                            fullWidth
                        >
                            <MenuItem value={"beginner"}>Beginner</MenuItem>
                            <MenuItem value={"intermedia"}>Intermedia</MenuItem>
                            <MenuItem value={"advanced"}>Advanced</MenuItem>
                            <MenuItem value={"future"}>Future</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCreateRace}
                        color="primary"
                        disabled={loading}
                    >
                        Start
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default RaceCreate;
