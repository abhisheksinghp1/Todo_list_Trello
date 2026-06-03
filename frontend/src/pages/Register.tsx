import { useState } from "react";

import { registerUser } from "../api/auth";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await registerUser({
        name,
        email,
        password
      });

      alert(
        "Registration Success"
      );

    } catch {

      alert(
        "Registration Failed"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <h1>Register</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
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
        Register
      </button>

    </form>
  );
}

export default Register;