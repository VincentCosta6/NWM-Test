import React, { useState, useEffect } from "react"

import { Card, CardHeader, CardMedia, CardContent } from "@material-ui/core"

const indexToDay = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
}

export default props => {
    const { high_temp, weather, valid_date } = props.data
    const { description, icon } = weather

    const [parsed, setParsed] = useState({  })

    const parseData = _ => {
        
    }

    useEffect(parseData, [])
    
    const celsiusToFarenheit = celsius => ((celsius * (9 / 5)) + 32).toFixed(1) + "° F"
    
    const getShortenedDayName = yyyymmdd => {
        const strings = yyyymmdd.split("-")
        
        if(strings.length !== 3) {
            console.error(`String received: ${yyyymmdd} is not proper`)
        }
        
        const date = new Date(strings[0], strings[1], strings[2])
        
        return indexToDay[date.getDay()].substring(0, 3)
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