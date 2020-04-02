import React from "react"

import { 
    Card, 
    CardHeader, 
    CardContent 
} from "@material-ui/core"

const indexToDay = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat"
}

export default props => {
    const { high_temp, weather, valid_date } = props.data
    const { description, icon } = weather
    
    const celsiusToFarenheit = celsius => ((celsius * (9 / 5)) + 32).toFixed(1) + "° F"
    
    // Early on was doing thorough error handling but had some things come up and time became short
    const getShortenedDayName = yyyymmdd => {
        const strings = yyyymmdd.split("-")
        
        if(strings.length !== 3) {
            console.error(`String received: ${yyyymmdd} is not proper format needs to be yyyy-mm-dd`)
        }
        
        const date = new Date(strings[0], strings[1] - 1, strings[2])
        
        return indexToDay[(date.getDay()]
    }
    
    const date_split = valid_date.split("-")
    const month = date_split[1]
    const day = date_split[2]

    return (
        <Card className = {props.active ? "card active" : "card"} onClick = {props.onClick}>
            <CardHeader title = {getShortenedDayName(valid_date)} subheader = {`${month}/${day}`} />
            <img src = {`/icons/${icon}.png`} alt = {description} height = {50} width = {50} />
            <CardContent>
                <h4>{celsiusToFarenheit(high_temp)}</h4>
            </CardContent>
        </Card>
    )
}
