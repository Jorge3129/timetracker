import {BACKEND_PORT} from "../../config";
import {useState} from "react";
import {useNavigate} from "react-router";

async function post(user) {
    try {
        const response = await fetch(`http://localhost:${BACKEND_PORT}/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            credentials: "include"
        });
        return await response.json();
    } catch (e) {
        console.log(e)
    }
}

const Login = ({loggedIn, setLoggedIn}) => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await post({username: user, password});
        if (!res.success) return;
        const userID = res.results[0]['userID'];
        localStorage.setItem('userID',userID)
        setLoggedIn(userID);
        navigate('/');
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
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

export default Login;
