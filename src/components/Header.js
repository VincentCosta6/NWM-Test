import React from "react"

export default props => {
    return (
        <header className = "header">
            <h1>Weather API</h1>
            <h3>
                using 
                <a href = "https://www.weatherbit.io/">Weatherbit</a>
                and
                <a href = "https://opencagedata.com/">OpenCage</a>
            </h3>
        </header>
    )
}