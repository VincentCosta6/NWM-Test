import React, { useContext } from "react"

import { Card, CardHeader } from "@material-ui/core"

import AppStateContext from "../contexts/app-state"
import LocationContext from "../contexts/location"

export default props => {
    const appStateC = useContext(AppStateContext)
    const locationC = useContext(LocationContext)

    if(!locationC.location) {
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
                        appStateC.cities && appStateC.cities.map((city, index) => 
                            <City 
                                key = {index} 
                                city = {city}
                                onClick = {_ => appStateC.handleCityClicked(index)} 
                                active = {index === appStateC.activeCity} 
                            />
                        )
                    }
                </div>
            </>
        )
    }
}

const City = props => {
    const classStr = props.active ? "city active" : "city"

    return (
        <Card className = {classStr} onClick = {props.onClick}>
            <CardHeader title={props.city.name || "Fallbrook"} />
        </Card>
    )
}