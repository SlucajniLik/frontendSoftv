import React ,{useState,useContext,useRef}from 'react'
import axios from "axios"
import Button from 'react-bootstrap/Button';
import {Form,Card,Container} from 'react-bootstrap';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { DefContext } from "../Helpers/DefContext";
import { useNavigate } from "react-router-dom";
import {  useParams } from "react-router-dom";
import {storage} from "../firebase"
import{ref,uploadBytes,getDownloadURL} from "firebase/storage"
import {v4} from "uuid"
function UpdateProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
const refImage=useRef(null)


  const [nameErr, setNameErr] = useState(true);
  const [priceErr, setPriceErr] = useState(true);
  const [imageErr, setImageErr] = useState(true);
  const [Success,SetSuccess]=useState(false)



  const params = useParams();
  const navigate = useNavigate();
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
  
     const Imagereg=new RegExp('[A-Za-z0-9].(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)')
  
      
     if(!name  || !isNaN(name) || /[A-Z]/.test( name[0]))
     {
      setNameErr(false)
      error=false
     }
     else{
      setNameErr(true)
     }
  
     if(!price || isNaN(price) )
     { error=false
      setPriceErr(false)
     }
     else{
      setPriceErr(true)
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








  function onSubmit(e)
  {
  
    e.preventDefault()
   
  
  const product=new FormData()
  
  product.append("name",name)
  product.append("price",price)
  if(image.name)
  {
  product.append("image",image)
  }


  if(validate())
  {

    if(image)
    {

    const imageRef=ref(storage,`images/${image.name}`+v4())
    uploadBytes(imageRef,image).then(
    
    ()=>
    {
    
    
      getDownloadURL(imageRef)
      .then((url) => {
         
         product.append("UrlImg","https://"+url.split("//")[1])

         
         axios.post('https://serviceone1.herokuapp.com/products/updateproduct/'+params.id,product,{
          headers: {
            access: localStorage.getItem("access"),
          },
        }).then(res=>console.log(res.data))  


    
      })
    }
    
    )




   // navigate("/AllProducts")
   setPrice("")
   setImage("")
    refImage.current.value=null
   setName("")
   SetSuccess(true)
  }
  else
  {
    axios.post('https://serviceone1.herokuapp.com/products/updateproduct/'+params.id,product,{
      headers: {
        access: localStorage.getItem("access"),
      },
    }).then(res=>console.log(res.data))  




    // navigate("/AllProducts")
   setPrice("")
   setImage("")
    refImage.current.value=null
   setName("")
   SetSuccess(true)
  }
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
      <h2 className="text-center mb-4">Izmenite proizvod</h2>
     

    <Form onSubmit={onSubmit}   encType="multipart/form-data">
<Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Ime proizvoda:  </Form.Label>
        <Form.Control type="text" placeholder="Unesite ime proizvoda"   value={name} onChange={onChangeName} />
        {!nameErr && <p   style={{color:'red'}}   > Ime proizvoda mora da pocinje velikim slovom</p>}
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>Cena proizvoda</Form.Label>
        <Form.Control type="text" placeholder="Unesite cenu proizvoda"value={price} onChange={onChangePrice} />
        {!priceErr && <p   style={{color:'red'}}   >Unesite cenu proizvoda</p>}
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Unesite sliku</Form.Label>
        <Form.Control  ref={refImage} type="file" filename="image"   onChange={onChangeImage}/>
        {!imageErr && <p   style={{color:'red'}}   >Unesite sliku proizvoda</p>}
        {Success && <p   style={{color:'green'}}   >Uspesno ste izmenili podatke</p>}
      </Form.Group>
    
     




      <Button  className="w-100"  variant="success"  type="submit">
        Azuriraj
      </Button>
    </Form>

    </Card.Body>
      </Card>
     


      </div>
    </Container>
  )
}

export default UpdateProduct
