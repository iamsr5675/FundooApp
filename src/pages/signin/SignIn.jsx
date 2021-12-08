import React, { useState } from "react";
import "./SignIn.css";
import Box from "@mui/material/Box";
import Title from "../../components/title/Title";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserSignIn } from "../../service/UserSignIn";

function SignIn() {
  const emailRegex =
    /^[a-zA-Z]+[a-zA-Z0-9]*[- . + _]?[a-zA-Z0-9]+[@]{1}[a-z0-9]+[.]{1}[a-z]+[.]?[a-z]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;

  const [passwordType, setPasswordType] = useState("password");
  const [emailHelper, setEmailHelper] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [feildObj, setFeildObj] = useState({
    email: "",
    password: "",
  });

  const takeEmail = (event) => {
    setFeildObj({ ...feildObj, email: event.target.value });
  };

  const takePassword = (event) => {
    setFeildObj({ ...feildObj, password: event.target.value });
  };

  const onSubmit = () => {
    if (emailRegex.test(feildObj.email)) {
      setEmailError(false);
      setEmailHelper("");
    } else {
      setEmailError(true);
      setEmailHelper("Enter an email or phone number");
    }
    // if (passwordRegex.test(feildObj.password)) {
    //   setPasswordError(false);
    //   setPasswordHelper("");
    // } else {
    //   setPasswordError(true);
    //   setPasswordHelper("Enter a password");
    // }
    // if (emailRegex === true && passwordRegex === true) {
    UserSignIn(feildObj)
      .then(function (response) {
        console.log(response.data.id);
        localStorage.setItem("token", response.data.id);
      })
      .catch(function (error) {
        console.log(error);
      });
    // }
    console.log(feildObj);
  };

  const showHandler = () => {
    setPasswordType("text");
  };

  return (
    <>
      <div className="signin">
        <Box
          className="box1"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="title1">
            <Title />
          </div>
          <div className="part1">
            <h1>Sign in</h1>
            <h3>Use your Fundoo Account</h3>
          </div>
          <div className="part2">
            <TextField
              onChange={takeEmail}
              error={emailError}
              helperText={emailHelper}
              fullWidth
              margin="normal"
              size="medium"
              id="Email or phone"
              label="Email or phone"
              variant="outlined"
            />
            <TextField
              type={passwordType}
              onChange={takePassword}
              error={passwordError}
              helperText={passwordHelper}
              fullWidth
              margin="normal"
              size="medium"
              id="Enter password"
              label="Enter password"
              variant="outlined"
            />
            <Button
              style={{
                textTransform: "none",
                fontWeight: "500",
                fontSize: "1.8vh",
                backgroundColor: "#fff",
                paddingLeft: "0%",
              }}
              size="small"
            >
              Forgot email?
            </Button>
          </div>
          <div className="part3">
            <p className="helper">
              Not your computer? Use Guest mode to sign in privately.
            </p>
            <Button
              style={{
                textTransform: "none",
                fontWeight: "500",
                fontSize: "1.8vh",
                backgroundColor: "#fff",
                paddingLeft: "0%",
              }}
              size="small"
            >
              Learn more
            </Button>
          </div>
          <div className="part4">
            <div className="part41">
              <Button
                style={{
                  textTransform: "none",
                  fontWeight: "bolder",
                  fontSize: "1.8vh",
                }}
                size="small"
              >
                Create account
              </Button>
            </div>
            <div className="part42">
              <Button onClick={onSubmit} variant="contained" size="medium">
                Next
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}

export default SignIn;
