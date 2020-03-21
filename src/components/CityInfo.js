import React from "react"

import DayCard from "./DayCard"

export default props => {
    const { city_name, timezone, country_code, state_code } = props.request

    if(!props.location) {
        return <></>
    }
    else if (props.activeCity < 0 || props.activeCity >= props.cities.length) {
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
                            props.request.data && props.request.data.map((day, index) =>
                                <DayCard
                                    key={index}
                                    data={day}
                                    onClick={_ => props.setActiveCard(index === props.activeCard ? -1 : index)}
                                    active={index === props.activeCard}
                                />
                            )
                        }
                    </div>
                    {props._renderExpanded()}
                </div>
            </>
        )
    }
}