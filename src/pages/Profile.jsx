import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from "@mui/material";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import Navbar from "../components/Hearder";
import {toast} from 'react-toastify'

import { updateUserApi } from "../apis/Api";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profileImage: user.profileImage  ?? null, // Add profile image to user data
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUserData((prevData) => ({
      ...prevData,
      profileImage: file, // Set profile image in user data
    }));
  };

  const handleUpdateProfile =  (e) => {
    e.preventDefault();
   
      const formData = new FormData();
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("email", userData.email);
      formData.append("profileImage", userData.profileImage); // Append profile image to form data


    updateUserApi(user._id, formData).then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setUserData(res.data.user);
          console.log(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  return (
    <section>
      <Navbar />
      <Container sx={{ py: 8 }}>
        <Grid container spacing={5} justifyContent="center" alignItems="center">
          <Grid item xs={12} lg={6}>
            <Typography variant="h3" align="center" gutterBottom>
              Welcome, {user.firstName}!
            </Typography>
            <Typography variant="h2" align="center" gutterBottom className="mt-5">
             Change your profile 
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card variant="outlined">
              <CardContent>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={12} style={{ position: "relative" }}>
                    <Avatar
                      sx={{ width: 120, height: 120, margin: "auto" }}
                      src={userData.profileImage} // Display profile image
                    >
                      {/* <ProfileIcon fontSize="large" /> */}
                    </Avatar>

                    <input
                      type="file"
                      onChange={handleImageUpload}
                      style={{
                        fontSize: 9,
                        position: "absolute",
                        bottom: 0,
                        right: 52,
                        cursor: "pointer",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom>
                      Profile
                    </Typography>
                    <form>
                      <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                      />
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handleUpdateProfile}
                        sx={{ mt: 2 }}
                        style={{background: "linear-gradient(45deg, #fab96d, #ff650f)",}}
                      >
                        Edit Profile
                      </Button>
                    </form>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Profile;

// import React from "react";
// import { Link } from "react-router-dom";

// const Profile = () => {
//   // Retrieve user data from local storage
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <section>
//       <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
//         <div className="container">
//           <div className="row gx-lg-5 align-items-center">
//             <div className="col-lg-6 mb-5 mb-lg-0">
//               {/* Content specific to the profile page */}
//               <h1 className="my-5 display-3 fw-bold ls-tight">
//                 Welcome, {user.firstName}!
//               </h1>
//               {/* Display additional user information */}
//               <p>Email: {user.email}</p>
//               {/* You can display more information based on your user data structure */}
//               {/* Add more fields as needed */}
//             </div>

//             <div className="col-lg-6 mb-5 mb-lg-0">
//               <div className="card">
//                 <div className="card-body py-5 px-md-5">
//                   <h1 className="text-center fw-bold">Profile</h1>
//                   <form>
//                     {/* Display user information */}
//                     <div className="mb-4">
//                       <label className="form-label">First Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={user.firstName}
//                         readOnly
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label className="form-label">Last Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={user.lastName}
//                         readOnly
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label className="form-label">Email</label>
//                       <input
//                         type="email"
//                         className="form-control"
//                         value={user.email}
//                         readOnly
//                       />
//                     </div>

//                     {/* Add more fields as needed */}

//                     {/* Edit profile button */}
//                     <Link to="/editProfile" className="btn btn-primary btn-block mb-4">
//                       Edit Profile
//                     </Link>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Profile;
