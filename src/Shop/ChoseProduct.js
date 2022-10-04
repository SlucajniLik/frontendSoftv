import React,{useEffect,useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import {Form,Container,Row,Col,Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { DefContext } from "../Helpers/DefContext";
import {  useParams,useNavigate } from "react-router-dom";
function Products(props)
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


return (
  <Card className="h-100">
    <Card.Img
      variant="top"
      src={props.product.UrlImg}
      height="200px"
      style={{ objectFit: "cover" }}
    />
    <Card.Body className="d-flex flex-column">
      <Card.Title  style={{display:"flex", flexDirection:"column"  }}>
      <span className="fs-5" ><b>Cena:</b>{props.product.price} DIN</span>
        <span className="fs-5"><b>Ime proizvoda:</b>{props.product.name} </span>
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
            
            <Button className="w-100"    variant="success"   onClick={()=>props.OrderProduct(userState.id,params.id,props.product._id,numProd,SetNumProd )}>Porucite</Button> 
              
           <input type="text" id="fname" name="fname" onChange={onChangeNum} value={numProd} placeholder="Broj artikala"   />
            {(isNaN(numProd) || !numProd) &&  <p   style={{color:'blue'}}   >Unesite broj artikala</p>}  
            </div>
         
          </div>
        
      </div>
    </Card.Body>
  </Card>
)
















}

function ChoseProduct() {

    const [productA,setProducts] = useState({
        products:[]
   });

   
   const [SelectedProduct,SetSelectedProduct]=useState({

    price:""
    
    })
    
    function onChangeSearch(e)
    {
    
         SetSelectedProduct(
          {
            price:e.target.value      
          }
         )
    }








   const  navigate=useNavigate()

    useEffect(() => {
  
        axios.get('https://servicetwo2.herokuapp.com/products/', {
            headers: {
              access: localStorage.getItem("access"),
            },
          }).then(response=>{

            setProducts({products:response.data})
           // console.log(response.data)
            }
            ).catch((error)=>{
                console.log(error)
               
            })
            





    }, []);





    function OrderProduct(SellerId,DriverId,ProductId,numProd,SetNumProd){


      if(!isNaN(numProd) && numProd )
      {
      let order=
      {
         SellerId:SellerId,
         DriverId:DriverId,
         ProductId:ProductId,
         numProd:numProd


      }
     axios.post('https://servicetwo2.herokuapp.com/shops/addOrderCart',order,{
          headers: {
            access: localStorage.getItem("access"),
          },
        }).then(
           res=>
            {
              if(res.data==false)
              {navigate("/NewShop")}
            }
           );
          
          }
          else
          {
            console.log("nema OVDE")
          }




SetNumProd("")
   
   }











    function ProductList()
    {
      
       return productA.products.map(currentProduct=>{
        return <Col   key={currentProduct._id+"f"}      ><Products product={currentProduct}  OrderProduct={OrderProduct} key={currentProduct._id}   ></Products></Col>
       })


    }

    function SearchProduct(e)
    {  
    
      e.preventDefault()
      console.log("Ovde je selected product"+SelectedProduct.price)
      var ProductSel=""
      if(SelectedProduct.price.length==0)
      {
        ProductSel="NoProduct"
      }
      else
      {
        ProductSel=SelectedProduct.price
      }
      axios.get('https://servicetwo2.herokuapp.com/products/SearchProduct/'+ProductSel, {
        headers: {
          access: localStorage.getItem("access"),
        },
      }).then(response=>{
    
        setProducts({products:response.data})
        console.log("ovfde SearchProduct:"+response.data)
        }
        ).catch((error)=>{
            console.log(error)
           
        })
    
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



if(productA.products.length>0)
{
  return (
    <>
 <br/>
 <form style={{width:"90%",display:"flex",alignItems:"center",justifyContent:"center"}}  >
      <input type="text"  style={
{
padding: "10px",
fontSize: "17px",
border: "1px solid grey",
float: "left",
width: "30vh",
background: "#f1f1f1"

}
      }     onChange={onChangeSearch}   value={SelectedProduct.price}  placeholder="Pretrazi proizvod po ceni" name="search"/>
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
  
  className="d-flex  justify-content-center  "
  style={{ minHeight: "90vh",minWidth:'10vh',marginTop:"50px",background:"red"}}
>

  <div className="w-100" >
    
    <Row  md={3} xs={1} lg={3} >
    {ProductList()}
    </Row>
    
    
    
   
</div>
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
  
  
  <h1>Nema proizvoda</h1>
      </div>
      </Container>
  )









}
  
}

export default ChoseProduct
