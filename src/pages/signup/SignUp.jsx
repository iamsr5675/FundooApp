import React, { useState } from "react";
import Box from "@mui/material/Box";
import "./SignUp.css";
import Title from "../../components/title/Title";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import account from "../../assets/signup/account.svg";
import { UserSignUp } from "../../service/UserSignUp";

function SignUp() {
  const firstNameRegex = /[A-Z]{1}[a-z]{2,}/;
  const lastNameRegex = /[A-Z]{1}[a-z]{2,}/;
  const emailRegex =
    /^[a-zA-Z]+[a-zA-Z0-9]*[- . + _]?[a-zA-Z0-9]+[@]{1}[a-z0-9]+[.]{1}[a-z]+[.]?[a-z]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;

  const [passwordType, setPasswordType] = useState("password");
  const [firstHelper, setFirstHelper] = useState("");
  const [firstError, setFirstError] = useState(false);
  const [lastHelper, setLastHelper] = useState("");
  const [lastError, setLastError] = useState(false);
  const [emailHelper, setEmailHelper] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [feildObj, setFeildObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "advance",
    password: "",
  });

  const takeFirstName = (event) => {
    setFeildObj({ ...feildObj, firstName: event.target.value });
  };

  const takeLastName = (event) => {
    setFeildObj({ ...feildObj, lastName: event.target.value });
  };

  const takeEmail = (event) => {
    setFeildObj({ ...feildObj, email: event.target.value });
  };

  const takePassword = (event) => {
    setFeildObj({ ...feildObj, password: event.target.value });
  };

  const onSubmit = () => {
    if (firstNameRegex.test(feildObj.firstName)) {
      setFirstError(false);
      setFirstHelper("");
    } else {
      setFirstError(true);
      setFirstHelper("Enter first name");
    }
    if (lastNameRegex.test(feildObj.lastName)) {
      setLastError(false);
      setLastHelper("");
    } else {
      setLastError(true);
      setLastHelper("Enter surname");
    }
    if (emailRegex.test(feildObj.email)) {
      setEmailError(false);
      setEmailHelper("");
    } else {
      setEmailError(true);
      setEmailHelper("Enter an email or phone number");
    }
    if (passwordRegex.test(feildObj.password)) {
      setPasswordError(false);
      setPasswordHelper("");
    } else {
      setPasswordError(true);
      setPasswordHelper("Enter a password");
    }
    // if (
    //   firstNameRegex === true &&
    //   lastNameRegex === true &&
    //   emailRegex === true &&
    //   passwordRegex === true
    // ) {
    UserSignUp(feildObj)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(feildObj);
  };

  const showHandler = () => {
    setPasswordType("text");
  };

  return (
    <>
      <div className="signup">
        <Box
          className="box"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="section1">
            <div className="title">
              <Title />
            </div>
            <div className="create">
              <h1>Create your Fundoo Account</h1>
            </div>
            <div className="text1">
              <TextField
                onChange={takeFirstName}
                error={firstError}
                helperText={firstHelper}
                margin="normal"
                size="small"
                id="first-name"
                label="First name"
                variant="outlined"
              />
              <TextField
                onChange={takeLastName}
                error={lastError}
                helperText={lastHelper}
                margin="normal"
                size="small"
                id="last-name"
                label="Last name"
                variant="outlined"
              />
            </div>
            <div className="text2">
              <TextField
                onChange={takeEmail}
                error={emailError}
                helperText={emailHelper}
                fullWidth
                helperText="You can use letters, numbers & periods"
                margin="normal"
                size="small"
                label="Username"
                id="username"
              />
            </div>
            <div className="text3">
              <Button
                style={{
                  textTransform: "none",
                  fontWeight: "bolder",
                  fontSize: "1.8vh",
                }}
                fullWidth
                size="small"
              >
                Use my current email address instead
              </Button>
            </div>
            <div className="text4">
              <TextField
                type={passwordType}
                onChange={takePassword}
                error={passwordError}
                helperText={passwordHelper}
                margin="normal"
                size="small"
                id="password"
                label="Password"
                variant="outlined"
              />
              <TextField
                margin="normal"
                size="small"
                id="confirm"
                label="Confirm"
                variant="outlined"
              />
            </div>
            <div className="text5">
              <p className="password-description">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </p>
            </div>
            <div className="text6">
              <FormControlLabel
                onClick={showHandler}
                control={<Checkbox />}
                label="Show password"
              />
            </div>
            <div className="text7">
              <div className="text71">
                <Button
                  style={{
                    textTransform: "none",
                    fontWeight: "bolder",
                    fontSize: "1.7vh",
                  }}
                  size="small"
                >
                  Sign in instead
                </Button>
              </div>
              <div className="text72">
                <Button onClick={onSubmit} variant="contained" size="medium">
                  Next
                </Button>
              </div>
            </div>
          </div>
          <div className="section2">
            <img class="acount-image" src={account} alt="Account" />
            <p class="mail-description">
              One account. All of FunDoo working for you.
            </p>
          </div>
        </Box>
      </div>
    </>
  );
}

export default SignUp;
