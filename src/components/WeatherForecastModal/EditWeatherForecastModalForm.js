import React, {useState, useRef} from "react";
import styles from './WeatherForecastModal.module.css'
import 'core-js';
import 'regenerator-runtime/runtime';
import 'raf/polyfill';
import {
    FormWithConstraints,
} from 'react-form-with-constraints-bootstrap';


function WeatherForecastModalForm(props) {
    const form = useRef(null);
    const [date, setDate] = useState(props.weatherForecastsdata.date);
    const [temperature, setTemperature] = useState(props.weatherForecastsdata.temperatureC);
    const [summary, setSummary] = useState(props.weatherForecastsdata.summary);

    const clearTemperatureField = () => setTemperature('');
    const clearDateField = () => setDate('');
    const clearSummaryField = () => setSummary('');

    function ChangeDate(event) {
        setDate(event.target.value);
    }

    function ChangeTemperature(event) {
        setTemperature(event.target.value);
    }

    function ChangeSummary(event) {
        setSummary(event.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "date": date,
                    "temperatureC": temperature,
                    "summary": summary
                }
            )
        };
        fetch(`http://localhost:7222/api/Weather/UpdateWeather/${props.weatherForecastsdata.id}`, requestOptions)
            .then(props.loadingData).then(props.closeModal());
    }

    return (
        <>
            <br/>
            <h3>Edit weather forecast</h3>
            <FormWithConstraints ref={form} type="weather" onSubmit={handleSubmit}
                                 noValidate>
                <br/>
                <div className={styles.tableForm}>
                    <p id="submit">
                        <label id="submit">Temperature:</label>
                        <input
                            value={temperature}
                            onChange={ChangeTemperature}
                            onFocus={clearTemperatureField}
                            id="submit"
                            name="temperature"
                            minLength={1}
                            required
                        />
                    </p><br/>
                    <p id="submit">
                        <label id="submit">Date:</label>
                        <input
                            value={date}
                            onChange={ChangeDate}
                            onFocus={clearDateField}
                            id="submit"
                            name="date"
                            minLength={9}
                            required/>
                    </p><br/>
                    <p id="submit">
                        <label id="submit">Summary:</label>
                        <input id="submit"
                               value={summary}
                               minLength={2}
                               onChange={ChangeSummary}
                               onFocus={clearSummaryField}
                               required/>
                    </p><br/>

                </div>
                <br/>
                <div>
                    <button type="submit" className="btn btn-outline-primary">Submit
                    </button>
                </div>
            </FormWithConstraints>
        </>
    )
}


export default WeatherForecastModalForm;