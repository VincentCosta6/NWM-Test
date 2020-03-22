import React, { useState, useContext } from "react"

import { TextField, Button } from "@material-ui/core"

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Divider,
    DialogActions,
    CircularProgress
} from "@material-ui/core"

import AppStateContext from "../contexts/app-state"

const api_key = "806fa71dca594f41a08fcf4c7a0cf335"
const api_url = "https://api.opencagedata.com/geocode/v1/json"

export default props => {
    const AppStateC = useContext(AppStateContext)

    const [dialogVisible, setDialogVisible] = useState(false)

    const [cityName, setCityName] = useState("")
    const [requestLoading, setRequestLoading] = useState(false)

    const handleDialogClose = _ => {
        setRequestLoading(false)
        setCityName("")
        setDialogVisible(false)
    }

    const handleDialogAccept = _ => {
        sendSearchCityRequest()
        
        handleDialogClose()
    }

    const sendSearchCityRequest = _ => {
        setRequestLoading(true)
        fetch(`${api_url}?q=${cityName}&key=${api_key}&language=en`)
            .then(res => 
                res.json()
                    .then(requestSuccess)
                    .catch(requestFailed)
            )
            .catch(requestFailed)
    }

    const requestSuccess = data => {
        console.log(data)

        const city = data.results[0]

        const extractedData = {
            name: city.components.city,
            lat: city.geometry.lat,
            lon: city.geometry.lng
        }

        console.log(extractedData)

        AppStateC.addCity(extractedData)

        setRequestLoading(false)
    }

    const requestFailed = err => {
        setRequestLoading(false)
    }

    return (
        <>
            <Button variant = "contained" color = "primary" onClick = {_ => setDialogVisible(true)}>Add city</Button>
            <Dialog
                open = {dialogVisible}
                onClose = {handleDialogClose}
            >
                <DialogTitle>Add city</DialogTitle>
                <DialogContent>
                    <TextField
                        label = "City name"
                        variant = "outlined"
                        value = {cityName}
                        onChange = {event => setCityName(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDialogClose} color="primary">Cancel</Button>
                    {
                        requestLoading ?
                            <CircularProgress size={17} /> :
                            <Button onClick={handleDialogAccept} variant="contained" color="primary">Add</Button>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}