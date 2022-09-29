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
 <img src={props.user.UrlImg} width="100" height="50" />
 </td>
 <td>{props.user.name} {props.user.surname}</td>
 <td>{props.user.role} </td>
 <td>
    
     <Button variant="danger"><a    style={{textDecoration:"none",color:"white"}}   href='#' onClick={()=>props.deleteUser(props.user._id)}>Izbrisi</a></Button> 
     </td>
   
</tr>

)
}


function UsersApp() {


const [userA,setUsers] = useState({
     users:[]
});







    useEffect(() => {
  
        axios.get('https://serviceone1.herokuapp.com/users/All', {
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
        axios.delete('https://serviceone1.herokuapp.com/users/delete/'+id,{
            headers: {
              access: localStorage.getItem("access"),
            },
          }).then(
             res=>console.log(res.data));
             setUsers({
                 users:userA.users.filter(el=>el._id!=id)
             })
     
     
     }






   function UsersList()
    {
      
       return userA.users.map(currentUser=>{
        return <Users  user={currentUser} deleteUser={deleteUser}   key={currentUser._id}   ></Users>
       })


    }

















if(userA.users.length>0)
{
  return (
  
    <>
     


  <Container 
  
  className="d-flex align-items-center justify-content-center h-100 "
  style={{ minHeight: "90vh",minWidth:'150vh'}}
>

<form >
      <input type="text" placeholder="Pretrazi" name="search"/>
      <button type="submit"><i class="fa fa-search"></i></button>
    </form>



  <div className="w-100 h-100" style={{height:"100vh" }}>




    <Table className={styles.tb}>
          <thead>
            
            <tr>
          <th>Slika</th>      
        <th>Ime i prezime </th>
        <th>Uloga</th>
        <th>Odbij</th>
    
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

      <h1 className='fs-1'  >Nema korisnika</h1>
      </div>
    </Container>
  )
}
 
}

export default UsersApp










