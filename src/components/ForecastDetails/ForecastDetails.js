import React from "react";

function ForecastDetails(props) {
    return (
        <tr className="text-center">
            <td>{(props.wf.city)}</td>
            <td>{props.wf.temperatureC}</td>
            <td>{props.wf.summary}</td>
            <td>{props.wf.date.slice(0, 10)}</td>
        </tr>
    )
}

export default ForecastDetails;