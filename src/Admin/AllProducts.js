import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import {Form,Container,Row,Col,Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


function Products(props)
{

/*return(

<tr>
 <td>
 <img src={`Images/${props.product.image}`} width="100" height="50" />
 </td>
 <td>{props.product.name} </td>
 <td>{props.product.price} </td>
 <td>
    
     <Button variant="warning"><a href='#' onClick={()=>props.deleteProduct(props.product._id)}>Izbrisi</a></Button> 
     </td>
     <td>
     <Button variant="warning"><Link to={"/UpdateProduct/"+props.product._id}  >Update</Link></Button> 
     </td>
</tr>

)*/


return (



<>
  <Card   style={{width:"30vh",height:"33.5vh"}}   >
    <div   style={{  textAlign:"center", height:"20vh",width:"30vh" }}  >
    <Card.Img
      variant="top"
      src={props.product.UrlImg}
       
      style={{  textAlign:"center", height:"20vh",width:"30vh" }}
    />
    </div>
    <Card.Body className="d-flex flex-column"     style={{height:"13.5vh",width:"30vh"}}>
      <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
        <span className="ms-2 text-muted">{props.product.name}</span>
        <span className="ms-4 text-muted">{props.product.price} Din</span>
      </Card.Title>
      <div className="mt-auto">
      
         
      
          <div
          
            
          >
            <div
              className="d-flex "
              style={{ gap: ".5rem" }}
            >
              <Button   variant="danger"
              className="w-100"  onClick={()=>props.deleteProduct(props.product._id)}>Izbrisi</Button>
              
              <Button   className="w-100"    variant="success"><Link   style={{color:"white", textDecoration: "none" }}  to={"/UpdateProduct/"+props.product._id}  >Izmeni</Link></Button> 
            </div>
         
          </div>
        
      </div>
      
    </Card.Body>
  </Card>
  <br/>
</>
)

}

function AllProducts() {

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


















    useEffect(() => {
  
        axios.get('https://serviceone1.herokuapp.com/products/', {
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





    function deleteProduct(id){

      let data=[]
      axios.delete('https://serviceone1.herokuapp.com/products/delete/'+id,{
          headers: {
            access: localStorage.getItem("access"),
          },
        }).then(
           res=>console.log(res.data));
           setProducts({
               products:productA.products.filter(el=>el._id!=id)
           })
   
   
   }











    function ProductList()
    {
      
       return productA.products.map(currentProduct=>{
        return <Col key={currentProduct._id+"123"}   ><Products product={currentProduct}  deleteProduct={deleteProduct}  key={currentProduct._id}   ></Products></Col>
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
      axios.get('https://serviceone1.herokuapp.com/products/SearchProduct/'+ProductSel, {
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
  <th>Ime proizvoda </th>
  <th>Cena</th>
  <th>Odbij</th>
  <th>Odobri</th>
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
      }     onChange={onChangeSearch}   value={SelectedProduct.price}  placeholder="Pretrazi proizvod po ceni" name="search"/>
      <button type="submit" variant="dark"   onClick={SearchProduct}   style={

{
  float:"left",
  width: "5vh",
  padding: "10px",
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
    
    
    style={{ display:"flex", marginTop:"50px", justifyContent:"center", minHeight: "90vh",minWidth:'180vh'}}
  >
  
   
  
  
  
  <Row  md={3} xs={1} lg={3}  >
  {ProductList()}
  </Row>
  
  
  
 
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

      <h1 className='fs-1'  >Nema dostupnih proizvoda</h1>
      </div>
    </Container>
  )

}


}

export default AllProducts
