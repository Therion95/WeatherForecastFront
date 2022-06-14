import React, {Component} from "react";
import ForecastDetailsLogged from '../ForecastDetails/ForecastDetailsLogged';
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
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.wf.map(el => <ForecastDetailsLogged key={el.id} wf={el} loadingData={this.props.loadingData}/>)}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

export default WeatherForecast;