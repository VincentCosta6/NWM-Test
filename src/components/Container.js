import React, { useEffect, useState, useContext } from "react"

import Cities from "./Cities"
import CityInfo from "./CityInfo"

import AppStateContext from "../contexts/app-state"
import LocationContext from "../contexts/location"

window._base_url = "https://api.weatherbit.io/v2.0"

export default props => {
    const LocationC = useContext(LocationContext)

    const [request, setRequest] = useState({})
    const [requestLoading, setRequestLoading] = useState(false)

    const [activeCity, setActiveCity] = useState(-1)
    const [activeCard, setActiveCard] = useState(-1)

    // Grab city list from localStorage
    // If nothing is there default to just the users location as an option
    const [cities, setCities] = useState([
        ...JSON.parse(localStorage.getItem("cities") || "[{ \"name\": \"My location\" }]")
    ])

    // Whenever the active city changes go grab its data. 
    // If its the first option we need to grab the users location
    useEffect(_ => {
        let latitude = null, longitude = null

        if(activeCity === 0) {
            latitude = LocationC.location.coords.latitude
            longitude = LocationC.location.coords.longitude
        }
        else if(activeCity > 0) {
            latitude = cities[activeCity].lat
            longitude = cities[activeCity].lon
        }
        else {
            return
        }

        setRequestLoading(true)
        fetchData(latitude, longitude)
            .then(dataSuccess)
            .catch(dataFailed)
    }, [activeCity])

    // Returning a promise because if we just returned the fetch we wouldnt be able to override the .then to always include the .json() parsing
    const fetchData = (latitude, longitude) => 
        new Promise(function(resolve, reject) {
            fetch(`${window._base_url}/forecast/daily?lat=${latitude}&lon=${longitude}&key=${window._key}`)
                .then(req =>
                    req.json()
                        .then(resolve)
                        .catch(reject)
                )
                .catch(reject)
        })

    const addCity = extractedData => {
        const newCities = [...cities, extractedData]

        localStorage.setItem("cities", JSON.stringify(newCities))

        setCities(newCities)
    }

    const removeCity = index => {
        const newCities = [...cities]
        newCities.splice(index, 1)

        localStorage.setItem("cities", JSON.stringify(newCities))

        setCities(newCities)
    }

    const dataSuccess = data => {
        setRequest(data)
        setRequestLoading(false)
    }

    const dataFailed = err => {
        console.log(err)
        setRequestLoading(false)
    }

    // Also handles if user clicks already active city then make it inactive, also inactivate the day thats clicked
    const handleCityClicked = index => {
        setActiveCard(-1)
        setActiveCity(index === activeCity ? -1 : index)
    }

    // Show loading message while weather data is being fetched
    const _renderLoading = _ => {
        if(requestLoading) return <h2>Loading request...</h2>
        else return <CityInfo />
    }

    // Decided to go with React Context to manage my data. 
    // This project was relatively small and not too much data is being passed around. 
    // Also due to time contraints 
    return (
        <div className="container">
            <AppStateContext.Provider value = {{ 
                activeCity, 
                activeCard, 
                setActiveCity, 
                setActiveCard, 
                cities, 
                addCity,
                removeCity,
                handleCityClicked, 
                request, 
                setRequest
            }}>
                <Cities />

                { _renderLoading() }
            </AppStateContext.Provider>
        </div>
    )
}