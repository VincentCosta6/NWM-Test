import React, { useEffect, useState } from 'react';
import './App.css';

import Header from "./components/Header"
import Container from "./components/Container"

import { key } from "./api_key.json"

window._key = key

const locationSettings = {
    enableHighAccuracy: true
}

const App = _ => {
    useEffect(_ => {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationFailure, locationSettings)
    }, [])

    const [location, setLocation] = useState()

    const locationSuccess = location => {
        setLocation(location)
    }

    const locationFailure = err => {
        console.log("Failed location request")
        console.log(err)
    }

    return (
        <div className="App">
            <Header />
            <Container location = {location} />
        </div>
    )
}

export default App;
