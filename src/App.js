import React, {useState} from 'react';
import Menu from './components/Menu/Menu';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';



function App() {
    const [nickName, setNickName] = useState ('');

    const getUser =
        async () => {
            const response = await fetch('http://localhost:7222/api/user', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            });

            const content = await response.json();

            setNickName(content.nickName);
        }
    if (nickName !== '') {
        return getUser()
    }


    return (
        <div>
            <Router>
                <Menu nickName={nickName}/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/signin" element={<SignIn />}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
