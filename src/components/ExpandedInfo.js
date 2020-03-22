import React from "react"

export default props => {
    const { max_temp, min_temp, weather, valid_date, wind_cdir_full, vis, uv, precip, sunrise_ts, sunset_ts } = props.data
    const { description, icon } = weather

    const timestampToHourMin = timestamp => {
        const date = new Date(timestamp * 1000)

        let hours = date.getHours()
        let minutes = date.getMinutes()

        let am = true

        if(hours > 12) {
            hours -= 12
            am = false
        }

        if(minutes < 10) {
            minutes = "0" + minutes
        }

        return `${hours}:${minutes} ${am ? "AM" : "PM"}`
    }

    const celsiusToFarenheit = celsius => ((celsius * (9 / 5)) + 32).toFixed(1) + "° F"

    return (
        <section className = "city-info-container">
            <h3>Weather: {description}</h3>
            <h3>Highest: {celsiusToFarenheit(max_temp)}</h3>
            <h3>Lowest: {celsiusToFarenheit(min_temp)}</h3>
            <h3>Wind direction: {wind_cdir_full}</h3>
            <h3>Visibility: {vis}</h3>
            <h3>UV: {uv}</h3>
            <h3>Precripitation: {precip}</h3>

            <h3>Sunrise: {timestampToHourMin(sunrise_ts)}</h3>
            <h3>Sunset: {timestampToHourMin(sunset_ts)}</h3>
        </section>
    )
}