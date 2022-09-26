import React ,{useState,useContext}from 'react'
import axios from "axios"
import Button from 'react-bootstrap/Button';
import {Form,Card,Container} from 'react-bootstrap';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { DefContext } from "../Helpers/DefContext";
import { useNavigate,Link } from "react-router-dom";
function LogInUser() {

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userState,setUserState} = useContext(DefContext);
  
   const[valueErr,setValuerErr]=useState(null)
   const[valueErr2,setValuerErr2]=useState(null)




  let navigate = useNavigate();
  function onChangePass(e)
  {
    setPassword(e.target.value)


  }


  

  function onChangeEmail(e)
  {
    setEmail(e.target.value)


  }

   function  onSubmit(e)
{

  e.preventDefault()
  const user={
      email:email,
      password:password
  }
  //console.log(user);
 axios.post('https://serviceone1.herokuapp.com/users/login',user).then(  res=>{
    //console.log(jwt_decode(res.data).email)
    //console.log(res.data )


    console.log(user)
    if (res.data.error) {
     

      setValuerErr2(res.data.error)

    } else {

      console.log(res.data.token)
      setValuerErr2(null)

      if(res.data.token)
      {

        setValuerErr(null)
      localStorage.setItem("access", res.data.token);

 setUserState(
      {
       //email:jwt_decode(localStorage.getItem("access")).email,
        // id:jwt_decode(localStorage.getItem("access")).id,
        email:res.data.email,
        id:res.data.id,
         status:true,
         name:res.data.name,
        role:res.data.role
        }
      )


      setEmail("")
      setPassword("") 
  
      if(res.data.role=="Admin")
      {
      
      
        navigate("/Profile")
      }
      
      if(res.data.role=="Prodavac")
      {
      
      
        navigate("/ProfileS")
      }
      
      
      if(res.data.role=="Vozac")
      {
      
      
        navigate("/ProfileD")
      }









      }
      else
      {
            

        setValuerErr(res.data)


        setEmail("")
        setPassword("") 
        


      }


     




     // navigate("/register");
  }
  })

   
    
   
  
  /*if(userState.role=="Admin")
  {
  
  
    navigate("/Profile")
  }
  
  if(userState.role=="Prodavac")
  {
  
  
    navigate("/ProfileS")
  }
  
  
  if(userState.role=="Vozac")
  {
  
  
    navigate("/ProfileD")
  }

   
*/



  



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
function remove(e)
{
  e.preventDefault()

  localStorage.clear()
}  localStorage.removeItem('accessToken');




 /* return (
    <Form onSubmit={onSubmit}  >
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address{userState.email} :</Form.Label>
      <Form.Control type="email" placeholder="Enter email"    name={email}  onChange={onChangeEmail} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password"   name={password}  onChange={onChangePass} />
    </Form.Group>
    <a  href="/ForgotPassword" >Zaboravili ste lozinku ?</a><br/><br/>
    <Button variant="primary" type="submit">
      Submit
    </Button>
    <Button variant="primary" type="submit"  onClick={remove} >
Remove
    </Button>
   
  </Form>
  )*/

   return(
    <Container 
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh"}}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>


    <Card   >
        <Card.Body>
          <h1 className="text-center mb-4">Ulogujte se</h1>
       
          <Form onSubmit={onSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" value={email} placeholder='Unesite email'  onChange={onChangeEmail} name="email"  />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control type="password"  placeholder='Unesite lozinku'  value={password}  onChange={onChangePass} name="lozinka"  />
            </Form.Group>
            <br/>
            <Button  className="w-100"  variant="secondary"  type="submit" name="login"  >
              Ulogujte se
            </Button>
          </Form>
          <br/>
          {valueErr && <p   style={{color:'red'}}   >{valueErr}</p>}
          {valueErr2 && <p   style={{color:'red'}}   >Pogresan email ili lozinka</p>}
          <div className="w-100 text-center mt-3">
            <Link to="/ForgotPassword">Zaboravili ste lozinku?</Link>
          </div>
        </Card.Body>
      </Card>
     


      </div>
    </Container>
   )












}

export default LogInUser
