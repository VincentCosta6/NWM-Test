import React, { useEffect, useState } from 'react';
import './App.css';

import Header from "./components/Header"
import Container from "./components/Container"

window._key = "ee335d2f11e14b208e0a1172aaec60e5"

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
