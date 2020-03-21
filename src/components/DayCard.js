import React, { useState, useEffect } from "react"

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
    
    const celsiusToFarenheit = celsius => (celsius * (9 / 5)) + 32
    
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
        <div className = "card" onClick = {props.onClick}>
            <h6>{month}/{day}</h6>
            <h5>{getShortenedDayName(valid_date)}</h5>
            <img src = "" alt = {description} height = "50" width = "50" />
            <h4>{celsiusToFarenheit(high_temp).toFixed(1)}° F</h4>
        </div>
    )
}