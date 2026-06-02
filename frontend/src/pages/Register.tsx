import { useState } from "react";

import { registerUser } from "../api/auth";

function Register() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await registerUser({
        name,
        email,
        password
      });

      alert("Registration Success");

    } catch {

      alert("Registration Failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>

      <input
        placeholder="Name"
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
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