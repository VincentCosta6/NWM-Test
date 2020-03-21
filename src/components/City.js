import React from "react"
import { Card, CardHeader } from "@material-ui/core"

export default props => {
    const classStr = props.active ? "city active" : "city"

    return (
        <Card className = {classStr} onClick = {props.onClick}>
            <CardHeader title={props.city.name || "Fallbrook"} />
        </Card>
    )
}