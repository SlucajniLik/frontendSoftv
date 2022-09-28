import React from 'react';
import  axios from 'axios'
import { Link } from 'react-router-dom'
import { useState,useContext,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import {Form,Card,Container} from 'react-bootstrap';
import { DefContext } from "../Helpers/DefContext";


function ProfileD() {
  const { userState,setUserState} = useContext(DefContext);
  const  [userProfile,setUserProfile]=useState({
  id:"",
  name:"",
  email:"",
 image: ""
    
})




    useEffect(() => {
        axios
          .get("https://servicethree3.herokuapp.com/users/profile/"+userState.id, {
            headers: {
              access: localStorage.getItem("access"),
            },
          }
          )
          .then((res) => {
            if (res.data.error) {
              setUserProfile({...userProfile});
            
            } else {
              setUserProfile({

                id:res.data._id,
                name:res.data.name+" "+res.data.surname,
             email:res.data.email,
            image:res.data.UrlImg
              });
    
            }
       
          });
      }, []);

















  return (
    <div>
      <Container 
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh"}}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>


    <Card   >
    <Card.Img
      variant="top"
      src={userProfile.image}
      height="200px"
      style={{ objectFit: "cover" }}
    />
        <Card.Body>
        <Card.Title   style={{display:'flex',flexDirection:'column'}}   >
       <span   className='fs-5 fw-bolder ' >Ime: <span className="fs-6 fst-italic ">{userProfile.name}</span></span>
       <span    className='fs-5 fw-bolder   '>Email: <span className="fs-6 fst-italic   ">{userProfile.email}</span></span>
      </Card.Title>
      <Button     className="w-100"    variant="success"    ><Link   style={{color:"white", textDecoration: "none" }} to={"/UpdateProfileD/"+userProfile.id}   >Izmeni</Link></Button> 
        </Card.Body>
      </Card>
     


      </div>
    </Container>




    </div>
  )
}

export default ProfileD
