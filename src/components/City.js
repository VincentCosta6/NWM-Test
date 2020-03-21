import React from "react"
import { Card, CardActions, CardHeader } from "@material-ui/core"

export default props => {
    const classStr = props.active ? "city active" : "city"

    return (
        <div className={classStr} onClick={props.onClick}>
            <Card>
                <CardActions>

                </CardActions>
                <CardHeader title={props.city.name || "Fallbrook"} />
            </Card>
        </div>
    )
}