import React,{useEffect,useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import {Form,Container,Row,Col,Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { DefContext } from "../Helpers/DefContext";
import {  useParams } from "react-router-dom";
import styles from './mystyle.module.css'


function Orders(props)
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
 <img src={`/Images/${props.product.image}`} width="100" height="50" />
 </td>
 <td>{props.product.name} </td>
 <td>{props.product.price} </td>
 <td>
 <input type="text" id="fname" name="fname" onChange={onChangeNum} value={numProd}    /><br/>
 </td>
     <td>
     <Button variant="warning"><a href='#' onClick={()=>props.OrderProduct(userState.id,params.id,props.product._id,numProd)}>Poruci</a></Button> 
     </td>
</tr>

)*/

const [nProd,setNProd]=useState(props.order.NumProd)
return (


<tr>
 <td>
 <img src={props.order.ProductId.UrlImg} width="100" height="50"/>
 </td>

 <td>{props.order.ProductId.name}</td>
 <td>{ props.order.ProductId.price} Din</td>
 <td>{nProd}</td>
 <td>{props.order.ProductId.price*nProd} Din</td>
 <td><input type="text" id="fname" name="fname" onChange={onChangeNum} value={numProd}   placeholder="Broj komada" /></td>
 <td><Button className="w-100"    variant="success"   onClick={()=>props.UpdateNum(props.order._id,numProd,setNProd,SetNumProd)}>Izmeni</Button> </td>
 <td><Button className="w-100"    variant="danger"   onClick={()=>props.DeleteOrder(props.order._id)}>Odustani</Button> </td>
</tr>

)














  /*<Card className="h-100  ">
    <Card.Img
      variant="top"
      src={`/Images/${props.order.ProductId.image}`}
      height="200px"
      style={{ objectFit: "cover" }}
    />
    <Card.Body className="d-flex flex-column">
      <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
        <span className="fs-2">{props.order.ProductId.name} </span>
        <span className="ms-2 text-muted">{props.order.ProductId.price} DIN</span>
        <span className="ms-2 text-muted">{props.order.NumProd} kom</span>
        <span className="ms-2 text-muted">{props.order.NumProd*props.order.ProductId.price} ukupno</span>
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
            
            <Button className="w-100"    variant="danger"   onClick={()=>props.DeleteOrder(props.order._id)}>Odustani</Button> 
              
           
            </div>
         
          </div>
        
      </div>
    </Card.Body>
  </Card>*/

















}

function CartProduct() {

    const [ordersA,setOrders] = useState({
        orders:[]
   });
   const { userState,setUserState} = useContext(DefContext);
   
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


    useEffect(() => {
  
        axios.get('https://servicetwo2.herokuapp.com/products/Cart/'+userState.id, {
            headers: {
              access: localStorage.getItem("access"),
            },
          }).then(response=>{

            setOrders({orders:response.data})
           // console.log(response.data)
            }
            ).catch((error)=>{
                console.log(error)
               
            }
            
            )
            





    }, []);





    function DeleteOrder(id){

     
     axios.delete('https://servicetwo2.herokuapp.com/products/deleteCart/'+id,{
          headers: {
            access: localStorage.getItem("access"),
          },
        }).then(
           res=>console.log(res.data));
           setOrders({
            orders:ordersA.orders.filter(el=>el._id!=id)
        })
          
   
   
   }




function UpdateNum(id,valNum,setNProd,SetNumProd)
{


    if(!isNaN(valNum) ){
  let data=[]
  axios.post('https://servicetwo2.herokuapp.com/products/CardUpdate/'+id+'/'+valNum,data,{
    headers: {
      access: localStorage.getItem("access"),
    },
  }).then(response=>{

  
    console.log(response.data)
    }
    ).catch((error)=>{
        console.log(error)
       
    })
  }
  
   setNProd(valNum)
   SetNumProd("")
  }




  function SearchProduct(e)
  {  
  
    e.preventDefault()
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
    axios.get('https://servicetwo2.herokuapp.com/products/SearchCart/'+userState.id+'/'+ProductSel, {
      headers: {
        access: localStorage.getItem("access"),
      },
    }).then(response=>{
  
      setOrders({orders:response.data})
      console.log("ovfde SearchProduct:"+response.data)
      }
      ).catch((error)=>{
          console.log(error)
         
      })
  
  }








    function OrderList()
    {
      
       return ordersA.orders.map(currentOrder=>{
        return <Orders order={currentOrder}    UpdateNum={UpdateNum}  DeleteOrder={DeleteOrder} key={currentOrder._id}   ></Orders>
       })


    }


function OrderProducts(){


    axios.post('https://servicetwo2.herokuapp.com/shops/OrderProducts',ordersA,{
        headers: {
          access: localStorage.getItem("access"),
        },
      }).then(
         res=>{
          setOrders(prevState => prevState.set([]))
           console.log(res.data)
         console.log('Ovde duzina'+ordersA.orders.length)
         }
         );

      
        
}











  /*return (
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
     

    {ProductList()}


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



  if(ordersA.orders.length>0)
  {
  return (
    <>
   
  <Container 
  
  className="d-flex align-items-center justify-content-center  "
  style={{ minHeight: "84.6vh",minWidth:'150vh'}}
>

  <div className="w-100" style={{ }}>


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
      }     onChange={onChangeSearch}   value={SelectedProduct.name}  placeholder="Pretrazi proizvod po imenu ili upupnoj ceni" name="search"/>
      <button type="submit"   onClick={SearchProduct}   style={

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



    <Table  className={styles.tb}     >
      <thead   >
        <tr >
     <th >Slika</th>      
    <th>Ime proizvoda</th>
    <th>Cena</th>
    <th>Broj art</th>
    <th>Ukupna cena</th>
    <th>Broj komada</th>
    <th>Izmeni</th>
    <th>Odustani</th>
  </tr>
      </thead>
      <tbody>
       

      {OrderList()}


      </tbody>
    </Table>














    
  { /*<Row  md={2} xs={1} lg={3}   className="g-3" >
    {OrderList()}
    </Row>*/}

    <Button className="w-100"    variant="secondary"  onClick={OrderProducts}>Poruci</Button> 

    </div>
    </Container>
    </>
    )


  }
  else{
    return(
      <Container 
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh"}}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
    
    
    <h1>Nema proizvoda</h1>
        </div>
        </Container>
    )
    
  }








}

export default CartProduct
