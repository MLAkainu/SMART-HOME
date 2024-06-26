import "./Register.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';

function Register({auth}) {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     const formData = new FormData();
        //     const type = 'user';
        //     let img = "none";
        //     formData.append('type', type);
        //     formData.append('id', phonenumber);
        //     formData.append('firstname', firstname);
        //     formData.append('lastname', lastname);
        //     formData.append('username', username);
        //     formData.append('password', password);
        //     formData.append('avatar', img);
        //     let response = await register(formData, dispatch, navigate);
        //     console.log(response.data); // chuỗi token trả về từ server
        //     alert('Đăng ký tài khoản thành công');
        //     navigate('/');
        // } catch (error) {
        //     console.error(error);
        //     alert('Đăng ký tài khoản thất bại');
        //     navigate('/register')
        // }

        try {
            
            
            // phoneNo is no number alert error
            if (isNaN(phoneNo)) {
                alert("Phone number is not a number");
                return;
            }
            else {
                const userCredential = await auth.createUserWithEmailAndPassword(
                    email,
                    password
                  );
                const idToken = await auth.currentUser.getIdToken();
                const newUser = {
                    fname: fname,
                    lname: lname,
                    phoneNo: phoneNo,
                    token:idToken
                };
                await auth.signOut();
                await register(newUser, dispatch, navigate);
                alert("Đăng ký tài khoản thành công");
                navigate("/");
            }


           
        }
        catch (err) {
            await auth.signOut();
            console.log(err)

            

            if (err.code === "auth/email-already-in-use") {
                alert("Email đã được sử dụng");
            }

            alert("Đăng ký tài khoản thất bại");
            
            navigate("/register");
        }

    };
    return (
        <div className='register'>
            <section>
                <div className="form-box">
                    <div className="form-value">
                        <form onSubmit={handleSubmit}>
                            <h2>Sign up</h2>
                            <div className="box-name">
                                <div className="inputbox">
                                    <input type="text" onChange={(event) => setFname(event.target.value)} />
                                    <label >First Name</label>
                                </div>
                                <div className="inputbox">
                                    <input type="text" onChange={(event) => setLname(event.target.value)} />
                                    <label >Lastname</label>
                                </div>
                            </div>
                            <div className="inputbox">
                                <input type="text" onChange={(event) => setPhoneNo(event.target.value)} />
                                <label>Phonenumber</label>
                            </div>
                            <div className="inputbox">
                                <input type="text" onChange={(event) => setEmail(event.target.value)} />
                                <label>Email</label>
                            </div>
                            <div className="inputbox">
                                <input type="password" onChange={(event) => setPassword(event.target.value)} />
                                <label >Password</label>
                            </div>
                            <div className="register-btn-wrap">
                                <button className="sign-up">Sign up</button>
                                <div>
                                    <Link className ="register-link" to="/">Had an account</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )

}

export default Register;