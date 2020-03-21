import React, { useEffect, useState } from "react"

import DayCard from "./DayCard"
import ExpandedInfo from "./ExpandedInfo"

const base_url = "https://api.weatherbit.io/v2.0"

const localData = {
    use: true,
}

export default props => {
    const [request, setRequest] = useState({})
    const [active, setActive] = useState(-1)

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

    const _renderExpanded = _ => {
        if(active < 0 || active >= request.data.length) {
            return <h3>Click on a day to view more info</h3>
        }
        else {
            return <ExpandedInfo active = {active} data = {request.data[active]} />
        }
    }

    const { city_name, timezone, country_code, state_code } = request

    return (
        <div className="container">
            <h2>City: {city_name}</h2>
            <h2>Timezone: {timezone}</h2>
            <h2>Country: {country_code}</h2>
            <h2>State: {state_code}</h2>

            <div className = "daily-cards">
                <h2>16 day forecast</h2>
                <div className = "daily-cards-container">
                    {
                        request.data && request.data.map((day, index) => <DayCard key = {index} data = {day} onClick = {_ => setActive(index === active ? -1 : index)} />)
                    }
                </div>
                { _renderExpanded() }
            </div>
        </div>
    )
}