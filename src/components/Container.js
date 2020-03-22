import React, { useEffect, useState, useContext } from "react"

import Cities from "./Cities"
import CityInfo from "./CityInfo"
import ExpandedInfo from "./ExpandedInfo"

import AppStateContext from "../contexts/app-state"
import LocationContext from "../contexts/location"

const base_url = "https://api.weatherbit.io/v2.0"

const localData = {
    use: false,
}

export default props => {
    const LocationC = useContext(LocationContext)

    const [request, setRequest] = useState({})

    const [activeCity, setActiveCity] = useState(-1)
    const [activeCard, setActiveCard] = useState(-1)

    const [cities, setCities] = useState([
        { name: "My location" }
    ])

    useEffect(_ => {
        if (LocationC.location && LocationC.location.coords && LocationC.location.coords.latitude && LocationC.location.coords.longitude) {
            fetchData()
        }
    }, [LocationC, LocationC.location])

    const fetchData = _ => {
        const { latitude, longitude } = LocationC.location.coords

        if (localData.use) {
            console.log("Use local")
        }
        else {
            fetch(`${base_url}/forecast/daily?lat=${latitude}&lon=${longitude}&key=${window._key}`)
                .then(req =>
                    req.json()
                        .then(dataSuccess)
                        .catch(dataFailed)
                )
                .catch(dataFailed)
        }
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