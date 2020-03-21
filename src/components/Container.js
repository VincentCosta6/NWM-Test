import React, { useEffect, useState } from "react"

import Cities from "./Cities"
import CityInfo from "./CityInfo"
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
            <Cities
                location = {props.location}
                cities = {cities}
                handleCityClicked = {handleCityClicked}
            />

            <CityInfo 
                location = {props.location}
                activeCity = {activeCity}
                activeCard = {activeCard}
                cities = {cities}
                request = {request}
                setActiveCard = {setActiveCard}
                _renderExpanded = {_renderExpanded}
            />
        </div>
    )
}