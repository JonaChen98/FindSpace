import React, { useRef } from "react";
import { useParams } from "react-router-dom";
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
  import axios from 'axios';


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
    
    const [spaceName, setSpaceName] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [days, setDays] = React.useState([]);
    const [time, setTime] = React.useState("");
    
    const fileInput = useRef();
    
    const onSubmitPost = () => {
        let profInfo = localStorage.getItem("profInfo");
        profInfo = JSON.parse(profInfo);
        let id = profInfo.id;
        
        if(fileInput.current.files.length > 0) {
            const formData = new FormData();
            formData.append("image", fileInput.current.files[0]);
            formData.append("spaceName", spaceName);
            formData.append("location", location);
            formData.append("days", days);
            formData.append("time", time);
            
            axios.post(`/api/${id}/upload-space-img`, formData)
                .then(res => {
                    console.log(res.data);
                })
        }
    }

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
            <form encType="multipart/form-data">
                    <Grid container alignItems="flex-start" spacing={2}>
                    
                    
                    <Grid item xs={9}>
                        <TextField
                            label="Space nickname"
                            required
                            helperText="Or company name"
                            name="name"
                            margin="normal"
                            // fullWidth
                            // value={name}
                            onChange={event => setSpaceName(event.target.value)}
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
                            onChange={event => setLocation(event.target.value)}
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
                            onChange={event => setDays(event.target.value)}
                            />
                            {/* <div style={{ fontSize: 12, color: "red" }}>
                                {state.majorError}
                            </div> */}
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Time this space is available"
                            helperText=""
                            required
                            margin="normal"
                            fullWidth
                            name="company name"
                            // value={state.major}
                            onChange={event => setTime(event.target.value)}
                            />
                            {/* <div style={{ fontSize: 12, color: "red" }}>
                                {state.majorError}
                            </div> */}
                    </Grid>

                    <Grid item xs={12}>
                        <label> Upload an image of the space. </label>
                        <br/>
                        <input type="file" ref={fileInput} />
                            {/* <label htmlFor="icon-button-file" >
                                <IconButton color="inherit" aria-label="upload picture" >
                                    <CloudUploadOutlinedIcon fontSize="large"/>
                                </IconButton>
                            </label> */}
                    </Grid>

                    <Grid item style={{ marginTop: 8 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onSubmitPost}
                        >
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