import React, { useEffect, useState, createContext } from "react"

import { TextField, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton } from "@material-ui/core"

import City from "./City"
import DayCard from "./DayCard"
import ExpandedInfo from "./ExpandedInfo"

const base_url = "https://api.weatherbit.io/v2.0"

const localData = {
    use: false,
}

export default props => {
    const [request, setRequest] = useState({})

    const [activeCity, setActiveCity] = useState(-1)
    const [activeCard, setActiveCard] = useState(-1)

    const [cityField, setCityField] = useState("")
    const [cities, setCities] = useState([
        { name: "My location" }
    ])

    useEffect(_ => {
        if (props.location && props.location.coords && props.location.coords.latitude && props.location.coords.longitude) {
            fetchData()
        }
    }, [props, props.location])

    const fetchData = _ => {
        const { latitude, longitude } = props.location.coords

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
        console.log(data)

        setRequest(data)
    }

    const dataFailed = err => {
        console.log(err)
    }

    const handleCityClicked = index => {
        setActiveCard(-1)
        setActiveCity(index === activeCity ? -1 : index)
    }

    const _renderCities = _ => {
        if(!props.location) {
            return (
                <div className="city-info-container">
                    <h2>Location permissions are required to use this API</h2>
                </div>
            )
        }
        else {
            return (
                <>
                    <h2>Cities: </h2>
                    <div className="cities">
                        {
                            cities && cities.map((city, index) => 
                                <City 
                                    key = {index} 
                                    city = {city}
                                    onClick = {_ => handleCityClicked(index)} 
                                    active = {index === activeCity} 
                                />
                            )
                        }
                    </div>
                </>
            )
        }
    }

    const _renderCityInfo = _ => {
        if(!props.location) {
            return <></>
        }
        else if (activeCity < 0 || activeCity >= cities.length) {
            return (
                <div className="city-info-container">
                    <h2>Click on a city to view its weather info</h2>
                </div>
            )
        }
        else {
            return (
                <>
                    <div className="city-info-container">
                        <h1>City info</h1>
                        <h2>City: {city_name}</h2>
                        <h2>Timezone: {timezone}</h2>
                        <h2>Country: {country_code}</h2>
                        <h2>State: {state_code}</h2>
                    </div>

                    <div className="daily-cards">
                        <h2>16 day forecast</h2>
                        <div className="daily-cards-container">
                            {
                                request.data && request.data.map((day, index) =>
                                    <DayCard
                                        key={index}
                                        data={day}
                                        onClick={_ => setActiveCard(index === activeCard ? -1 : index)}
                                        active={index === activeCard}
                                    />
                                )
                            }
                        </div>
                        {_renderExpanded()}
                    </div>
                </>
            )
        }
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

    const { city_name, timezone, country_code, state_code } = request

    return (
        <div className="container">
            { _renderCities() }

            { _renderCityInfo() }
        </div>
    )
}