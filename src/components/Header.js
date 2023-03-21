import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
// import "./Login.css"
import { useHistory } from "react-router-dom";
// import { ThemeProvider } from "@emotion/react";
// import theme from "/home/crio-user/workspace/deenakrishnaveni-ME_QKART_FRONTEND_V2/src/theme.js";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
  let username = localStorage.getItem("username");
  function logout()
  {
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    localStorage.removeItem("balance")
    history.push("/products")
    window.location.reload()

  }
    return (
      
      <Box className="header">
        
        
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children} 
        {hasHiddenAuthButtons?(
                  <Button
                  className="explore-button"
                  startIcon={<ArrowBackIcon />}
                  variant="text"
                  onClick={(e) => {history.push("/")}}
                >
                  Back to explore
                </Button>

        ):(username?(
           <Stack direction="row" spacing={2} alignItems="center">
            <Avatar alt={username} src="/public/avatar.png" />
            <p>{username}</p>
            <Button variant="text" className="explore-button" onClick={logout}>LOGOUT</Button>
          </Stack>
        ):(
          <Stack direction="row" spacing={2} alignItems="center">
            {/* <Avatar alt={username} src="/public/avatar.png" />
            <p>{username}</p> */}
            <Button variant="text" className="explore-button" onClick={(e) => history.push("/login")}>LOGIN</Button>
            <Button variant="contained"  onClick={(e) => history.push("/register")}>REGISTER</Button>
          </Stack>
        ))}
        
        

      </Box>
      
    );
};

export default Header;


