import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Menu, MenuItem, Avatar, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const { user } = useSelector((state) => state.auth); // Access user state from Redux

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout())
    setAnchorEl(null);
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#333" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/home">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
            </>
          ) : (
            <>
            <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            </>
          )}
        </Box>
        {user && (
          <>
            <Avatar
              alt="User Avatar"
              src="https://source.unsplash.com/featured/?person"
              onClick={handleMenuOpen}
              sx={{ cursor: "pointer" }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
