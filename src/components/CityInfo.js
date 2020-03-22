import React, { useContext } from "react"

import ExpandedInfo from "./ExpandedInfo"

import LocationContext from "../contexts/location"
import AppStateContext from "../contexts/app-state"

import DayCard from "./DayCard"

export default props => {
    const LocationC = useContext(LocationContext)
    const AppStateC = useContext(AppStateContext)

    const { city_name, timezone, country_code, state_code } = AppStateC.request

    const _renderExpanded = _ => {
        if (AppStateC.activeCard < 0 || AppStateC.activeCard >= AppStateC.request.data.length) {
            return (
                <div className="city-info-container">
                    <h3>Click on a day to view more info</h3>
                </div>
            )
        }
        else {
            return <ExpandedInfo active={AppStateC.activeCard} data={AppStateC.request.data[AppStateC.activeCard]} />
        }
    }

    if(!LocationC.location) {
        return <></>
    }
    else if (AppStateC.activeCity < 0 || AppStateC.activeCity >= AppStateC.cities.length) {
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
                            AppStateC.request.data && AppStateC.request.data.map((day, index) =>
                                <DayCard
                                    key={index}
                                    data={day}
                                    onClick={_ => AppStateC.setActiveCard(index === AppStateC.activeCard ? -1 : index)}
                                    active={index === AppStateC.activeCard}
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