import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData,setformdata] = useState({
    username:"",
    password:"",
    confirmPassword:""
  })
  // const [username,setusername] = useState("");
  // const [password,setpassword] = useState("");
  // const [confirmPassword,setconfirmpassword] = useState("");
  const [loading,setloading] = useState(false);
  const history = useHistory();
 

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  
  const register = async (formData) => {

    const newFormobject ={
      username:formData.username,
      password:formData.password
    }
   
    let isvalid = validateInput(formData);
    if(!isvalid)
    {
      return false;
    }

    

    try{
      setloading(true);
      
      let response = await axios.post(`${config.endpoint}/auth/register`,newFormobject);
      //console.log(response.data);
      setloading(false);
      if(response.status === 201){
      enqueueSnackbar("Registered successfully",{variant:'success'});
      //alert("success");
      history.push("/login");
    }

  }
    catch(error)
    {
      setloading(false);
      // axios.post(`${url}/auth/register`,{
      //   username:formData.username,
      //    password:formData.password
      //  }).catch(e =>{
      //   if(e.response)
      //   {
      //     enqueueSnackbar(e.response.data.message,{variant:'error'})
      //   }
      //   else{
        if(error.response && error.response.status === 400){
          enqueueSnackbar("Username is already taken",{variant:"error"});
        }
        else{
          enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{variant:"error"});
        }
      //   }
      // })
      //setloading(false);
      //return e.response;
    }
    }

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    let userLen = data.username.length;
    let passLen = data.password.length;
    if(userLen<1)
    {
      enqueueSnackbar("Username is a required field",{variant:'warning'});
      return false;
    }
    else if(userLen<6)
    {
      enqueueSnackbar("Username must be at least 6 characters",{variant:'warning'});
      return false;
    }
    else if(passLen<1)
    {
      enqueueSnackbar("Password is a required field",{variant:'warning'});
      return false;
    }
    else if(passLen<6)
    {
      enqueueSnackbar("Password must be at least 6 characters",{variant:'warning'});
      return false;
    }
    else if(data.password !== data.confirmPassword)
    {
      enqueueSnackbar("Passwords do not match",{variant:'warning'});
      return false;
    }
    else
    {
      return true;
    }

  };

  function handlevalue(event,property){
    let obj ={
      [property]:event.target.value
    }
    setformdata(prev => (
      {
        ...prev,
        ...obj
      }
    ))
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={function(event)
            {
              handlevalue(event,"username")
            }}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={function(event)
              {
                handlevalue(event,"password")
              }}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={function(event)
              {
                handlevalue(event,"confirmPassword")
              }}
          />
          <div style={{display:"flex",justifyContent:"center"}}>
          {loading?<CircularProgress />
           :<Button className="button" variant="contained" onClick={() => register(formData)}>
            Register Now
           </Button>}
           </div>
          <p className="secondary-action">
            Already have an account?{" "}
             <Link to="/Login" className="link">
              Login here
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;


