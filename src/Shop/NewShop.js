import React from 'react';
import  axios from 'axios'

import { useState,useContext,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import {Form,Card,Container} from 'react-bootstrap';
import { DefContext } from "../Helpers/DefContext";
import { Link } from 'react-router-dom'
import {storage} from "../firebase"
import{ref,uploadBytes,getDownloadURL} from "firebase/storage"
import {v4} from "uuid"
function NewShop() {

  const { userState,setUserState} = useContext(DefContext);


  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [shopState, setShopState] = useState({
    name: "",
    nameSeller:"",
    city:"",
    address:"",
    image:"",
    exist:false
  });



  const [nameErr, setNameErr] = useState(true);
  const [cityErr, setCityErr] = useState(true);
  const [imageErr, setImageErr] = useState(true);
  const [addressErr, setAddressErr] = useState(true);

  const [Success,SetSuccess]=useState(false)








  useEffect(() => {
    axios
      .get("https://servicetwo2.herokuapp.com/shops/checkShop/"+userState.id, {
        headers: {
          access: localStorage.getItem("access"),
        },
      }
      )
      .then(
        res=>
        {

             console.log("oVDE DATA:"+res.data)

             
          if(res.data!=false)
          {
           setShopState({

            id:res.data._id, 
            name: res.data.name,
            nameSeller:res.data.nameSeller,
            city:res.data.city,
            address:res.data.address,
            image:res.data.UrlImg,
            exist:true

           }) 
          }
          else
          {
            setShopState({ ...shopState, exist: false });
          }
      
        }

      );
  }, []);














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



function validate()
  {
     var error=true
  
  
  
      
     if(!name)
     {
      setNameErr(false)
      error=false
     }
     else{
      setNameErr(true)
     }
  
     if(!city)
     { error=false
      setCityErr(false)
     }
     else{
      setCityErr(true)
     }
  
     if(!address)
     { error=false
      setAddressErr(false)
     }
     else{
      setAddressErr(true)
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
 /* const user={
      name:name,
      surname:name2,
      email:email,
      password:password,
      role:role,
      image:image
  }*/
  if(validate()){

const shop=new FormData()

shop.append("name",name)
shop.append("city",city)
shop.append("address",address)
shop.append("id",userState.id)
shop.append("image",image)
shop.append("nameSeller",userState.name)







//console.log(validate(name,surname,email,password,password2,role))


const imageRef=ref(storage,`images/${image.name}`+v4())
uploadBytes(imageRef,image).then(

()=>
{


  getDownloadURL(imageRef)
  .then((url) => {
     
     shop.append("UrlImg","https://"+url.split("//")[1])
      console.log("Pogledaj ovde url:"+url.split("//")[1])

      axios.post('https://servicetwo2.herokuapp.com/shops/addShop',shop,{
        headers: {
          access: localStorage.getItem("access"),
        },
      } ).then(res=>console.log(res.data))
    
      setName("")
      setCity("")
      setAddress("")
      setImage("")
     
    SetSuccess(true)
    console.log(window.location.hostname)



  })
}

)






















  

 
  //setImage("")


  }


}



if(shopState.exist==false)
{

  return (


    <Container 
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "90vh"}}
  >
    <div className="w-100" style={{ maxWidth: "400px" }}>


  <Card   >
      <Card.Body>
      <span   style={{fontSize:"4vh"}}  >Unesite podatke o prodavnici</span>



    <Form onSubmit={onSubmit}   encType="multipart/form-data">
<Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Ime: </Form.Label>
        <Form.Control type="text" placeholder="Unesite ime prodavnice"   value={name} onChange={onChangeName} />
        {!nameErr && <p   style={{color:'red'}}   >Unesite ime prodavnice</p>}
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>Grad</Form.Label>
        <Form.Control type="text" placeholder="Unesite ime grada"value={city} onChange={onChangeCity} />
        {!cityErr && <p   style={{color:'red'}}   >Unesite ime grada</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Adresa</Form.Label>
        <Form.Control type="text" placeholder="Unesite adresu"   value={address} onChange={onChangeAddress}  />
        {!addressErr && <p   style={{color:'red'}}   >Unesite adresu</p>}
      </Form.Group>

    
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Izaberite sliku</Form.Label>
        <Form.Control type="file" filename="image"   onChange={onChangeImage}/>
        {!imageErr && <p   style={{color:'red'}}   >Unesite sliku</p>}
        {Success && <p   style={{color:'green'}}   >Uspesno ste uneli podatke</p>}
      </Form.Group>
      <Button className="w-100" variant="success" type="submit">
       Unesite podatke
      </Button>
    </Form>


    </Card.Body>
      </Card>
     


      </div>
    </Container>


  )
}
else
{



 /* return(
<>
    <h1>{shopState.name}</h1>
    <h1>{shopState.nameSeller}</h1>
    <h1>{shopState.city}</h1>
    <h1>{shopState.address}</h1>
    <img src={`Images/${shopState.image}`} width="100" height="50" />
    </>
  )*/



  return(
    <>
  
    <Container 
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh"}}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
    

    <Card   >
    <Card.Img
      variant="top"
      src={shopState.image}
      height="200px"
      style={{ objectFit: "cover" }}
    />
        <Card.Body>
        <Card.Title   style={{display:'flex',flexDirection:'column'}}   >
       <span   className='fs-5 fw-bolder ' >Ime radnje: <span className="fs-6 fst-italic ">{shopState.name}</span></span>
       <span    className='fs-5 fw-bolder   '>Adresa:: <span className="fs-6 fst-italic   ">{shopState.city} {shopState.address}</span></span>
      </Card.Title>
        
  
      <Button   className="w-100" variant="success"><Link   style={{color:"white", textDecoration: "none" }} to={"/UpdateShop/"+shopState.id}   >Azuriraj</Link></Button> 
        </Card.Body>
        
      </Card>
     

     
      </div>
    </Container>
    </>
   )










}

 
}





export default NewShop;