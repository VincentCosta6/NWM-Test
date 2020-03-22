import React, { useEffect, useState, useContext } from "react"

import { TextField } from "@material-ui/core"

import Cities from "./Cities"
import CityInfo from "./CityInfo"
import ExpandedInfo from "./ExpandedInfo"

import AppStateContext from "../contexts/app-state"
import LocationContext from "../contexts/location"

window._base_url = "https://api.weatherbit.io/v2.0"

export default props => {
    const LocationC = useContext(LocationContext)

    const [request, setRequest] = useState({})

    const [activeCity, setActiveCity] = useState(-1)
    const [activeCard, setActiveCard] = useState(-1)

    const [cities, setCities] = useState([
        { name: "My location" },
        ...JSON.parse(localStorage.getItem("cities") || "[]")
    ])

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
        console.log([...cities, extractedData])
        setCities([...cities, extractedData])
    }

    const removeCity = index => {
        setCities(cities.slice().splice(index, 1))
    }

    const dataSuccess = data => {
        setRequest(data)
    }

    const dataFailed = err => {
        console.log(err)
    }

    const handleCityClicked = index => {
        setActiveCard(-1)
        setActiveCity(index === activeCity ? -1 : index)
    }

    const _renderExpanded = _ => {
        if (activeCard < 0 || activeCard >= request.data.length) {
            return (
                <div className="city-info-container">
                    <h3>Click on a day to view more info</h3>
                </div>
            )
        }
        else {
            return <ExpandedInfo active={activeCard} data={request.data[activeCard]} />
        }
    }

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

                <CityInfo _renderExpanded = {_renderExpanded} />
            </AppStateContext.Provider>
        </div>
    )
}