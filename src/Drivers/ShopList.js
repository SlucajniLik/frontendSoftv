import React,{useState,useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import {Form,Container,Row,Col,Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { DefContext } from "../Helpers/DefContext";
import jwt_decode from "jwt-decode";




function Shops(props)
{



console.log(props.shop.SellerId)




    
/*return(

<tr>
 <td>
 <img src={`Images/${props.shop.image}`} width="100" height="50" />
 </td>
 <td>{props.shop.nameSeller}</td>
 <td>{props.shop.name} </td>
 <td>{props.shop.city}</td>
 <td>{props.shop.address}</td>
 <td>
     <Button variant="warning"><Link to={"/OrderdProduct/"+props.shop.SellerId}  >Izaberi</Link></Button> 

     </td>
 
</tr>

)*/

return (
  <>
  <Card style={{width:"30vh",height:"33.5vh"}}>
    <div   style={{  textAlign:"center", height:"20vh",width:"30vh" }}  >
    <Card.Img
      variant="top"
      src={`Images/${props.shop.image}`}
  
      style={{  textAlign:"center", height:"20vh",width:"30vh" }}
    />
    </div>
    <Card.Body className="d-flex flex-column">
      <Card.Title  style={{display:'flex',flexDirection:'column'}} >
     
        <span className="fs-5  "><b>Ime radnje:</b>{props.shop.name}</span>
        <span className="fs-5 "><b>Lokacija:</b>{props.shop.address},{props.shop.city} </span>
       
      </Card.Title>
      <div className="mt-auto">
      
         
      
          <div
            className="d-flex align-items-center flex-column"
            style={{ gap: ".5rem" }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: ".5rem" }}
            >
              <Button   className="w-100"    variant="success"><Link   style={{color:"white", textDecoration: "none" }}  to={"/OrderdProduct/"+props.shop.SellerId} >Porudzbine</Link></Button> 
            </div>
         
          </div>
        
      </div>
    </Card.Body>
  </Card>
  <br/>
  </>
)



















}







function ShopList() {


const [shopA,setShops] = useState({
     shops:[]
});
const { userState,setUserState} = useContext(DefContext);






    useEffect(() => {


  const id= jwt_decode(localStorage.getItem("access")).id


        axios.get('http://'+window.location.hostname+':'+5002+'/shops/'+id, {
            headers: {
              access: localStorage.getItem("access"),
            },
          }).then(response=>{

            setShops({shops:response.data})
            console.log("ovfde:"+response.data)
            }
            ).catch((error)=>{
                console.log(error)
               
            })
            





    }, []);


   function ShopListt()
    {
      
       return shopA.shops.map(currentShop=>{
        return <Col   key={currentShop._id+"b"} ><Shops  shop={currentShop}    key={currentShop._id}   ></Shops></Col>
       })


    }




 /* return (

   
    <div>
      <>
<Container  className="mt-4"  >
<Row>
  <Col  xs={7} >
  <Card className='shadow-lg' >
    <Card.Header className='p-4' >
      <h4>ListaUser</h4>
    </Card.Header>
<Card.Body>
<Table striped bordered hover variant="dark">
      <thead>
        
        <tr>
      <th>Slika</th>
      <th>Ime prodavca</th>      
    <th>Ime prodavnice</th>
    <th>Grad</th>
    <th>Adresa</th>
    <th>Proizvodi</th>


  </tr>
      </thead>
      <tbody>
       

      {ShopListt()}


      </tbody>
    </Table>
</Card.Body>

  </Card>
  </Col>
</Row>


</Container>
</>
    </div>
  )*/

if(shopA.shops.length>0)
{
  return (
    <>
    <br/>
      <Container 
  
  
  style={{ minHeight: "90vh",minWidth:'150vh'}}
>

 
    
    <Row  md={3} xs={1} lg={5}   className="g-7" >
    {ShopListt()}
    </Row>
    
    
    

    </Container>
    </>
    )
}
else
{


  return(
    <Container 
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "90vh"}}
  >
    <div className="w-100" style={{ maxWidth: "400px" }}>

      <h1 className='fs-1'  >Nema dostupnih porudzbina</h1>
      </div>
    </Container>
  )


}
 




}

export default ShopList










