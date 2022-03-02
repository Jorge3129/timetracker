import {BACKEND_PORT} from "../../config";
import {useState} from "react";
import {useNavigate} from "react-router";

async function post(user) {
    try {
        const response = await fetch(`http://localhost:${BACKEND_PORT}/auth/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            credentials: "include"
        });
        const content = await response.json();
        console.log(content);
    } catch (e) {
        console.log(e)
    }
}

const Register = ({setLoggedIn}) => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        post({username: user, password});
        setLoggedIn(0);
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div className="login-wrapper">
            <h1>Register</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <label>
                    <p>Username</p>
                    <input onChange={(e) => {
                        setUser(e.target.value)
                    }} type="text"/>
                </label>
                <label>
                    <p>Password</p>
                    <input onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="password"/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
