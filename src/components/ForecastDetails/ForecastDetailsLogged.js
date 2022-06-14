import React from "react";
import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';

function ForecastDetailsLogged(props) {
    return (
        <tr className="text-center">
            <td>{(props.wf.city)}</td>
            <td>{props.wf.temperatureC}</td>
            <td>{props.wf.summary}</td>
            <td>{props.wf.date.slice(0, 10)}</td>
            <td><EditButton data={props.wf} loadingData={props.loadingData}/></td>
            <td><DeleteButton id={props.wf.id} loadingData={props.loadingData}/></td>
        </tr>
    )
}

export default ForecastDetailsLogged;