import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {LINKS} from "./global"


export default function SignIn() {

  const navigate = useNavigate();
  const [form, setForm] = useState("success")

  const {values, handleChange, handleSubmit} = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
     const data =  await fetch(`${LINKS}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      })
      if(data.status === 404) {
        console.log("Error")
        setForm("error")
      }else{
        setForm("success")
        const result = await data.json();
        console.log(result, "Success");
        localStorage.setItem("token", result.token)
        navigate("/home")
      }
      
    },
  });

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <TextField required fullWidth name="email" placeholder="Email" value={values.email} onChange={handleChange} id="outlined-basic" label="Email" variant="outlined"/>
      <TextField required fullWidth name="password" placeholder="Password" value={values.password} onChange={handleChange} id="outlined-basic" label="Password" variant="outlined"/>  
      <Button fullWidth variant="outlined" type="submit" color={form}>{form === "success" ? "Sign In":"Retry"}</Button>
      <a href="/signup">Don't have an account?</a>
    </form>
  );
}
