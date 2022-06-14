import React, {useState} from 'react';
import {Navigate} from "react-router-dom";
import styles from './Register.module.css';

function Register() {
    const [input, setInput] = useState({
        nickName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState({
        nickName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [redirect, setRedirect] = useState(false);

    const onInputChange = e => {
        const {name, value} = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(e);
    }

    const validateInput = e => {
        let {name, value} = e.target;
        setError(prev => {
            const stateObj = {...prev, [name]: ""};

            switch (name) {
                case "nickName":
                    if (!value) {
                        stateObj[name] = "Please enter Username.";
                    }
                    break;

                case "email":
                    if (!value) {
                        stateObj[name] = "Please enter Email.";
                    }
                    break;

                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (input.confirmPassword && value !== input.confirmPassword) {
                        stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter confirm Password.";
                    } else if (input.password && value !== input.password) {
                        stateObj[name] = "Password and Confirm Password does not match.";
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    }

    const submit = async (e) => {
        const nickName = input.nickName;
        const email = input.email;
        const password = input.password;
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:7222/api/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    nickName,
                    email,
                    password,
                })
            })
                .then((response) => {
                    if (response.status === 200) {
                        setRedirect(true);
                    } else
                        window.alert('Registration failed, please try again.')
                })
        } catch (e) {
            console.log('error: ', e)
        }
    }

    if (redirect) {
        return <Navigate to="/signin"/>
    }

    return (
        <div className={`${styles.container} `}>
            <form onSubmit={submit}>
                <h2 className="h3 mb-3 fw-normal">Register</h2>

                <input
                    type="nickName"
                    name="nickName"
                    className="form-control"
                    placeholder="nickName"
                    value={input.nickName}
                    onChange={onInputChange}
                    onBlur={validateInput}/>
                {error.nickName && <span className='err'>{error.nickName}</span>}

                <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={input.email}
                    onChange={onInputChange}
                    onBlur={validateInput}/>
                {error.email && <span className='err'>{error.email}</span>}

                <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder='Enter Password'
                    value={input.password}
                    onChange={onInputChange}
                    onBlur={validateInput}/>
                {error.password && <span className='err'>{error.password}</span>}

                <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder='Enter Confirm Password'
                    value={input.confirmPassword}
                    onChange={onInputChange}
                    onBlur={validateInput}/>
                {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}

                <br/>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
            </form>
        </div>
    )
}


export default Register;

