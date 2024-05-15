import React from "react";
import { useState } from "react";
import axios from "axios";
import "../componets/styles/login-style.css";
import { domain, endPoints } from "../services/apis";
import { HttpService } from "../services/httpservice";

export const Login = () => {
  let intialFormValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(intialFormValues);
  const changeFormValues = (event) =>
    setFormValues({ ...formValues, [event.target.name]: event.target.value });

  async function login() {
    if (!formValues.email || !formValues.password) return "Field required";
    else {
      try {
        axios
          .post(domain + endPoints.login, {
            email: formValues.email,
            password: formValues.password,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={changeFormValues}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            onChange={changeFormValues}
          />
        </div>

        <br></br>

        <div className="btn btn-primary" onClick={login}>
          Login
        </div>
      </form>
    </>
  );
};
