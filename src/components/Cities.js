import React, { useContext } from "react"

import { 
    Card, 
    CardHeader, 
    CardActionArea 
} from "@material-ui/core"

import AddCity from "./AddCity"
import CancelIcon from '@material-ui/icons/CancelOutlined';

import AppStateContext from "../contexts/app-state"
import LocationContext from "../contexts/location"

export default props => {
    const appStateC = useContext(AppStateContext)
    const locationC = useContext(LocationContext)

    // Decided to not allow the user to use the app unless they share location
    // In a real application i would just hide the user location option if they didnt allow it
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
                                removeCity = {event => {
                                    event.stopPropagation()
                                    appStateC.removeCity(index)
                                }}
                                active = {index === appStateC.activeCity} 
                                isFirst = {index === 0}
                            />
                        )
                    }
                    <AddCity />
                </div>
            </>
        )
    }
}

// Decided to keep this component in cities since it is so small and not used anywhere else
const City = props => {
    const classStr = props.active ? "city active" : "city"

    return (
        <Card className = {classStr} onClick = {props.onClick}>
            {
                !props.isFirst && <CardActionArea>
                    <CancelIcon style = {{ float: "right", right: 0, position: "absolute" }} color = "secondary" size = {17} onClick = {props.removeCity} />
                </CardActionArea>
            }
            
            <CardHeader title={props.city.name || props.city.state || props.city.country || props.city.continent} />
        </Card>
    )
}