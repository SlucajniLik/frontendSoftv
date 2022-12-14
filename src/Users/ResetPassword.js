import React from 'react';
import  axios from 'axios'
import './Style.css'
import { useState,useContext, } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { DefContext } from "../Helpers/DefContext";
import { useParams,useNavigate } from 'react-router-dom';
import {Card,Container} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons";
function ResetPassword() {

const {token}=useParams()
  const { userState,setUserState} = useContext(DefContext);


const navigate=useNavigate()
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [passwordErr, setPasswordErr] = useState(true);
  const [password2Err, setPassword2Err] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const eye = <FontAwesomeIcon icon={faEye} />;
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };


  const [passwordShown2, setPasswordShown2] = useState(false);
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };
  function onChangePass(e)
  {
    setPassword(e.target.value)
    /*const Passreg = new RegExp('[A-Z][a-z]{2}'); 
    if(!Passreg.test(password))
    {
       setPasswordErr(false)

    }
    else
    {
 setPasswordErr(true)
    }*/
  }


  function onChangePass2(e)
  {
    setPassword2(e.target.value)

  /*  if(password!=password2)
    {
      setPassword2Err(false)

    
    }*/
  }



function validate()
{


var error = true


const Passreg = new RegExp('[a-zA-Z0-9+_.-]{8,}'); 


   if(!Passreg.test(password))
   {
      setPasswordErr(false)
      error=false
   }
   else
   {
setPasswordErr(true)
   }

if(password!=password2)
{
  setPassword2Err(false)
  error=false

}
else
{
  setPassword2Err(true)
}



  return error;

}




function onSubmit(e)
{

  e.preventDefault()
 /* const user={
      name:name,
      surname:name2,
      email:email,
      password:password,
      role:role,
      image:image
  }*/

const user={
  password:password
}








//console.log(validate(name,surname,email,password,password2,role))


if(validate()==true)
{

   console.log("Ovde token"+token)
  axios.post('https://serviceone1.herokuapp.com/users/resetPassword',user, {
    headers: {
      access: token,
    },
  }
  ).then(res=>console.log(res.data))



  setPassword("")
  setPassword2("")
 


  console.log("true")


  navigate("/")
}
else
{
  console.log("false")
}





  

 
  //setImage("")





}
  return (
    <Container 
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "90vh"}}
  >
    <div className="w-100" style={{ maxWidth: "400px" }}>


  <Card   >
      <Card.Body>
        <h1 className="text-center mb-4">Resetujte sifru</h1>

    <Form onSubmit={onSubmit}   encType="multipart/form-data">


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Lozinka</Form.Label>
        <div   className='pass-wrapper'>
        <Form.Control type={passwordShown ?"text":"password"} placeholder="Unesite lozinku" value={password} onChange={onChangePass}    />
        <i onClick={togglePassword}>{eye}</i>{" "}
              </div>
        {!passwordErr&& <p   style={{color:'red'}}   >Vase sifra nije validna</p>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label>Lozinka</Form.Label>
        <div   className='pass-wrapper'>
        <Form.Control type={passwordShown2 ?"text":"password"} placeholder="Potvrdite lozinku"     value={password2} onChange={onChangePass2}      />
        <i onClick={togglePassword2}>{eye}</i>{" "}
              </div>
        {!password2Err && <p   style={{color:'red'}}   >Uneli ste pogresnu sifru</p>}
      </Form.Group>
     
      <Button variant="dark"  className="w-100"  type="submit">
        Resetuj lozinku
      </Button>
    </Form>
    </Card.Body>
      </Card>
     


      </div>
    </Container>
  )
}





export default ResetPassword;