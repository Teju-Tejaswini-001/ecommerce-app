import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleRegister = async () => {

    if (password !== confirmPassword) {

      alert("Passwords do not match");

      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).{6,}$/;

    if (!passwordRegex.test(password)) {

      alert(
        "Password must contain:\n" +
        "- 1 uppercase letter\n" +
        "- 1 number\n" +
        "- 1 special character\n" +
        "- minimum 6 characters"
      );

      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert(res.data);

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert("Registration Failed");
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

      <h1>Register</h1>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) =>
          setName(e.target.value)
        }
        style={{
          margin: "10px",
          padding: "10px",
          width: "250px"
        }}
      />

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

      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) =>
          setConfirmPassword(e.target.value)
        }
        style={{
          margin: "10px",
          padding: "10px",
          width: "250px"
        }}
      />

      <button
        onClick={handleRegister}
        style={{
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Register
      </button>

    </div>
  );
}

export default Register;