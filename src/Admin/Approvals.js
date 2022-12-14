import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import {Form,Container,Row,Col,Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import styles from './mystyle.module.css'
import Modal from 'react-bootstrap/Modal';




function Users(props)
{

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);




return(

<tr>
 <td>
 <img src={props.user.UrlImg} width="100" height="50" />
 </td>
 <td>{props.user.name} {props.user.surname}</td>
 <td>{props.user.role} </td>
 <td>
     <Button variant="success"><a   style={{textDecoration:"none",color:"white"}}    href='#' onClick={handleShow1}>Odobriti</a></Button> 
     <Modal show={show1} onHide={handleClose1} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Povrdi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Jeste li sigurni da zelite da potvrdite korisnika ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Ne
          </Button>
          <Button variant="success"  onClick={()=>props.aproveUser(props.user._id)}>
            Da
          </Button>
        </Modal.Footer>
      </Modal>
     </td>
 <td>
     <Button variant="danger"><a  style={{textDecoration:"none",color:"white"}}  href='#' onClick={handleShow}>Odbiti</a></Button> 
     <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Povrdi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Jeste li sigurni da zelite da odbijete korisnika ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ne
          </Button>
          <Button variant="success"  onClick={()=>props.deleteUser(props.user._id)}>
            Da
          </Button>
        </Modal.Footer>
      </Modal>
     </td>
    
</tr>

)
}







function Approvals() {


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
  
        axios.get('https://serviceone1.herokuapp.com/users/', {
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


    function deleteUser(id){

        let data=[]
        axios.delete('https://serviceone1.herokuapp.com/users/reject/'+id,{
            headers: {
              access: localStorage.getItem("access"),
            },
          }).then(
             res=>console.log(res.data));
             setUsers({
                 users:userA.users.filter(el=>el._id!=id)
             })
     
     
     }

function aproveUser(id)
   {
      let data=[]
     axios.post('https://serviceone1.herokuapp.com/users/aprove/'+id,data,{
        headers: {
          access: localStorage.getItem("access"),
        },
      }
     ).then(res=>console.log(res.data))

     setUsers({
      users:userA.users.filter(el=>el._id!=id)
  })
   }










   function UsersList()
    {
      
       return userA.users.map(currentUser=>{
        return <Users  user={currentUser} deleteUser={deleteUser}  aproveUser={aproveUser}  key={currentUser._id}   ></Users>
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
      axios.get('https://serviceone1.herokuapp.com/users/SearchUserAproved/'+UserSel, {
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
    
    
    












if(userA.users.length>0)
{

  return (

   
    <>
    <br/>
<Form      style={{width:"90%",display:"flex",alignItems:"center",justifyContent:"center"}}     >
      <Form.Control type="text"  style={
{
padding: "10px",
fontSize: "17px",
border: "1px solid grey",
float: "left",
width: "48vh",
background: "#f1f1f1"

}
      }     onChange={onChangeSearch}   value={SelectedUser.name}  placeholder="Pretraga korisnika po imenu ili prezimenu" name="search"/>
      <Button type="submit"   onClick={SearchUser}   style={

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

      }    ><i class="fa fa-search"></i></Button>
    </Form>
    <br/>
  <Container 
  
  className="d-flex  justify-content-center h-100 "
  style={{ minHeight:window.innerHeight-10,minWidth:'10vh',marginTop:"50px"}}
>



  





<div className="w-100" >



    <Table  className={styles.tb}   striped bordered hover>
          <thead>
            
            <tr>
          <th>Slika</th>      
        <th>Ime i prezime </th>
        <th>Uloga</th>
        <th>Odobriti</th>
        <th>Odbiti</th>
      </tr>
          </thead>
          <tbody>
           
    
          {UsersList()}
    
    
          </tbody>
        </Table>
      
    
    
    
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


<h1>Nema zahteva za registraciju</h1>
    </div>
    </Container>
)


}

  
}

export default Approvals










