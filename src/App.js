import React, { useEffect, useState } from 'react';
import './App.css';

import Header from "./components/Header"
import Container from "./components/Container"

if(process.env.NODE_ENV && process.env.NODE_ENV === "development") {
    import("./api_key.json")
        .then(data => {
            window._key = data.key || ""
        })
}
else {
    console.log(process.env)
}
//console.log(process.env.NODE_ENV)

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

        localStorage.setItem("location", JSON.stringify({
            lat: location.coords.latitude,
            lon: location.coords.longitude
        }))
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
