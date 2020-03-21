import React from "react"

export default props => {
    console.log(props)

    const { high_temp, weather, valid_date } = props.data
    const { description, icon } = weather



    return (
        <div className = "expanded">

        </div>
    )
}