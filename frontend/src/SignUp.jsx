import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {LINKS} from "./global"




export default function SignUp() {
  const navigate = useNavigate();
  const [buttonw, setButtonw] = useState("success")

  const {values,handleChange,handleSubmit}=useFormik({
    initialValues:{
      username:"",
      email:"",
      password:""
    },
    onSubmit: async (values)=>{
      console.log(values)
      const data = await fetch(`${LINKS}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      if (data.status === 404){
        setButtonw("error")
      }else{
        setButtonw("success")
        navigate("/")
      }
      const result = await data.json();
      console.log(result);
    },
  })

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <TextField required fullWidth name="username" placeholder="Name" value={values.username} onChange={handleChange} id="outlined-basic" label="Name" variant="outlined"/>
      <TextField required fullWidth type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} id="outlined-basic" label="Email" variant="outlined"/>
      <TextField required fullWidth name="password" placeholder="Password" value={values.password} onChange={handleChange} id="outlined-basic" label="Password" variant="outlined"/>  
      <Button fullWidth type="submit" variant="outlined" color={buttonw}>{buttonw === "success" ? "signup":"user already exists"}</Button>     
      <a href="/">Already have an account?</a>
    </form>
    
  
  );
}
