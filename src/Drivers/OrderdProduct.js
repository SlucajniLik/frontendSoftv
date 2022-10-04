import React,{useEffect,useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import {Form,Container,Row,Col,Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { DefContext } from "../Helpers/DefContext";
import {  useParams } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import styles from './mystyle.module.css'
function Order(props)
{

const  [numProd,SetNumProd]=useState("")


function onChangeNum(e)
{
   
  SetNumProd(e.target.value)

}




const { userState,setUserState} = useContext(DefContext);

   const params = useParams();
   


/*return(

<tr>
 <td>
 <img src={`/Images/${props.order.ProductId.image}`} width="100" height="50" />
 </td>
 <td>{props.order.ProductId.name} </td>
 <td>{props.order.ProductId.price*props.order.NumProd} </td>
 <td>{props.order.NumProd}</td>

 
     <td>
     <Button variant="warning"><a href='#' onClick={()=>props.DeliverProduct(props.order._id)}>Isporuci</a></Button> 
     </td>
</tr>

)*/


return (



<tr>
 <td>
 <img src={props.order.ProductId.UrlImg} width="100" height="50"/>
 </td>
 <td>{props.order.DateM}</td>
 <td>{props.order.ProductId.name} </td>
 <td>{ props.order.NumProd}</td>
 <td>{props.order.ProductId.price*props.order.NumProd} Din</td>
 <td><Button   className="w-100"     variant="success"   onClick={()=>props.DeliverProduct(props.order._id)}>Isporuci</Button></td>
</tr>

  /*<Card className="h-100">
    <Card.Img
      variant="top"
      src={`/Images/${props.order.ProductId.image}`}
      height="200px"
      style={{ objectFit: "cover" }}
    />
    <Card.Body className="d-flex flex-column">
      <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
        <span className="fs-2">{props.order.ProductId.name}</span>
        <span className="fs-2">{props.order.NumProd}</span>
        <span className="fs-2">{props.order.createdAt.split("T")[0]}</span>
        <span className="ms-2 text-muted">{props.order.ProductId.price*props.order.NumProd} </span>
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
              <Button   className="w-100"     variant="success"   onClick={()=>props.DeliverProduct(props.order._id)}>Isporuci</Button> 
            </div>
         
          </div>
        
      </div>
    </Card.Body>
  </Card>*/
)














}

function OrderdProduct() {

    const [orderA,setOrder] = useState({
        orders:[]
   });
   const [SelectedProduct,SetSelectedProduct]=useState({

    name:""
    
    })
    
    function onChangeSearch(e)
    {
    
         SetSelectedProduct(
          {
            name:e.target.value      
          }
         )
    }
   

   const params = useParams();

    useEffect(() => {
   const DriverId=jwtDecode(localStorage.getItem("access")).id
 
        axios.get('https://servicethree3.herokuapp.com/shops/OrderdProduct/'+params.id+'/'+DriverId, {
            headers: {
              access: localStorage.getItem("access"),
            },
          }).then(response=>{

            setOrder({orders:response.data})
           // console.log(response.data)
            }
            ).catch((error)=>{
                console.log(error)
               
            })
            





    }, []);





    function DeliverProduct(orderID){

      let order=
      {
       odrerId:orderID


      }
      console.log(order)
     axios.post('https://servicethree3.herokuapp.com/shops/DeliverProduct',order,{
          headers: {
            access: localStorage.getItem("access"),
          },
        }).then(
           res=>console.log(res.data));
          
   
           setOrder({
            orders:orderA.orders.filter(el=>el._id!=orderID)
   } 
   )
  }










    function OrderList()
    {
      
       return orderA.orders.map(currentOrder=>{
        return  <Order order={currentOrder}    DeliverProduct={DeliverProduct} key={currentOrder._id}   ></Order>
       })


    }






    function SearchProduct(e)
    {  
    
      e.preventDefault()

      const DriverId=jwtDecode(localStorage.getItem("access")).id
      console.log("Ovde je selected product"+SelectedProduct.name)
      var ProductSel=""
      if(SelectedProduct.name.length==0)
      {
        ProductSel="NoProduct"
      }
      else
      {
        ProductSel=SelectedProduct.name
      }
      axios.get('https://servicethree3.herokuapp.com/shops/SearchProduct/'+params.id+'/'+DriverId+'/'+ProductSel, {
        headers: {
          access: localStorage.getItem("access"),
        },
      }).then(response=>{
    
        setOrder({orders:response.data})
        console.log("ovfde SearchProduct:"+response.data)
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
<Col  xs={11} >
<Card className='shadow-lg' >
  <Card.Header className='p-4' >
    <h4>ListaUser</h4>
  </Card.Header>
<Card.Body>
<Table striped bordered hover variant="dark">
    <thead>
      
      <tr>
    <th>Slika</th>      
  <th>Ime proizvoda </th>
  <th>Cena</th>
  <th>Broj artikala</th>
  <th>Poruci</th>
 
</tr>
    </thead>
    <tbody>
     

    {OrderList()}


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



  return (
    <>
    <form >
      <input type="text"  style={
{
padding: "10px",
fontSize: "17px",
border: "1px solid grey",
float: "left",
width: "33vh",
background: "#f1f1f1"

}
      }     onChange={onChangeSearch}   value={SelectedProduct.name}  placeholder="Pretrazi proizvod po imenu ili ukupnoj ceni" name="search"/>
      <button type="submit"   onClick={SearchProduct}   style={

{
  float:"left",
  width: "5vh",
  padding: "10px",
  background: "#262626",
  color: "white",
  fontSize: "17px",
  border: "1px solid grey",
  borderLeft: "none",
  cursor: "pointer",






}

      }    ><i class="fa fa-search"></i></button>
    </form>
    <br/>
  <Container 
  
  className="d-flex  justify-content-center h-100 "
  style={{ minHeight: "85vh",minWidth:'10vh',marginTop:"50px"}}
>

<div className="w-100" >
 


    <Table  className={styles.tb}     >
      <thead   >
        <tr >
     <th >Slika</th>      
    <th>Datum porudzbine</th>
    <th>Ime proizvoda</th>
    <th>Broj artikala</th>
    <th>Ukupna cena</th>
    <th>Isporuci</th>
  </tr>
      </thead>
      <tbody>
       

      {OrderList()}


      </tbody>
    </Table>

    </div>
    </Container>
    </>


    )
    
    





}

export default OrderdProduct
