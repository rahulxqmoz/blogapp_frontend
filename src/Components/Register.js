import React, { useState } from "react";
import { TextField, Button, Box, Card, Typography, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 8) newErrors.password = "Password must be 8+ characters.";
    if (formData.password !== formData.password2) newErrors.password2 = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const resultAction = await dispatch(register(formData));
      if (register.fulfilled.match(resultAction)) {
        setMessage("Registration successful!");
        setFormData({
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password2: "",
        });
        setTimeout(() => navigate("/login"), 1000);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "url('https://source.unsplash.com/featured/?blog') no-repeat center/cover",
      }}
    >
      <Card sx={{ maxWidth: 350, p: 2, borderRadius: 2, boxShadow: 1 ,marginBottom:9}}>
        <Typography variant="h6" align="center" gutterBottom>
          Join Our Community
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
          Share your stories, thoughts, and ideas with the world.
        </Typography>
        {loading && <LinearProgress />}
        {message && <Typography color="success.main">{message}</Typography>}
        {error && <Typography color="error.main">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          {["username", "first_name", "last_name", "email", "password", "password2"].map((field, idx) => (
            <TextField
              key={idx}
              label={field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              type={field.includes("password") ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required={["username", "first_name", "email", "password", "password2"].includes(field)}
              error={!!errors[field]}
              helperText={errors[field]}
            />
          ))}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
            Register
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default Register;
