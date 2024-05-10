import './User.css'
import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux"
import { TextField, Button, Avatar, Input } from '@mui/material';
import { changeavatar, changeinfor, changepass } from '../../redux/apiRequest';

function User({user,auth,firebase}) {
    
    const [firstname, setFirstname] = useState(user.fname);
    const [lastname, setLastname] = useState(user.lname);
    const [email, setEmail] = useState(user.email);
    const [phonenumber, setPhonenumber] = useState(user.phoneNo);
    const [oldpassword, setOldpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [avatar, setAvatar] = useState(user.avatar);
    const [avatarchange, setAvatarchange] = useState(user.avatar);
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
    const handleSubmit2 = async (event) => {
      event.preventDefault();
      const user = auth.currentUser; 
      const updatedEmail = email;

      try {
          // Kiểm tra và cập nhật email trong Firebase Auth nếu thay đổi
          if (user && user.email !== updatedEmail) {
              await user.updateEmail(updatedEmail);
              console.log("Email updated successfully in Auth.");
          }
          // Cập nhật thông tin người dùng trong Firestore
          if (user) {
              const idToken = await auth.currentUser.getIdToken();
              const newInfo = {
                firstname: firstname,
                lastname: lastname,
                email: updatedEmail, 
                phone: phonenumber,
                token:idToken,
              }
              //console.log({newInfo});
              await changeinfor(newInfo, dispatch);
              console.log("User information updated successfully in Firestore.");
          }
      } catch (error) {
          console.error("Error updating user information:", error);
      }
    };
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
    const handleSubmit3 = async (e) => {
        e.preventDefault();
        const user = await auth.currentUser;
    const currentPassword = oldpassword;
        const newPassword = newpassword;
        // console.log("ff=", firebase.auth.EmailAuthProvider);
// console.log('userff=',user)
    // Re-authenticate the user with the current password
        // console.log('cre=',auth.EmailAuthProvider.credential(user.email, currentPassword));
        const credential = user
          ? firebase.auth.EmailAuthProvider.credential(
              user.email,
              currentPassword
            )
            : null;
    
        if (credential) {
          auth.currentUser
            .reauthenticateWithCredential(credential)
            .then(() => {
              // Update password if re-authentication is successful
              user
                .updatePassword(newPassword)
                .then(() => {
                  // Password update successful
                  console.log("Password updated successfully!");
                })
                .catch((error) => {
                  console.error("Error updating password:", error);
                });
            })
            .catch((error) => {
              console.error("Error re-authenticating user:", error);
            });;
          // ... rest of your code
        } else {
          console.error(
            "User is not logged in. Password change cannot be performed."
          );
        }

      

    }

    return (
      <div className="user-wrapper">
        <div className="user-field1">
          <Avatar
            className="avatar"
            alt="Remy Sharp"
            src={avatarchange}
            sx={{ width: 200, height: 200 }}
            style={{ border: 0 }}
          />
          <div className="avatar-wrapper">
            {/* <Input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                    /> */}
            <Input type="file" accept="image/*" />
          </div>
          {/* <form ref={form1Ref} onSubmit={handleSubmit1}> */}
          <form ref={form1Ref}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Change avatar
            </Button>
          </form>
        </div>
        <div className="user-field2">
          {/* <form ref={form2Ref} onSubmit={handleSubmit2}> */}
          <form ref={form2Ref} onSubmit={handleSubmit2}>
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
        <div className="user-field3">
          {/* <form ref={form3Ref} onSubmit={handleSubmit3}> */}
          <form ref={form3Ref} onSubmit={handleSubmit3}>
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
    );
}
export default User;