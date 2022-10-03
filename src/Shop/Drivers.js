import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import {Form,Container,Row,Col,Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';






function Users(props)
{

/*return(

<tr>
 <td>
 <img src={`Images/${props.user.image}`} width="100" height="50" />
 </td>
 <td>{props.user.name} {props.user.surname}</td>
 <td>{props.user.role} </td>
 <td>
     <Button variant="warning"><Link to={"/ChoseProduct/"+props.user._id}  >Izaberi</Link></Button> 

     </td>
</tr>

)*/

return (
<>
  <Card style={{width:"40vh",height:"31.5vh"}}  >
    <div  style={{  textAlign:"center", height:"20vh",width:"40vh" }}   >
    <Card.Img
      variant="top"
      src={props.user.UrlImg}
      height="200px"
      style={{  textAlign:"center", height:"20vh",width:"40vh" }}
    />
    </div>
    <Card.Body className="d-flex flex-column"  style={{height:"13.5vh",width:"40vh"}}  > 
      <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
        <span   ><b>Ime vozaca:</b>{props.user.name} {props.user.surname}</span>
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
            
            <Button   className="w-100"    variant="success"><Link   style={{color:"white", textDecoration: "none" }}  to={"/ChoseProduct/"+props.user._id}  >Izaberite vozaca</Link></Button> 
              
            
            </div>
         
          </div>
        
      </div>
    </Card.Body>
  </Card>
  <br/>
  </>
)


















}







function Drivers() {


const [userA,setUsers] = useState({
     users:[]
});




const [SelectedUser,SetSelectedUser]=useState({

  name:""
  
  })
  
  function onChangeSearch(e)
  {
  
       SetSelectedUser(
        {
          name:e.target.value      
        }
       )
  }
  



    useEffect(() => {
  
        axios.get('https://servicetwo2.herokuapp.com/shops/', {
            headers: {
              access: localStorage.getItem("access"),
            },
          }).then(response=>{

            setUsers({users:response.data})
            console.log("ovfde:"+response.data)
            }
            ).catch((error)=>{
                console.log(error)
               
            })
            





    }, []);


    












   function UsersList()
    {
      
       return userA.users.map(currentUser=>{
        return <Col style={{margin:"5px"}} ><Users  user={currentUser}    key={currentUser._id}   ></Users></Col>
       })


    }



    function SearchUser(e)
    {  
    
      e.preventDefault()
      console.log("Ovde je selected user"+SelectedUser.name)
      var UserSel=""
      if(SelectedUser.name.length==0)
      {
        UserSel="NoUser"
      }
      else
      {
        UserSel=SelectedUser.name
      }
      axios.get('https://servicetwo2.herokuapp.com/shops/SearchUser/'+UserSel, {
        headers: {
          access: localStorage.getItem("access"),
        },
      }).then(response=>{
    
        setUsers({users:response.data})
        console.log("ovfde SearchUser:"+response.data)
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
    <th>Ime i prezime </th>
    <th>Uloga</th>
    <th>Odobri</th>

  </tr>
      </thead>
      <tbody>
       

      {UsersList()}


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


if(userA.users.length>0)
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
width: "33vh",
background: "#f1f1f1"

}
      }     onChange={onChangeSearch}   value={SelectedUser.name}  placeholder="Pretraga korisnika po imenu ili prezimenu" name="search"/>
      <button type="submit"   onClick={SearchUser}   style={

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


   <br/>
  <Container 
  
  style={{ display:"flex",justifyContent:"center",marginTop:"50px",background:"red" ,minHeight: "89vh",minWidth:'180vh'}}
>


    
    <Row  md={3} xs={1} lg={3}  >
    {UsersList()}
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

      <h1 className='fs-1'  >Nema dostupnih vozaca</h1>
      </div>
    </Container>
  )
}
  













}

export default Drivers










