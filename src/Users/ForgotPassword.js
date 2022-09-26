import React ,{useState,useContext}from 'react'
import axios from "axios"
import Button from 'react-bootstrap/Button';
import {Form,Container} from 'react-bootstrap';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { DefContext } from "../Helpers/DefContext";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {

  
  const [email, setEmail] = useState("");
  const { userState,setUserState} = useContext(DefContext);

  let navigate = useNavigate();
  const [emailErr, setEmailErr] = useState(true);
  function onChangeEmail(e)
  {
    setEmail(e.target.value)
    


  }


  function validate()
  {
  
  
  var error = true
  
  
  const Emailreg = new RegExp('[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+');    
  
  
  
    
     if(!Emailreg.test(email))
     {
         setEmailErr(false)
         error=false
     }
     else
     {
      setEmailErr(true)
     }
     
  

    return error;
  
  }








function onSubmit(e)
{

  console.log("Ovde email"+email)

  e.preventDefault()
  if(validate()==true)
  {

    const user={
      email:email
   
  }



  //console.log(user);
  axios.post('http://localhost:5000/users/forgotPassword',user).then(res=>{
    //console.log(jwt_decode(res.data).email)
    console.log(res.data )
    setEmail("")
  })


  }
  

}

/*if(Cookies.get("access")!=null )
{

console.log(jwt_decode(Cookies.get("access")).id)
console.log("ovde")
}*/


if(localStorage.getItem("accessToken")!=null)
{

  console.log(localStorage.getItem("accessToken"))
  console.log("ovdeLocal")

}




  return (
    <Container 
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "90vh"}}
  >
    <div className="w-100" style={{ maxWidth: "400px" }}>



    <Form onSubmit={onSubmit}  >
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email:</Form.Label>
      <Form.Control type="text" placeholder="Unesite email"    name={email}  onChange={onChangeEmail} />
      {!emailErr && <p   style={{color:'red'}}   >Vase email nije validan</p>}
    </Form.Group>

    <Button variant="success"  className="w-100"  type="submit">
      Klikni
    </Button>
   
   
  </Form>

  </div>
    </Container>
  )
}

export default ForgotPassword
