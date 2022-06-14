import React, {useEffect, useState} from 'react';
import styles from './Menu.module.css';
import {Navigate, NavLink} from 'react-router-dom';

function Menu() {
    const [nickName, setNickName] = useState ('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:7222/api/user', {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });

                const content = await response.json();

                setNickName(content.nickName);
            }
        )();
    },[]);


    const logout = async () => {
        await fetch('http://localhost:7222/api/logout',{
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        });
        setNickName('');
        setRedirect(true);
    }

    if(redirect){
        window.location.reload(false);
    }

    let nav;

    if(typeof nickName === 'undefined' || nickName === ''){
        nav = (
            <div>
                <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/signin" className="nav-link">Login</NavLink>
                    </li>
                </ul>
            </div>
        )
    } else {
        nav =(
            <div>
                 <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" onClick={logout}>Logout</NavLink>
                    </li>
                </ul>
            </div>
        )
    }

return (
    <div className={`sticky-top ${styles.menu}`}>
        {nav}
    </div>
    );
}

export default Menu;