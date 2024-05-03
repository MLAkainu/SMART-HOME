import './Login.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiRequest';
// import { login } from '../../redux/apiRequest';


function Login({setUser,auth}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // dispatch(login({ username, password }));
        // const newUser = {
        //     username: username,
        //     password: password
        // }
        // login(newUser, dispatch, navigate);
        try
        {
          const userCredential = await auth.signInWithEmailAndPassword(
            email,
            password
          );
          setUser(userCredential.user);
        //   const idToken = await auth.currentUser.getIdToken();
          navigate("/dashboard");
        //   login(dispatch, navigate);
        }
        catch (err) {
            console.log(err)
        }
        
        // navigate('/dashboard');
    };
    return (
        <div className='login'>
            <section>
                <div className="form-loginbox">
                    <div className="form-value">
                        <form onSubmit={handleSubmit}>
                                <h2>Login</h2>
                                <div className="inputbox">
                                    <input type="text" onChange={(e) => setEmail(e.target.value)} />
                                    <label>Email</label>
                                </div>
                                <div className="inputbox">
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                                    <label>Password</label>
                                </div>
                                <button type="submit" className='login-btn'>Login</button>
                                <div className="register-block">
                                    <p>Don't have an account? <a href="/register">Register</a></p>
                                </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )


}
export default Login;
