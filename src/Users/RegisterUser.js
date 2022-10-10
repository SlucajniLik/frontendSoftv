import React from 'react';
import  axios from 'axios'
import './Style.css'
import { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import {Form,Container,Card} from 'react-bootstrap';
import { DefContext } from "../Helpers/DefContext";
import { useNavigate,Link, Navigate } from "react-router-dom";
import {storage} from "../firebase"
import{ref,uploadBytes,getDownloadURL} from "firebase/storage"
import {v4} from "uuid"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons";
function RegisterUser() {



  const navigate=useNavigate()

  const { userState,setUserState} = useContext(DefContext);


  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("Izaberite opciju");
  const [image, setImage] = useState("");
  const [nameErr, setNameErr] = useState(true);
  const [surnameErr, setSurnameErr] = useState(true);
  const [emailErr, setEmailErr] = useState(true);
  const [passwordErr, setPasswordErr] = useState(true);
  const [password2Err, setPassword2Err] = useState(true);
  const [roleErr, setRoleErr] = useState(true);
  const [imageErr, setImageErr] = useState(true);
  const [Success,SetSuccess]=useState(false)
  
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };


  const [passwordShown2, setPasswordShown2] = useState(false);
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };
  const eye = <FontAwesomeIcon icon={faEye} />;
  function onChangeName(e)
  {
    setName(e.target.value)

    SetSuccess(false)
   /* const Namereg = new RegExp('[A-Z][a-z]{2}');   

    if(!Namereg.test(name))
    {
       setNameErr(false)

    }
    else{
     setNameErr(true)
     
    }*/


  }
  function onChangeSurname(e)
  {
    setSurname(e.target.value)
    SetSuccess(false)

   /* const Surnamereg = new RegExp('[A-Z][a-z]{2}'); 
    if(!Surnamereg.test(surname))
    {
       setSurnameErr(false)

    }
    {
     setSurnameErr(true)
    }*/
  }


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
    SetSuccess(false)
  }


  function onChangePass2(e)
  {
    setPassword2(e.target.value)

  /*  if(password!=password2)
    {
      setPassword2Err(false)

    
    }*/
    SetSuccess(false)
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
    SetSuccess(false)
  }

  function onChangeRole(e)
  {
    setRole(e.target.value)

 /*   if(role=="Izaberite opciju")
    {

    setRoleErr(false)
    
    }
    else
    {
      setRoleErr(true)
    }*/
    SetSuccess(false)
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
SetSuccess(false)

  }

function validate()
{


var error = true

const Namereg = new RegExp('[a-zA-z]{3,}');    
const Surnamereg = new RegExp('[a-zA-z]{3,}'); 
const Emailreg = new RegExp('[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+');    
const Passreg = new RegExp('[a-zA-Z0-9+_.-]{8,}'); 
const Imagereg=new RegExp('[A-Za-z0-9].(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)')



   if(!Namereg.test(name))
    {
       setNameErr(false)
      error=false
    }
    else{
     setNameErr(true)
     
    }

   
   if(!Surnamereg.test(surname))
   {
      setSurnameErr(false)
      error=false
   }
   else
   {
    setSurnameErr(true)
   }
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


if(role=="Izaberite opciju")
{
error=false
setRoleErr(false)

}
else
{
  setRoleErr(true)
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

  e.preventDefault();
 /* const user={
      name:name,
      surname:name2,
      email:email,
      password:password,
      role:role,
      image:image
  }*/

const user=new FormData()

user.append("name",name)
user.append("surname",surname)
user.append("email",email)
user.append("password",password)
user.append("role",role)
user.append("image",image)

console.log(image)




console.log(image.name)

//console.log(validate(name,surname,email,password,password2,role))




if(validate()==true)
{


        const imageRef=ref(storage,`images/${image.name}`+v4())
        uploadBytes(imageRef,image).then(
        
        ()=>
        {
        
        
          getDownloadURL(imageRef)
          .then((url) => {
             
             user.append("UrlImg","https://"+url.split("//")[1])
              console.log("Pogledaj ovde url:"+url.split("//")[1])
            const useremail={
              email:email
             }
          
          
          axios.post('https://serviceone1.herokuapp.com/users/checkEmailExist',useremail).then(res=>
            {
                  setExistsErr(res.data.access)   
                  console.log(res.data)
                  if(res.data.access!=false)
                  {
          
                      
          
          
           
                    axios.post('https://serviceone1.herokuapp.com/users/register',user).then(res=>
                    {
                          setExistsErr(res.data)     
                    } 
                    ).catch(err=>console.log("ovde gresakaaa"+res.data+""+err))
                  
                    setName("")
                    setSurname("")
                    setPassword("")
                    setPassword2("")
                    setEmail("")
                    setImage("")
                    setRole("Izaberite opciju")
                  
                    console.log("true")
              navigate("/reg")
                  }} )






          })
        }
        
        )

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
  <div className="w-100" style={{ maxWidth: "400px",marginTop:"12px",marginBottom:"14px" }}>


      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Registrujte se</h2>
      
          <Form onSubmit={onSubmit}   encType="multipart/form-data">
<Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Ime:</Form.Label>
        <Form.Control type="text" placeholder="Unesite vase ime"   value={name} onChange={onChangeName} />
        {!nameErr && <p   style={{color:'red'}}   >Ime mora da pocinje velikim slovom</p>}
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>Prezime</Form.Label>
        <Form.Control type="text" placeholder="Unesite vase prezime"value={surname} onChange={onChangeSurname} />
        {!surnameErr && <p   style={{color:'red'}}   >Prezime mora da pocinje velikim slovom</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Unesite vas email"   value={email} onChange={onChangeEmail}  />
        {!emailErr && <p   style={{color:'red'}}   >Vase email nije validan</p>}
        {!existsErr && <p   style={{color:'red'}}   >Email vec postoji!</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Lozinka</Form.Label>
        <div   className='pass-wrapper'>
        <Form.Control type={passwordShown ? "text" : "password"}  placeholder="Unesite vasu lozinku" value={password} onChange={onChangePass}    />
        <i onClick={togglePassword}>{eye}</i>{" "}
              </div>
        {!passwordErr&& <p   style={{color:'red'}}   >Vase lozinka mora sadrzati makar 8 karaktera</p>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label>Potvrda lozinke</Form.Label>
        <div   className='pass-wrapper'>
        <Form.Control type={passwordShown2 ? "text" : "password"} placeholder="Potvrdite vasu lozinku"     value={password2} onChange={onChangePass2}      />
        <i onClick={togglePassword2}>{eye}</i>{" "}
              </div>
        {!password2Err && <p   style={{color:'red'}}   >Uneli ste pogresnu lozinku</p>}
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Slika</Form.Label>
        <Form.Control type="file"   filename="image"   onChange={onChangeImage}/>
        {!imageErr && <p   style={{color:'red'}}   >Izaberite sliku</p>}
      </Form.Group>
      <Form.Select aria-label="Default select example"   value={role} onChange={onChangeRole}        >
      <option value="Izaberite opciju">Izaberite opciju</option>
      <option value="Admin">Admin</option>
      <option value="Prodavac">Prodavac</option>
      <option value="Vozac">Vozac</option>
    </Form.Select>
    {!roleErr && <p   style={{color:'red'}}   >Izaberite korisnika</p>}
    {Success && <p   style={{color:'green'}}   >Uspesno ste poslali email</p>}
    <br/>
      <Button  variant="dark"  className="w-100"   type="submit">
        Registrujte se
      </Button>
    </Form>
        </Card.Body>
      </Card>
      </div>
    </Container>

)

}





export default RegisterUser;