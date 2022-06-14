import React, {useEffect, useState} from 'react';
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import NewWeatherForecast from "../NewWeatherForecast/NewWeatherForecast"
import WeatherForecastLogged from "../WeatherForecast/WeatherForecastLogged";

function HomePage() {
    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:7222/api/Weather/GetAllWeathers', {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                });

                const content = await response.json();

                setData(content);
            }
        )();
    }, []);

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:7222/api/user', {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                });

                const content = await response.json();
                setUser(content.nickName);
            }
        )();
    }, []);

    const loadData = async () => {
        await fetch('http://localhost:7222/api/Weather/GetAllWeathers', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        }).then(response => response.json())
            .then(data => setData(data))
    }

    let result;
    if (user == null) {
        result = (
            <div>
                {data && <WeatherForecast wf={data}/>}
            </div>
        )
    } else {
        result =
            <div>
                {<NewWeatherForecast
                    weatherForecasts={data}
                    loadingData={loadData}
                />}
                {data && <WeatherForecastLogged wf={data} loadingData={loadData}/>}
            </div>
    }
    return (
        <div>
            {result}
        </div>
    )
}

export default HomePage;