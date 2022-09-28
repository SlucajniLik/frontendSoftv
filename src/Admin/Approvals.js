import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import {Form,Container,Row,Col,Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import styles from './mystyle.module.css'





function Users(props)
{

return(

<tr>
 <td>
 <img src={`Images/${props.user.UrlImg}`} width="100" height="50" />
 </td>
 <td>{props.user.name} {props.user.surname}</td>
 <td>{props.user.role} </td>
 <td>
     <Button variant="success"><a   style={{textDecoration:"none",color:"white"}}    href='#' onClick={()=>props.aproveUser(props.user._id)}>Odobriti</a></Button> 
     </td>
 <td>
     <Button variant="danger"><a  style={{textDecoration:"none",color:"white"}}  href='#' onClick={()=>props.deleteUser(props.user._id)}>Odbiti</a></Button> 
     </td>
    
</tr>

)
}







function Approvals() {


const [userA,setUsers] = useState({
     users:[]
});







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
















if(userA.users.length>0)
{

  return (

   
    <>

  <Container 
  
  className="d-flex align-items-center justify-content-center  "
  style={{ minHeight: "90vh",minWidth:'150vh'}}
>

  <div className="w-100" style={{ }}>

    <Table  className={styles.tb}   >
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


<h1>Nema korisnika</h1>
    </div>
    </Container>
)


}

  
}

export default Approvals










