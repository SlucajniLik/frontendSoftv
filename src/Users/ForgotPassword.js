import React ,{useState,useContext}from 'react'
import axios from "axios"
import Button from 'react-bootstrap/Button';
import {Form,Container} from 'react-bootstrap';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { DefContext } from "../Helpers/DefContext";
//import { useNavigate } from "react-router-dom";
function ForgotPassword() {

  
  const [email, setEmail] = useState("");
  const { userState,setUserState} = useContext(DefContext);

  //let navigate = useNavigate();
  const [emailErr, setEmailErr] = useState(true);
  const [Success,SetSuccess]=useState(false)
  function onChangeEmail(e)
  {
    setEmail(e.target.value)
    SetSuccess(false)


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
  axios.post('https://serviceone1.herokuapp.com/users/forgotPassword',user).then(res=>{
    //console.log(jwt_decode(res.data).email)
    console.log(res.data )
    if(res.data.succes==true)
    {
      SetSuccess(true)
      setEmail("")
    }

  })
// za jest test samo
  //SetSuccess(true)  
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
    <Form.Group     className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email:</Form.Label>
      <Form.Control  data-testid="inputEmail" type="text" placeholder="Unesite email"    value={email}  onChange={onChangeEmail} />
      {!emailErr && <p     data-testid="errorEmail"  style={{color:'red'}}   >Vas email nije validan</p>}
      {Success && <p   data-testid="successEmail" style={{color:'green'}}   >Uspesno ste poslali email</p>}
    </Form.Group>

    <Button variant="success"   data-testid="button" className="w-100"  type="submit">
      Posalji email
    </Button>
   
   
  </Form>

  </div>
    </Container>
  )
}

export default ForgotPassword
