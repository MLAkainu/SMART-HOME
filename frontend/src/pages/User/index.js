import './User.css'
import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux"
import { TextField, Button, Avatar, Input } from '@mui/material';
import { changeavatar, changeinfor, changepass } from '../../redux/apiRequest';

function User(props) {

    console.log(props);
    const user = {
        data: {
            id: 1,
            firstname: "Lokk",
            lastname: "Nguyen Minh",
            email: "minhloc1605@icloud.com",
            phonenumber: "0123456789",
            username: "lokknm",
            password: "123456",
            avatar: "../../../assets/avatar.jpg"
        }
    }
    const [firstname, setFirstname] = useState(props.user.fname);
    const [lastname, setLastname] = useState(props.user.lname);
    const [email, setEmail] = useState(user.data.email);
    const [phonenumber, setPhonenumber] = useState(props.user.phoneNo);
    const [oldpassword, setOldpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [avatar, setAvatar] = useState(user.data.avatar);
    const [avatarchange, setAvatarchange] = useState(user.data.avatar);
    const form1Ref = useRef(null);
    const form2Ref = useRef(null);
    const form3Ref = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const handleSubmit1 = async (event) => {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append("avt", avatar);
    //     console.log("User", user)
    //     changeavatar(formData, dispatch, user.data.id);
    // };
    // const handleSubmit2 = async (event) => {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append("firstname", firstname)
    //     formData.append("lastname", lastname)
    //     formData.append("email", email)
    //     formData.append("phone", phonenumber)
    //     changeinfor(formData, dispatch, user.data.id)
    // };
    // const handleSubmit3 = async (event) => {
    //     event.preventDefault();
    //     let data ={
    //         "old_password": oldpassword,
    //         "new_password": newpassword
    //     }
    //     changepass(data, dispatch, user.data.id)
    // };
    // const handleFileChange = async (event) => {
    //     event.preventDefault();
    //     const file = event.target.files[0];
    //     setAvatar(file);
    //     setAvatarchange(URL.createObjectURL(file))
    // };

    return (
        <div className='user-wrapper'>
            <div className='user-field1'>
                <Avatar className="avatar" alt="Remy Sharp" src={avatarchange} sx={{ width: 200, height: 200 }} style={{ border: 0 }} />
                <div className="avatar-wrapper">
                    {/* <Input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                    /> */}
                    <Input
                        type="file"
                        
                        accept="image/*"
                    />
                </div>
                {/* <form ref={form1Ref} onSubmit={handleSubmit1}> */}
                <form ref={form1Ref}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Change avatar
                    </Button>
                </form>
            </div>
            <div className='user-field2'>
                {/* <form ref={form2Ref} onSubmit={handleSubmit2}> */}
                <form ref={form2Ref} >
                    <TextField
                        id="firstname"
                        label="Firstname"
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        size="small"
                        fullWidth
                    />
                    <TextField
                        id="lastname"
                        label="Lastname"
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        size="small"
                        fullWidth
                    />
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        size="small"
                        fullWidth
                    />
                    <TextField
                        id="phonenumber"
                        label="Phonenumber"
                        type="text"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        size="small"
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Change information
                    </Button>
                </form>
            </div>
            <div className='user-field3'>
                {/* <form ref={form3Ref} onSubmit={handleSubmit3}> */}
                <form ref={form3Ref}>
                    <TextField
                        id="oldpassword"
                        label="Old password"
                        type="password"
                        value={oldpassword}
                        onChange={(e) => setOldpassword(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        size="small"
                        fullWidth
                    />
                    <TextField
                        id="newpassword"
                        label="New password"
                        type="password"
                        value={newpassword}
                        onChange={(e) => setNewpassword(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        size="small"
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Change password
                    </Button>
                </form>
            </div>
        </div>
    )
}
export default User;