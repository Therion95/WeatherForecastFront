import React, {useRef} from "react";
import {useSpring, animated} from "react-spring";
import {MdClose} from 'react-icons/md'
import styles from '../WeatherForecastModal/EditWeatherForecastModal.module.css'
import EditWeatherForecastModalForm from "../WeatherForecastModal/EditWeatherForecastModalForm";

export const WeatherForecastModal = (props) => {
    const modalRef = useRef();

    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: props.showModal ? 1 : 0,
        transform: props.showModal ? `translateY(0%)` : `translateY(-100%)`
    });

    const closeModal = e => {
        if (modalRef.current === e.target) {
            props.setShowModal(false);
        }
    };

    const closeAfterSubmit = () => props.setShowModal(false);
    return (
        <>
            {props.showModal ? (
                <div className={styles.background} onClick={closeModal} ref={modalRef}>
                    <animated.div style={animation}>
                        <div className={styles.modalWrapper}>
                            <div className={styles.modalContent}>
                                <EditWeatherForecastModalForm closeModal={closeAfterSubmit} weatherForecastsdata={props.weatherForecastData} loadingData={props.loadingData}/>
                            </div>
                            <MdClose className={styles.closeModalButton}
                                     aria-label='Close modal'
                                     onClick={() => props.setShowModal(prev => !prev)}
                            />
                        </div>
                    </animated.div>
                </div>
            ) : null}

        </>
    )
}
export default WeatherForecastModal;