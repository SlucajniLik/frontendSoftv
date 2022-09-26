import React ,{useState,useContext}from 'react'
import axios from "axios"
import Button from 'react-bootstrap/Button';
import {Form,Card,Container} from 'react-bootstrap';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { DefContext } from "../Helpers/DefContext";
import { useNavigate } from "react-router-dom";

function NewProducts() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");


  const [nameErr, setNameErr] = useState(true);
  const [priceErr, setPriceErr] = useState(true);
  const [imageErr, setImageErr] = useState(true);



  function onChangeName(e)
  {
    setName(e.target.value)
  }

  function onChangePrice(e)
  {
    setPrice(e.target.value)

  }
  function onChangeImage(e)
  {
    setImage(e.target.files[0])
  }


function validate()
{
   var error=true



    
   if(!name || !isNaN(name))
   {
    setNameErr(false)
    error=false
   }
   else{
    setNameErr(true)
   }

   if(isNaN(price) || !price)
   { error=false
    setPriceErr(false)
   }
   else{
    setPriceErr(true)
   }


   if(!image)
   { error=false
    setImageErr(false)
   }
   else{
    setImageErr(true)
   }

return error



}









  function onSubmit(e)
  {
  
    e.preventDefault()
   
  
  const product=new FormData()
  
  product.append("name",name)
  product.append("price",price)
  product.append("image",image)

   
    if(validate())
    {

      axios.post('http://localhost:5000/products/addproduct',product,{
        headers: {
          access: localStorage.getItem("access"),
        },
      }).then(res=>console.log(res.data))  



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
      <span className="ms-2 text-muted"  style={{fontSize:"4vh"}}  >Unesite podatke</span>
    <Form onSubmit={onSubmit}   encType="multipart/form-data">
<Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Ime proizvoda:  </Form.Label>
        <Form.Control type="text" placeholder="Unesite ime proizvoda"   value={name} onChange={onChangeName} />
        {!nameErr && <p   style={{color:'red'}}   >Unesite ime proizvoda</p>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>Cena proizvoda</Form.Label>
        <Form.Control type="text" placeholder="Unesite cenu proizvoda"value={price} onChange={onChangePrice} />
        {!priceErr && <p   style={{color:'red'}}   >Unesite cenu proizvoda</p>}
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Unesite sliku</Form.Label>
        <Form.Control type="file" filename="image"   onChange={onChangeImage}/>
        {!imageErr && <p   style={{color:'red'}}   >Unesite sliku proizvoda</p>}
      </Form.Group>

     




      <Button className="w-100"  variant="success"  type="submit">
       Klikni
      </Button>
    </Form>

    </Card.Body>
      </Card>
     


      </div>
    </Container>
  )
}

export default NewProducts
