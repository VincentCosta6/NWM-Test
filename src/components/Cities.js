import React from "react"

import City from "./City"

export default props => {
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
                        props.cities && props.cities.map((city, index) => 
                            <City 
                                key = {index} 
                                city = {city}
                                onClick = {_ => props.handleCityClicked(index)} 
                                active = {index === props.activeCity} 
                            />
                        )
                    }
                </div>
            </>
        )
    }
}