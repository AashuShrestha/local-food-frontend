import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { registerApi } from '../apis/Api';
import "bootstrap/dist/css/bootstrap.css";
import '../styles/login.css';
import Navbar from '../components/Hearder';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();
  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    registerApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          navigate('/login')
          
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  return (
    <section>
    <Navbar/>
      <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' ,
      //  backgroundImage: `url("/images/homepage.jpg")`, // Assuming the image is located in the public/images directory
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"}}>
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
            <img src="/images/hero.png" height="550px" width="full" alt="" />
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <h1 className='text-center fw-bold'> Sign Up </h1>
                  <form>
                    {/* First Name input */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1">First Name</label>
                      <input onChange={changeFirstName} type="text" id="form3Example1" className="form-control" />
                    </div>

                    {/* Last Name input */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example2">Last Name</label>
                      <input onChange={changeLastName} type="text" id="form3Example2" className="form-control" />
                    </div>

                    {/* Email input */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3">Email address</label>
                      <input onChange={changeEmail} type="email" id="form3Example3" className="form-control" />
                    </div>

                    {/* Password input */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4">Password</label>
                      <input onChange={changePassword} type="password" id="form3Example4" className="form-control" />
                    </div>

                    {/* Submit button */}
                    <button type="submit" onClick={handleSubmit} className="btn-login btn-block mb-4" style={{background: "linear-gradient(45deg, #fab96d, #ff650f)",}}>
                      Sign Up
                    </button>

                    {/* Login buttons */}
                    <div className="text-center d-flex">
                      <p>Already have an account?</p>
                     <Link to="/login"> <label className="form-check-label mx-2 text-primary" htmlFor="form2Example33">
                        Login
                      </label></Link>
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
}

export default SignUp;
