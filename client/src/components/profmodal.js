import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import {
    Typography,
    Modal,
    TextField,
    Grid,
    Button,
    IconButton,
  } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    modal: {
        top: '50%',
        left: '50%',
        transform: '-50%, -50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal() {
    const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Upload my space
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                className={classes.modal}
                onClose={handleClose}>
            
            <div className={classes.paper}>
            
            <Typography variant="h4" align="center" component="h3" gutterBottom>
                New Space
            </Typography>

            <Typography paragraph variant="h6" align="center" gutterBottom>
                Complete the details below to add an unused space.
            </Typography>

                <form>
                    <Grid container alignItems="flex-start" spacing={2}>
                    
                    
                    <Grid item xs={9}>
                        <TextField
                            label="Space nickname"
                            required
                            helperText="Your first and last name"
                            name="name"
                            margin="normal"
                            // fullWidth
                            // value={name}
                            // onChange={event => setName(event.target.value)}
                        />
                        {/* <div style={{ fontSize: 12, color: "red" }}>
                        {nameError}
                        </div> */}
                    </Grid>

                    <Grid item xs={9}>
                        <TextField
                            label="Location"
                            helperText="If you do not want to disclose the full address, please put the city"
                            required
                            margin="normal"
                            name="company name"
                            />
                            {/* <div style={{ fontSize: 12, color: "red" }}>
                                {state.majorError}
                            </div> */}
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Days of the week this space is available"
                            helperText="Separate days with commas"
                            required
                            margin="normal"
                            fullWidth
                            name="company name"
                            // value={state.major}
                            // onChange={event => setMajor(event.target.value)}
                            />
                            {/* <div style={{ fontSize: 12, color: "red" }}>
                                {state.majorError}
                            </div> */}
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Time ranges this space is available"
                            helperText=""
                            required
                            margin="normal"
                            fullWidth
                            name="company name"
                            // value={state.major}
                            // onChange={event => setMajor(event.target.value)}
                            />
                            {/* <div style={{ fontSize: 12, color: "red" }}>
                                {state.majorError}
                            </div> */}
                    </Grid>

                    <Grid item xs={12}>
                        <label> Upload an image of the space. </label>
                        <br/>
                        <input accept="image/*" style={{display:'none'}} id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                                <IconButton color="inherit" aria-label="upload picture" >
                                    <CloudUploadOutlinedIcon fontSize="large"/>
                                </IconButton>
                            </label>
                    </Grid>

                    <Grid item style={{ marginTop: 8 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit">
                            Post
                        </Button>
                    </Grid>


                </Grid>
                </form>
            </div>
        </Modal>
    </div>
    );
}