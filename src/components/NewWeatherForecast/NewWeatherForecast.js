import React, {useState} from 'react';
import WeatherForecastModal from "../WeatherForecastModal/WeatherForecastModal";

function NewWeatherForecast(props) {
    const [showModalWeatherForecast, setShowModalWeatherForecasts] = useState(false);
    let weatherForecastsCities = [];
    const openModalForWeatherForecasts = () => {
        setShowModalWeatherForecasts(prev => !prev);
    }

    if(props.weatherForecasts !== null)
    {
        props.weatherForecasts.map(el => weatherForecastsCities.push(el.city));
    }

    return (
        <div className="d-flex justify-content-md-center">
            <button title="Add new weather forecast" type="button" className="btn btn-outline-primary"
                    onClick={openModalForWeatherForecasts}>Add new weather forecast
            </button>
            <WeatherForecastModal showModal={showModalWeatherForecast} setShowModal={setShowModalWeatherForecasts}
                                  weatherForecastsCities={weatherForecastsCities} loadingData={props.loadingData}
            />
        </div>
    )
}

export default NewWeatherForecast;