import React, {useState} from 'react';
import {Navigate} from "react-router-dom";
import {NavLink} from 'react-router-dom';
import styles from './SignIn.module.css';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);


    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:7222/api/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', 'withCredentials': 'true'},
            body: JSON.stringify({
                email,
                password
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1);
                    setRedirect(true)
                } else
                    window.alert('Login failed: incorrect username or password')
            })
    }

    if (redirect) {
        return <Navigate to="/"/>
    }

    return (
        <div className={`${styles.container} `}>
            <h1>Weather Forecast</h1>
            <p className={styles.subtitle}>To edit weather forecasts in biggest city in Poland, please log in as admin.
            </p>
            <form onSubmit={submit}>
                <h2 className="h3 mb-3 fw-normal">Please sign in</h2>
                <input id={1} type="email" className="form-control" placeholder="name@example.com"
                       onChange={e => setEmail(e.target.value)}
                />
                <input id={2} type="password" className="form-control" placeholder="password"
                       onChange={e => setPassword(e.target.value)}
                />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <NavLink to="/register" className="nav-link">Register if you want to become admin. :) (Normally would be
                    hidden :p)</NavLink>
            </form>
        </div>
    );
}

export default SignIn;