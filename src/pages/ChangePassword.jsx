import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changePasswordApi } from "../apis/Api"; // Assuming you have an API for changing the password
// import "../styles/login.css";
import Navbar from "../components/Hearder";
import { Height } from "@mui/icons-material";

const ChangePassword = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  // make useState
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // make change function
  const changeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const changeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(oldPassword, newPassword);

    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      userId: userId,
    };

    // api call to change password
    changePasswordApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);

          localStorage.clear();
          // Optionally, you may want to redirect the user to the login page after changing the password
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server Error!");
      });
  };

  return (
    <div>
      <Navbar />
      <div
        className=" container-fluid px-4 py-5 px-md-5 text-center text-lg-start"
        // style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
        style={{
          backgroundColor: "hsl(0, 0%, 96%)",
          // backgroundImage: `url("/images/homepage.jpg")`, // Assuming the image is located in the public/images directory
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",// Center the background image
        }}
      >
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              {/* Content specific to change password page */}
              <h1 className="my-5 display-3 fw-bold ls-tight text-black">
                Change Your Password
              </h1>
              <p style={{ color: "black" }}>
                {/* Add a relevant description for changing the password */}
                "Secure your account by changing your password regularly."
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <h1 className="text-center fw-bold">Change Password</h1>
                  <form>
                    {/* Old Password input */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1">
                        Old Password
                      </label>
                      <input
                        onChange={changeOldPassword}
                        type="password"
                        id="form3Example1"
                        className="form-control"
                      />
                    </div>

                    {/* New Password input */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example2">
                        New Password
                      </label>
                      <input
                        onChange={changeNewPassword}
                        type="password"
                        id="form3Example2"
                        className="form-control"
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn  btn-block mb-4"
                      style={{background: "linear-gradient(45deg, #fab96d, #ff650f)",}}
                    >
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
