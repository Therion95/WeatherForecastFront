import React, {useState, useRef} from "react";
import styles from './WeatherForecastModalForm.module.css'
import 'core-js';
import 'regenerator-runtime/runtime';
import 'raf/polyfill';
import {
    Async,
    FieldFeedback,
    FieldFeedbacks,
    FormWithConstraints,
    Input
} from 'react-form-with-constraints-bootstrap';


function WeatherForecastModalForm(props) {

    const form = useRef(null);
    const [date, setDate] = useState("Provide date");
    const [city, setCity] = useState("Provide city description");
    const [temperature, setTemperature] = useState("Provide temperature in Celsius");
    const [summary, setSummary] = useState("Provide weather short description");
    const [data, setData] = useState("");


    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

    const clearTemperatureField = () => setTemperature('');
    const clearDateField = () => setDate('');
    const clearCityField = () => setCity('');
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

    async function ChangeCity(event) {
        setSubmitButtonDisabled(true)
        let checkIfCityAlreadyExists = props.weatherForecastsCities.includes(event.target.value)
        setCity(event.target.value);
        await form.current.validateFields(event.target);
        if (event.target.value.length > 0 && checkIfCityAlreadyExists === false) {
            setSubmitButtonDisabled(false)
        }
        // setSubmitButtonDisabled(!form.current.isValid());
    }

    async function checkCitiesAvailability(value) {
        if (!(/\S/.test(value)) || value === '') {
            return false;
        }
        return !props.weatherForecastsCities.includes(value);
    }

    function handleSubmit(e) {

        e.preventDefault();

        setSubmitButtonDisabled(!form.current.isValid());
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "city": city,
                    "date": date,
                    "temperatureC": temperature,
                    "summary": summary
                }
            )
        };
        fetch('http://localhost:7222/api/Weather/CreateNewWeather', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            }).then(props.loadingData).then(props.closeModal());
    }

    return (
        <>
            <br/>
            <h3>New weather forecast</h3>
            <FormWithConstraints ref={form} type="weather" onSubmit={handleSubmit}
                                 noValidate>
                <br/>
                <div className={styles.tableForm}>

                    <p id="submit">
                        <label id="submit">Temperature:</label>
                        <input
                            placeholder={temperature}
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
                            placeholder={date}
                            onChange={ChangeDate}
                            onFocus={clearDateField}
                            id="submit"
                            name="date"
                            minLength={9}
                            required/>
                    </p><br/>
                    <p id="submit">
                        <label id="submit">City:</label>
                        <input id="city" name="city" placeholder={city} minLength={2} onChange={ChangeCity}
                               onFocus={clearCityField} required/>
                    </p><br/>
                    <p id="submit">
                        <label id="submit">Summary:</label>
                        <input id="submit" placeholder={summary} minLength={2} onChange={ChangeSummary}
                               onFocus={clearSummaryField}
                               required/>
                    </p><br/>

                </div>
                <FieldFeedbacks for="city">
                    <FieldFeedback id="fieldForCity" when="tooShort">Too short</FieldFeedback>
                    <FieldFeedback when="*"/>
                    <Async
                        promise={checkCitiesAvailability}
                        pending={<span className="d-block"><div className={styles.info}>...<br/></div></span>}
                        then={available =>
                            available ? (
                                <FieldFeedback key="1" style={{color: '#198754' /* $green */}}>
                                    <div className={styles.info}>City name available.</div>
                                    <br/>
                                </FieldFeedback>
                            ) : (
                                <FieldFeedback key="2">
                                    <div className={styles.info}>City name already taken <br/>or wrong input, choose
                                        another.
                                    </div>
                                </FieldFeedback>
                            )
                        }
                    />

                </FieldFeedbacks>
                <br/>
                <div>
                    <button type="submit" disabled={submitButtonDisabled} className="btn btn-outline-primary">Submit
                    </button>
                </div>


            </FormWithConstraints>


        </>
    )
}


export default WeatherForecastModalForm;