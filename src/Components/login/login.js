import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getprofile } from "./../../redux/action";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Status</h4>
        <h5> {props.message} </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [authMode, setAuthMode] = useState("signin");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState({
    text: "",
    isTouch: false,
    error: "Your email is Not valid",
  });
  const [password, setPassword] = useState({
    text: "",
    isTouch: false,
    error: "Your Password is Not valid",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const [messageFor, setMessageFor] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "userName") {
      setUserName(value);
    }
    if (id === "mobile") {
      setMobile(value);
    }
    if (id === "email") {
      setEmail((last) => {
        console.log(last, "email");
        let help = JSON.parse(JSON.stringify(last));
        help.text = value;
        return { ...help };
      });
    }
    if (id === "password") {
      setPassword((last) => {
        console.log(last, "pass");
        let help = { ...last };
        help.text = value;
        return { ...help };
      });
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const toched = (e) => {
    setEmail((last) => {
      let help = { ...last };
      help.isTouch = true;
      return { ...help };
    });
  };
  const focoss = (e) => {
    setEmail((last) => {
      let help = { ...last };
      help.isTouch = false;
      return { ...help };
    });
  };
  const toched2 = (e) => {
    setPassword((last) => {
      let help = { ...last };
      help.isTouch = true;
      return { ...help };
    });
  };
  const focoss2 = (e) => {
    setPassword((last) => {
      let help = { ...last };
      help.isTouch = false;
      return { ...help };
    });
  };

  const handleSubmitsingin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/login",
        { email: email.text, password: password.text }
      );
      localStorage.setItem("token", `${data.user.token}`);

      setMessageFor(data.message);
      dispatch(getprofile());
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setMessageFor(error.message);
    }
  };

  const handleSubmitsingup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/signup",
        {
          username: userName,
          email: email.text,
          password: password.text,
          mobile: mobile,
        }
      );
      setAlertSuccess(true);

      setMessageFor(data.message);
    } catch (error) {
      setAlertError(true);
      setMessageFor(error.response.data.message);
    }
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");

    setEmail((last) => {
      let help = { ...last };
      help.text = "";
      return { ...help };
    });
    setPassword((last) => {
      let help = { ...last };
      help.text = "";
      return { ...help };
    });
    setUserName("");
    setConfirmPassword("");
    setMobile("");
  };
  const emailRegex = /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  console.log(password);

  if (authMode === "signin") {
    return (
      
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="email">Email address</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email.text}
                onChange={(e) => handleInputChange(e)}
                id="email"
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password.text}
                id="password"
                onBlur={toched2}
                onFocus={focoss2}
                onChange={(e) => handleInputChange(e)}
              />
              {!passRegex.test(password.text) && password.isTouch ? (
              <p style={{ color: "red" }}>{password.error}</p>
            ) : (
              false
            )}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmitsingin}
                disabled={passRegex.test(password.text)  ? false : true}
              >
                Sing-in
              </button>
            </div>
            <p className="text-center mt-2">Forgot ?</p>
          </div>
        </form>
      </div>
      
    );
  }

  return (
    
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Email Address"
              value={email.text}
              id="email"
              onBlur={toched}
              onFocus={focoss}
              onChange={(e) => handleInputChange(e)}
            />
            {!emailRegex.test(email.text) && email.isTouch ? (
              <p style={{ color: "red" }}>{email.error}</p>
            ) : (
              false
              )}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password.text}
              id="password"
              onBlur={toched2}
              onFocus={focoss2}
              onChange={(e) => handleInputChange(e)}
            />
            {!passRegex.test(password.text) && password.isTouch ? (
              <p style={{ color: "red" }}>{password.error}</p>
            ) : (
              false
            )}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Username"
              value={userName}
              id="userName"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Confirm Password"
              value={confirmPassword}
              id="confirmPassword"
              onChange={(e) => handleInputChange(e)}
            />
             { password.isTouch && confirmPassword !== password.text ? (
              <p style={{ color: "red" }}>Confrim password not True</p>
            ) : (
              false
            )}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="Mobile Number ... "
              value={mobile}
              onChange={(e) => handleInputChange(e)}
              id="mobile"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              className="btn btn-primary"
              onClick={handleSubmitsingup}
              disabled={emailRegex.test(email.text) && passRegex.test(password.text) && confirmPassword === password.text ? false : true}
            >
              Sing-up
            </button>
            <MyVerticallyCenteredModal
              show={alertSuccess}
              onHide={() => {
                setAlertSuccess(false);
                setAuthMode(authMode === "signin" ? "signup" : "signin");
              }}
              message={messageFor}
            />
            <MyVerticallyCenteredModal
              show={alertError}
              onHide={() => {
                setAlertError(false);
              }}
              message={messageFor}
            />
          </div>
          <p className="text-center mt-2">Forgot ?</p>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Login);
