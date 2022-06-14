import React, {useState} from 'react';

function DeleteWeatherForecast(props){

    const [isDeleted, setDeleted] = useState(false);

    function deleteWeatherForecast()
    {
        console.log(props.id)

        const requestOptions =
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(`http://localhost:7222/api/Weather/DeleteWeather/${props.id}`, requestOptions)
            .then(() => setDeleted(true))
            .then(props.loadingData);
    }

    return(
        <div className="container">
            <button onClick={deleteWeatherForecast} type="button" className="btn btn-outline-danger">Delete</button>
        </div>
    )
}
export default DeleteWeatherForecast;