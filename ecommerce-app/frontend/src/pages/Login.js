import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "email",
        email
      );

      alert("Login Successful");

      navigate("/");

    } catch (err) {

      console.log(err);

      alert("Invalid Credentials");
    }
  };

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px"
      }}
    >

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          margin: "10px",
          padding: "10px",
          width: "250px"
        }}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={{
          margin: "10px",
          padding: "10px",
          width: "250px"
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Login
      </button>

    </div>
  );
}

export default Login;