"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const USERNAME = process.env.NEXT_PUBLIC_LOGIN_USERNAME || "";
const PASSWORD = process.env.NEXT_PUBLIC_LOGIN_PASSWORD || "";

export default function LoginGate({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    setLoggedIn(auth === "true");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === USERNAME && password === PASSWORD) {
      sessionStorage.setItem("auth", "true");

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false
      });

      setLoggedIn(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        text: "Username or password is incorrect"
      });
    }
  };

  if (loggedIn === null) return null;
  if (!loggedIn) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff"
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            width: "320px",
            padding: "30px",
            border: "1px solid #ddd",
            borderRadius: "8px"
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase().trim())}
            style={{
              width: "100%",
              marginBottom: "15px",
              padding: "10px",
              color: "#000", // text color when typing
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            style={{
              width: "100%",
              marginBottom: "15px",
              padding: "10px",
              color: "#000", // text color when typing
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#000",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return children;
}
