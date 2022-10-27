import React, { useState,useContext } from 'react';
import { Button } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { DefContext } from "./Helpers/DefContext";
import  secureLocalStorage  from  "react-secure-storage";
function Navbarr() {

  const { cartNumber,setCartNumber} = useContext(DefContext);
  const { userState,setUserState} = useContext(DefContext);
  const logout = () => {
    localStorage.removeItem("access");
    setUserState({ email: "", id: 0, status: false });
    secureLocalStorage.removeItem("pass") 
       window.location.href="/"
  };




 return (
  
       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"  >
        
        <Container>   
  
    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
    <Navbar.Brand  href="#">My-Company</Navbar.Brand>
    <span class="navbar-brand mb-0 h1">My-company</span>
      <Navbar.Collapse  id="responsive-navbar-nav" >
      
          <Nav className="me-auto">
           { 
           !userState.status &&
           <>
           <Nav.Link href="/">Ulogujte se</Nav.Link>
            <Nav.Link href="/register">Registrujte se</Nav.Link>
            </>
               } 
        
            
         { 
           userState.role=="Admin" &&
           <>
              
            <Nav.Link href="/Approvals">Odobrenja</Nav.Link>
            <Nav.Link href="/NewProducts">Novi proizvod</Nav.Link>
            <Nav.Link href="/AllProducts"> Svi proizvodi</Nav.Link>
            <Nav.Link href="/UsersApp"> Svi korisnici</Nav.Link>
            <Nav.Link href="/"> Profil</Nav.Link>
           </>
           }
            
              
            { 
           userState.role=="Prodavac" &&
           <>
            <Nav.Link href="/NewShop">Moja radnja</Nav.Link>
            <Nav.Link href="/Drivers">Vozaci</Nav.Link>
            <Nav.Link href="/">Profil</Nav.Link>

           
       </>

}
{
 userState.role=="Vozac" &&
 <>
<Nav.Link href="/ShopList">Radnje</Nav.Link>
<Nav.Link href="/"> Profil</Nav.Link>
</>

}
{userState.status && <Nav.Link    ><Button className='loggedInContainer'    onClick={logout} name="logOut"  > Logout</Button></Nav.Link>}          
    
          </Nav>

          { userState.role=="Prodavac" && <Nav>
         <Nav.Link href="/Cart"    style={{background:"white",borderColor:"red",borderStyle:"solid",width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle" >
             <img height="30px"

            src="/Images/cart2.png"/>
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >{cartNumber}</div>
            </Nav.Link>
          </Nav>
          }
          </Navbar.Collapse>
          </Container>
      </Navbar>

  )
}

export default Navbarr
