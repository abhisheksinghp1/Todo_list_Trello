import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/auth";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const response =
        await loginUser({
          email,
          password
        });

      console.log(response);

      localStorage.setItem(
        "token",
        response.access_token
      );

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert("Login Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button type="submit">
        Login
      </button>

    </form>
  );
}

export default Login;