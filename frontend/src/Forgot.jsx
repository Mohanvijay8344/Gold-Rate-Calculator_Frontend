
import { useFormik } from "formik";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {LINKS} from "./global"


export default function Forgot() {

  const {values,handleChange,handleSubmit}=useFormik({
    initialValues:{
     email:""
    },
    onSubmit:async (values)=>{
         console.log(values)
        const data= await fetch(`${LINKS}/forgot-password`, {
        method:"POST",
        headers: {"Content-type": "application/json",},
        body:JSON.stringify(values)
    })
 const result=await data.json()
 alert(result.status)
 console.log(result)
  },
  })
  return (
    <form onSubmit={handleSubmit}>
      <div className="form">
        <h1>Forgot-Password</h1>
        <TextField required fullWidth name="email" onChange={handleChange} value={values.email} label="Email" variant="outlined" />
        <Button fullWidth onClick={()=>alert('kindly check your email🤗')} type="submit" variant="outlined">submit</Button >
      </div>

    </form>
  );
}
