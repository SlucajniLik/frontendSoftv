import React, { useRef } from 'react';
import  axios from 'axios'

import { useState,useContext,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import {Form,Card,Container} from 'react-bootstrap';
import { DefContext } from "../Helpers/DefContext";
import { Link, useParams,useNavigate } from 'react-router-dom'
import {storage} from "../firebase"
import{ref,uploadBytes,getDownloadURL} from "firebase/storage"
import {v4} from "uuid"
function UpdateShop() {

  const { userState,setUserState} = useContext(DefContext);
  const params=useParams()

  const [name, setName] = useState(params.name);
  const [city, setCity] = useState(params.city);
  const [image, setImage] = useState("");
  const [address, setAddress] = useState(params.address);
 const refImage=useRef(null)



  const [nameErr, setNameErr] = useState(true);
  const [cityErr, setCityErr] = useState(true);
  const [imageErr, setImageErr] = useState(true);
  const [addressErr, setAddressErr] = useState(true);
  const [Success,SetSuccess]=useState(false)


  function validate()
  {
     var error=true
  
  
     const Imagereg=new RegExp('[A-Za-z0-9].(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)')
      
     if(!name || /[a-z]/.test( name[0]))
     {
      setNameErr(false)
      error=false
     }
     else{
      setNameErr(true)
     }
  
     if(!city || /[a-z]/.test( city[0]))
     { error=false
      setCityErr(false)
     }
     else{
      setCityErr(true)
     }
  
     if(!address || /[a-z]/.test( address[0]))
     { error=false
      setAddressErr(false)
     }
     else{
      setAddressErr(true)
     }




       
if(image)
{
if(!Imagereg.test(image.name) )
{
  setImageErr(false)
  error=false
}
else
{

  setImageErr(true)
}
}
else
{
  setImageErr(true)
}
  
  return error
  
  
  
  }
  
  
  














   

  function onChangeName(e)
  {
    setName(e.target.value)
  }
  function onChangeCity(e)
  {
    setCity(e.target.value)


   
  }


  function onChangeAddress(e)
  {
    setAddress(e.target.value)
   
  }

  function onChangeImage(e)
  {
    setImage(e.target.files[0])




  }

console.log("ovajisdfj"+userState.name)


 const navigate=useNavigate()
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
if(validate()){



  if(image)
  {
  const shop=new FormData()

  shop.append("name",name)
  shop.append("city",city)
  shop.append("address",address)
  shop.append("id",userState.id)
  shop.append("image",image)
  shop.append("nameSeller",userState.name)
  
  
  
  
  
  console.log("Its validate")
  

  
  const imageRef=ref(storage,`images/${image.name}`+v4())
  uploadBytes(imageRef,image).then(
  
  ()=>
  {
  
  
    getDownloadURL(imageRef)
    .then((url) => {
       
       shop.append("UrlImg","https://"+url.split("//")[1])
        console.log("Pogledaj ovde url:"+url.split("//")[1])
    

  
        axios.post('https://servicetwo2.herokuapp.com/shops/UpdateShop/'+params.id,shop,{
          headers: {
            access: localStorage.getItem("access"),
          },
        } ).then(res=>
      {
                  if(res.data==true)
                  {
      
                     
                     //navigate("/NewShop")
                  }
      
             
      }
          
          
          )
      
        setName("")
        setCity("")
        setAddress("")
        setImage("")
       refImage.current.value=null




    })
  }
  
  )


SetSuccess(true)
   
    //setImage("")
}
else
{
  const shop=new FormData()

  shop.append("name",name)
  shop.append("city",city)
  shop.append("address",address)
  shop.append("id",userState.id)
 
  shop.append("nameSeller",userState.name)
  axios.post('https://servicetwo2.herokuapp.com/shops/UpdateShop/'+params.id,shop,{
    headers: {
      access: localStorage.getItem("access"),
    },
  } ).then(res=>
{
            if(res.data==true)
            {

               
               //navigate("/NewShop")
            }

       
}
    
    
    )

  setName("")
  setCity("")
  setAddress("")
  setImage("")
 refImage.current.value=null

 SetSuccess(true)
}
  


}
else
{


console.log("Not validate")

}


}



  return (


    <Container 
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "90vh"}}
  >
    <div className="w-100" style={{ maxWidth: "400px" }}>


  <Card   >
      <Card.Body>
        <h2 className="text-center mb-4"  >Unesite podatke o prodavnici</h2>



    <Form onSubmit={onSubmit}   encType="multipart/form-data">
<Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Ime radnje  </Form.Label>
        <Form.Control type="text" placeholder="Unesite ime radnje"   value={name} onChange={onChangeName} />
        {!nameErr && <p   style={{color:'red'}}   >Ime radnje mora da pocinje velikim slovom</p>}
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>Grad</Form.Label>
        <Form.Control type="text" placeholder="Unesite ime grad" value={city} onChange={onChangeCity} />
        {!cityErr && <p   style={{color:'red'}}   >Ime grada mora da pocinje velikim slovom</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Adresa</Form.Label>
        <Form.Control type="text" placeholder="Unesite adresu"   value={address} onChange={onChangeAddress}  />
        {!addressErr && <p   style={{color:'red'}}   >Adresa mora da pocinje velikim slovom</p>}
      </Form.Group>

    
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Slika</Form.Label>
        <Form.Control  ref={refImage} type="file" filename="image"   onChange={onChangeImage}/>
      <p   style={{color:'blue'}}   >Slika nije obavezna</p>
        {!imageErr && <p   style={{color:'red'}}   >Unesite sliku</p>}
        {Success && <p   style={{color:'green'}}   >Uspesno ste izmenili podatke</p>}
      </Form.Group>
      <Button className="w-100" variant="success" type="submit" >
    Azuriraj
      </Button>
    </Form>


    </Card.Body>
      </Card>
     


      </div>
    </Container>


  )

}





export default UpdateShop;