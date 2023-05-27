
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {LINKS} from "./global"



export function Reset() {
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  console.log(params.get("id"))
  console.log(params.get("token"))


  const {values,handleChange,handleSubmit}=useFormik({
    initialValues:{
     password:"",
     
    },
    onSubmit:async (values)=>{
      console.log(values)
     const data= await fetch(`${LINKS}/reset-password/${params.get("id")}/${params.get("token")}`,{
     method:"POST",
     headers: {"Content-type": "application/json",},
     body:JSON.stringify(values)
 })
const result=await data.json()
// alert(result.status)
console.log(result)
},
  })
  return (
    
 <form onSubmit={handleSubmit}>
  <div className='form'>
    <h1>Reset Here</h1>
  
  <TextField required fullWidth onChange={handleChange} value={values.password} name="password" label="password" variant="outlined"/>
  <Button fullWidth onClick={()=>(alert('🎉your password was reset successfully🎉'),navigate("/"))} type="Submit" variant="contained">submit</Button>
  </div>
 </form>
 
  );
}
