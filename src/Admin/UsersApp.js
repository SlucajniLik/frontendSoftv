import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import {Form,Container,Row,Col,Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import styles from './mystyle.module.css'
import { search } from '../../../ServiceOne/routes/User';




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



function SearchUser(e)
{  

  e.preventDefault()
  console.log("Ovde je selected user"+SelectedUser.name)
  var SelectUser=""
  if(SelectedUser.name.length==0)
  {
   SelectUser="No user"
  }
  else
  {

    SelectUser=SelectedUser.name

  }

  axios.get('https://serviceone1.herokuapp.com/users/SearchUser/'+SelectUser, {
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
     


  <Container 
  
  className="d-flex align-items-center justify-content-center h-100 "
  style={{ minHeight: "90vh",minWidth:'150vh'}}
>

  <div className="w-100 h-100" style={{height:"100vh" }}>

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
      }     onChange={onChangeSearch}   value={SelectedUser.name}  placeholder="Pretrazi" name="search"/>
      <button type="submit"   onClick={SearchUser}   style={

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










