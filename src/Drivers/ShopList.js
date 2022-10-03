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
  <Card style={{width:"40vh",height:"31.5vh"}} >
    <div   style={{  textAlign:"center", height:"20vh",width:"30vh" }}  >
    <Card.Img
      variant="top"
      src={props.shop.UrlImg}
  
      style={{  textAlign:"center", height:"20vh",width:"40vh" }}
    />
    </div>
    <Card.Body className="d-flex flex-column"  style={{height:"13.5vh",width:"40vh"}}>
      <Card.Title  className="d-flex justify-content-between align-items-baseline mb-4" >
     
        <span className="fs-5  "><b>Ime radnje:</b>{props.shop.name}</span>
        <span className="fs-5 "><b>Grad:</b>{props.shop.city} </span>
        <span className="fs-5 "><b>Adresa:</b>{props.shop.address}</span>
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


const [SelectedShop,SetSelectedShop]=useState({

  name:""
  
  })
  
  function onChangeSearch(e)
  {
  
       SetSelectedShop(
        {
          name:e.target.value      
        }
       )
  }







    useEffect(() => {


  const id= jwt_decode(localStorage.getItem("access")).id


        axios.get('https://servicethree3.herokuapp.com/shops/'+id, {
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


    function SearchShop(e)
    {  
    
      e.preventDefault()
      const id= jwt_decode(localStorage.getItem("access")).id
      console.log("Ovde je selected shop"+SelectedShop.name)
      var ShopSel=""
      if(SelectedShop.name.length==0)
      {
        ShopSel="NoShop"
      }
      else
      {
        ShopSel=SelectedShop.name
      }
      axios.get('https://servicethree3.herokuapp.com/shops/SearchShop/'+id+'/'+ShopSel, {
        headers: {
          access: localStorage.getItem("access"),
        },
      }).then(response=>{
    
        setShops({shops:response.data})
        console.log("ovfde SearchShop:"+response.data)
        }
        ).catch((error)=>{
            console.log(error)
           
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

<form >
      <input type="text"  style={
{
padding: "10px",
fontSize: "17px",
border: "1px solid grey",
float: "left",
width: "30vh",
background: "#f1f1f1"

}
      }     onChange={onChangeSearch}   value={SelectedShop.name}  placeholder="Pretrazi radnju po imenu ili lokaciji" name="search"/>
      <button type="submit"   onClick={SearchShop}   style={

{
  float:"left",
  width: "5vh",
  padding: "10px",
  background: "#2196F3",
  color: "white",
  fontSize: "17px",
  border: "1px solid grey",
  borderLeft: "none",
  cursor: "pointer",






}

      }    ><i class="fa fa-search"></i></button>
    </form>
<br/>







    <br/>
      <Container 
  
  
  style={{ display:"flex",justifyContent:"center",marginTop:"50px" ,minHeight: "89vh",minWidth:'180vh'}}
>

 
    
    <Row  md={3} xs={1} lg={3}   >
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










