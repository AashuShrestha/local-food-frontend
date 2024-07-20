import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../apis/Api";
import Navbar from "../components/Hearder";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    const data = {
      email: email,
      password: password,
    };

    loginApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          const convertedJson = JSON.stringify(res.data.userData);
          localStorage.setItem("user", convertedJson);

          if (res.data.userData.isAdmin) {
            navigate("/admin", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server Error!");
      });
  };

  return (
    <section>
      <Navbar />
      <div
        className="px-4 py-5 px-md-5 text-center text-lg-start"
        style={{
          backgroundColor: "hsl(0, 0%, 96%)",
          // backgroundImage: `url("/images/homepage.jpg")`, // Assuming the image is located in the public/images directory
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0 ">
              <img src="/images/hero.png" alt="" height="550px" width="full" />
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <h1 className="text-center fw-bold"> Login </h1>
                  <form>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3">
                        Email address
                      </label>
                      <input
                        onChange={changeEmail}
                        type="email"
                        id="form3Example3"
                        className="form-control"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                      <input
                        onChange={changePassword}
                        type="password"
                        id="form3Example4"
                        className="form-control"
                      />
                    </div>

                    <div className="form-check d-flex justify-content-start mb-4">
                      <Link
                        to="/forgot_password"
                        className="btn btn-link text-decoration-none"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn-login  btn-block mb-4"
                      style={{
                        background: "linear-gradient(45deg, #fab96d, #ff650f)",
                      }}
                    >
                      Login
                    </button>

                    <div className="text-center d-flex">
                      <p>Don't have an account?</p>
                      <Link
                        to="/register"
                        className="form-check-label mx-2 text-primary text-decoration-none"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
