import React, {Component} from "react";
import ForecastDetails from '../ForecastDetails/ForecastDetails';
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import styles from "./WeatherForecast.module.css";


class WeatherForecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    render() {
        return (
            <div>
                {this.state.loading ? <LoadingIcon/> :
                    <table className={`table table-active table-bordered table-striped table-hover ${styles.weather}`}>
                        <thead>
                        <tr className="text-center width: 960px">
                            <th scope="col">City</th>
                            <th scope="col">Temperature in Celsius</th>
                            <th scope="col">Summary</th>
                            <th scope="col">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.wf.map(el => <ForecastDetails key={el.id} wf={el}/>)}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

export default WeatherForecast;