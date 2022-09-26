import React from 'react';
import  axios from 'axios'

import { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import {Form,Container,Card} from 'react-bootstrap';
import { DefContext } from "../Helpers/DefContext";
import {  useParams,useNavigate } from "react-router-dom";
function UpdateProfile() {
       const navigate=useNavigate()
    const params = useParams();
  const { userState,setUserState} = useContext(DefContext);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState("");
  const [emailErr, setEmailErr] = useState(true);
  const [passwordErr, setPasswordErr] = useState(true);
  const [password2Err, setPassword2Err] = useState(true);
  const [imageErr, setImageErr] = useState(true);

  

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

  function onChangeEmail(e)
  {
    setEmail(e.target.value)
  /*  const Emailreg = new RegExp('[A-Z][a-z]{2}');    
    if(!Emailreg.test(email))
    {
        setEmailErr(false)

    }
    else
    {
     setEmailErr(true)
    }*/
  }

  
  function onChangeImage(e)
  {
    setImage(e.target.files[0])


  /*  if(!image)
{
  setImageErr(false)

}
else
{

  setImageErr(true)
}*/


  }

function validate()
{


var error = true

const Namereg = new RegExp('[A-Z][a-z]{2}');    
const Surnamereg = new RegExp('[A-Z][a-z]{2}'); 
const Emailreg = new RegExp('[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+');    
const Passreg = new RegExp('[a-zA-Z0-9+_.-]{8,}'); 
const Imagereg=new RegExp('[A-Za-z].(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)')



 

   
   
   if(!Emailreg.test(email))
   {
       setEmailErr(false)
       error=false
   }
   else
   {
    setEmailErr(true)
   }
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



if(!image|| !Imagereg.test(image.name) )
{
  setImageErr(false)
  error=false
}
else
{

  setImageErr(true)
}





  return error;

}


const[existsErr,setExistsErr]=useState(true)

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

const user=new FormData()


user.append("email",email)
user.append("password",password)
user.append("image",image)

//console.log(validate(name,surname,email,password,password2,role))



console.log("Moj id:"+params.id)
if(validate()==true)
{


  const useremail={
    email:email
   }
  axios.post('https://serviceone1.herokuapp.com/users/checkEmailExist',useremail).then(res=>
  {
        setExistsErr(res.data)   
        console.log(res.data)
        if(res.data!=false)
        {

          axios.post('https://serviceone1.herokuapp.com/users/updateProfile/'+params.id,user,{
            headers: {
              access: localStorage.getItem("access"),
            },
          }
          ).then(res=>console.log(res.data))
        
        
        
          setPassword("")
          setPassword2("")
          setEmail("")
        
        
        
          console.log("true")
        
        
          navigate("/Profile ")

        }
      })



}
else
{

  setExistsErr(true)
  console.log("false")
}





  

 
  //setImage("")





}
  /*return (
    <Form onSubmit={onSubmit}   encType="multipart/form-data">
<Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Ime:{userState.email}  </Form.Label>
        <Form.Control type="text" placeholder="Enter ime"   value={name} onChange={onChangeName} />
        {!nameErr && <p   style={{color:'red'}}   >Vase ime nije validno</p>}
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>Prezime</Form.Label>
        <Form.Control type="text" placeholder="Enter prezime"value={surname} onChange={onChangeSurname} />
        {!surnameErr && <p   style={{color:'red'}}   >Vase prezime nije validno</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="Enter email"   value={email} onChange={onChangeEmail}  />
        {!emailErr && <p   style={{color:'red'}}   >Vase email nije validan</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePass}    />
        {!passwordErr&& <p   style={{color:'red'}}   >Vase sifra nije validna</p>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type="password" placeholder="Password"     value={password2} onChange={onChangePass2}      />
        {!password2Err && <p   style={{color:'red'}}   >Uneli ste pogresnu sifru</p>}
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" filename="image"   onChange={onChangeImage}/>
        {!imageErr && <p   style={{color:'red'}}   >Izaberite sliku</p>}
      </Form.Group>
      <Form.Select aria-label="Default select example"   value={role} onChange={onChangeRole}        >
      <option value="Izaberite opciju">Izaberite opciju</option>
      <option value="Admin">Admin</option>
      <option value="Prodavac">Prodavac</option>
      <option value="Vozac">Vozac</option>
    </Form.Select>
    {!roleErr && <p   style={{color:'red'}}   >Izaberite korisnika</p>}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )*/


return(
  <Container 
  className="d-flex align-items-center justify-content-center"
  style={{ minHeight: "90vh"}}
>
  <div className="w-100" style={{ maxWidth: "400px" }}>


      <Card>
        <Card.Body>
        <span className="ms-2 text-muted"  style={{fontSize:"4vh"}}  >Izmenite profil</span>
      <br/>
          <Form onSubmit={onSubmit}   encType="multipart/form-data">

       
   

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Unesite email"   value={email} onChange={onChangeEmail} name="emailU" />
        {!emailErr && <p   style={{color:'red'}}   >Vase email nije validan</p>}
        {!existsErr && <p   style={{color:'red'}}   >Email vec postoji!</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Lozinka</Form.Label>
        <Form.Control type="password" placeholder="Unesite lozinku" value={password} onChange={onChangePass} name="lozinkaU"   />
        {!passwordErr&& <p   style={{color:'red'}}   >Vase sifra nije validna</p>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label>Potvrda lozinke</Form.Label>
        <Form.Control type="password" placeholder="Potvrdite lozinku"     value={password2} onChange={onChangePass2}  name="lozinkaPU"    />
        {!password2Err && <p   style={{color:'red'}}   >Uneli ste pogresnu sifru</p>}
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Slika</Form.Label>
        <Form.Control type="file" filename="image"   onChange={onChangeImage}  name="slikaU"   />
        {!imageErr && <p   style={{color:'red'}}   >Izaberite sliku</p>}
      </Form.Group>
    
  
      <Button className="w-100"  variant="success" type="submit"  name="izmeniPod">
        Izmenite
      </Button>
    </Form>
        </Card.Body>
      </Card>
      </div>
    </Container>

)

}





export default UpdateProfile;