import React, { useState } from 'react';
import EditWeatherForecastModal from '../WeatherForecastModal/EditWeatherForecastModal'

function EditWeatherForecast(props){
    const [showModalEditWeatherForecast, setShowModalEditWeatherForecasts] = useState(false);
    const openModalForEditWeatherForecast = () => {
        setShowModalEditWeatherForecasts(prev => !prev);
    }

    return(
        <div className="container">
            <button onClick={openModalForEditWeatherForecast} type="button" className="btn btn-outline-danger">Edit</button>
            <EditWeatherForecastModal showModal={showModalEditWeatherForecast} setShowModal={setShowModalEditWeatherForecasts}
                                  weatherForecastData={props.data} loadingData={props.loadingData}
            />
        </div>
    )
}
export default EditWeatherForecast;