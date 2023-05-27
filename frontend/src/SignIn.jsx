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
      <h2>Description of Gold Price Calculator</h2>

      <ul>Welcome to the Gold Price Calculator, a comprehensive tool designed to help you determine Gold prices using various weights (e.g., gram, kg, ounce, tola, tael, ratti, masha, bhori, baht, etc.), karats (e.g., 24K, 22K, 21K, 18K, 16K, 14K, 10K, etc.), and currencies from around the world. Our calculator relies on up-to-date spot Gold prices and displays all rates in India's local time for your convenience.</ul>
      
      <h2>What is the gold Price calculator?</h2>

      <ul>The gold calculator provided by goldpricez.com is an essential tool for gold businesses to estimate the value of real-time gold (per Gram, Oz, KG, Tola, Baht, Grain, Ratti, etc) in any karat and currencies of the world (e.g., US Dollar, UK Pound, Euro, Canada, Australian and NZ Dollar, Indian, Pakistani and Sri Lankan Rupee, UAE Dirham, Kuwaiti Dinar, KSA and Omani Riyal, etc.)</ul>
    
      <h2>How to calculate the gold price?</h2>

      <ul>If you know the purity (i.e., Karat level, e.g., 22k, 18k, 24k, etc.), weight unit(e.g., gram, ounce, tola, etc.), and your desired currency (e.g., UK GBP Pound, US Dollar, Euro, Indian Rupee, etc.). Then provide these detail in the dropdown list mentioned above, and you will see the latest real-time gold rate calculation in your provided currency (currency rates are also latest and updated with 60 minutes interval. The complete description of how to use this calculator has mentioned below.</ul>
      
      <h2>Detail of Gold Calculator</h2>

      <ul>1. Select a unit type of gold from the dropdown list shown in the image above. You can choose different units from the list which are famous around the globe. They are Gram, Ounce, Tola, Kilo, Tael, Masha, Bhori or Vori, Grain, etc. There two types of tola; they are slightly different in weight.</ul>
      
      <ul>2. Enter the number of units. You can enter a numerical value of your choice. For example, 1, 1.5., 2, 5, 10, 20, 50, 100 etc. This calculator is also supporting the floating-point values — for example, 1.5, 2.5, 3.15, 4.1234, etc.</ul>
      
      <ul>3. Select Karat or Purity from the list, e.g., 24k, 23k, 22k, 20k, 18k, 14k, etc.</ul>

      <ul>4. Choose your desired currency from the dropdown list, as shown (at no. 4) in the image. You can select any currency — for example, Euro, US, Australian, or New Zealand Dollar, Pakistani, Indian, or Nepali Rupee, KSA or Saudi Rial, etc. It contains almost all currencies in the world. Moreover, currency rates are regularly updating with a one-hour interval while gold prices are updating with a one-minute interval.</ul>
      
      <ul>5. Spread: it is a difference between the buying price and selling price. By clicking on this link, you will be forwarded to another page having a spread option. Businesspeople like goldsmiths for buying or selling gold using this option.</ul>
      
      <h2>What is the formula for the calculation of gold?</h2>

      <ul>Select a weight unit (e.g., gram). Then select karat (e.g., 22k), after that select your desired currency and click on the calculate button, you will see the estimation of the latest gold rates.</ul>
      
      <h2>What is the gold jewelry price calculator?</h2>

      <ul>Gold ornaments comprised of various purity level, 24K is the purest form of gold, while 22k gold consist of little impurity used to make the gold ideal for jewelry designs like the bangle, ring, etc. 22k jewelry is comprising of standard quality gold, but some contain low karat (purity level), e.g., 20k, 18k, 16k, etc. </ul>
      
      <h2>What is gold karat?</h2>

      <ul>Its means purity level of gold, the 24K gold is 99% pure, while 22k gold is jewelry ideal. Its formula for calculation of karat is = Karat/24. e.g., 22k gold can be calculated like = 22/24 = 0.916 = 91% pure gold, which is also called 916 gold. Therefore the 22k gold coins and products stamped with 916 seals.</ul>
      <h2>More Information need to Sign In</h2>
      <TextField required fullWidth name="email" placeholder="Email" value={values.email} onChange={handleChange} id="outlined-basic" label="Email" variant="outlined"/>
      <TextField required fullWidth name="password" placeholder="Password" value={values.password} onChange={handleChange} id="outlined-basic" label="Password" variant="outlined"/>  
      <Button fullWidth variant="outlined" type="submit" color={form}>{form === "success" ? "Sign In":"Retry"}</Button>
      <a href="/signup">Don't have an account?</a>
    </form>
  );
}
