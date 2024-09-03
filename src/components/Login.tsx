import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

interface LoginProps {
  onLogin: (status: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Replace this with your actual authentication logic
    if (username === "smartclassroom" && password === "password") {
      onLogin(true);
      navigate("/setting");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div id="content" className="flex">
              <div className="">
                <div className="page-content page-container" id="page-content">
                  <div className="padding">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-header">
                            <strong>Login to Admin Dashboard</strong>
                          </div>
                          <div className="card-body">
                            <form>
                              <div className="form-group">
                                <label
                                  className="text-muted"
                                  htmlFor="exampleInputEmail1"
                                >
                                  Username
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  placeholder="Enter username"
                                  onChange={(e) => setUsername(e.target.value)}
                                  value={username}
                                />{" "}
                              </div>
                              <div className="form-group">
                                <label
                                  className="text-muted"
                                  htmlFor="exampleInputPassword1"
                                >
                                  Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  placeholder="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />{" "}
                              </div>
                              <div className="form-group"></div>
                              <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleLogin}
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
