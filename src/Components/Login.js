import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, TextField, Button, Typography, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required and cannot have leading/trailing spaces.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const resultAction = await dispatch(login(formData));
    if (login.fulfilled.match(resultAction)) {
      setMessage("Login successful!");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } else {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: "url('https://source.unsplash.com/featured/?login')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 1.5,
      }}
    >
      <Card sx={{ maxWidth: 400, padding: 3, borderRadius: 3, boxShadow: 2,marginBottom:20 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
          Log in to continue sharing your stories.
        </Typography>
        {loading && <LinearProgress />}
        {message && <Typography color="success.main">{message}</Typography>}
        {error && <Typography color="error.main">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="dense"
            error={!!errors.username}
            helperText={errors.username}
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="dense"
            error={!!errors.password}
            helperText={errors.password}
            required
          />
        <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
          If you don't have account ? <a href="/register">Sign Up</a>
        </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 1.5, padding: 1 }}
          >
            Login
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default Login;
