import logo from './logo.svg';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect,useContext } from "react";
import RegisterUser from './Users/RegisterUser';
import Reg from './Users/RegisterUser';
import './App.css';
import LogInUser from './Users/LogInUser';
import Navbarr from './Navbar';
import Footer from './Footer';
import { DefContext } from "./Helpers/DefContext";
import axios from 'axios';
import Approvals from './Admin/Approvals';
import NewProducts from './Admin/NewProducts';
import AllProducts from './Admin/AllProducts';
import UpdateProduct from './Admin/UpdateProduct';
import NewShop from './Shop/NewShop';

import Drivers from './Shop/Drivers';
import ChoseProduct from './Shop/ChoseProduct';
import ShopList from './Drivers/ShopList';
import OrderdProduct from './Drivers/OrderdProduct';
import UsersApp from './Admin/UsersApp';
import ForgotPassword from './Users/ForgotPassword';
import ResetPassword from './Users/ResetPassword';
import ProfileA from './Admin/ProfileA';
import CartProduct from './Shop/CartProduct';
import UpdateProfile from './Admin/UpdateProfile';
import ProfileS from './Shop/ProfileS';
import UpdateProfileS from './Shop/UpdateProfileS';
import ProfileD from './Drivers/ProfileD';
import UpdateProfileD from './Drivers/UpdateProfileD';
import UpdateShop from './Shop/UpdateShop';
import Footers from './Users/Footers';


function App() {

 const [userState, setUserState] = useState({
    email: "",
    id: 0,
    status: false,
    role:""
  });


 const [ userPassword,setUserPassword] = useState({
    pass:"123"});

  useEffect(() => {
    axios
      .get("https://serviceone1.herokuapp.com/users/check", {
        headers: {
          access: localStorage.getItem("access"),
        },
      }
      )
      .then((res) => {
        if (res.data.error) {
          setUserState({ ...userState, status: false });
        
        } else {
          setUserState({
            email: res.data.email,
            id: res.data.id,
            status: true,
            name:res.data.name,
            role:res.data.role
          });
      //setUserPassword({...userPassword});
    
        }
   
      });
  }, []);

  console.log("ispravno:"+userState.id)






















  const logout = () => {
    localStorage.removeItem("access");
    setUserState({ email: "", id: 0, status: false,name:"" });
  };
  return (
    <div className="App">
 
     <DefContext.Provider   value={{userState,setUserState,userPassword,setUserPassword}} >
 

<Navbarr/>
   <BrowserRouter>
   <Routes>
   { 
           !userState.status &&
           <>
   <Route path="/" element={<LogInUser/>}/>
   <Route path="/:reg" element={<LogInUser/>}/>
   <Route path="/Register" element={<RegisterUser/>} />
   
      </>
}
<Route path="/ForgotPassword" element={<ForgotPassword/>} />
   <Route path="/ResetPassword/:token" element={<ResetPassword/>} />
{ 

           userState.role=="Admin" &&
           <>
   <Route path="/Approvals" element={<Approvals/>} />
   <Route path="/NewProducts" element={<NewProducts/>} />
   <Route path="/AllProducts" element={<AllProducts/>} />
   <Route path="/UsersApp" element={<UsersApp/>} />
   <Route path="/UpdateProduct/:id/:name/:price" element={<UpdateProduct/>} />
   <Route path="/" element={<ProfileA/>} />
   <Route path="/UpdateProfile/:id" element={<UpdateProfile/>} />

   </>
}
{ 
           userState.role=="Prodavac" &&
           <>
   <Route path="/NewShop" element={<NewShop/>} />
   <Route path="/ChoseProduct/:id" element={<ChoseProduct/>} />
   <Route path="/Drivers" element={<Drivers/>} />
   <Route path="/Cart" element={<CartProduct/>} />
   <Route path="/" element={<ProfileS/>} />
   <Route path="/UpdateProfileS/:id" element={<UpdateProfileS/>} />
   <Route path="/UpdateShop/:id/:name/:city/:address" element={<UpdateShop/>} />
   </>
}
{
 userState.role=="Vozac" &&
 <>
   <Route path="/ShopList" element={<ShopList/>} />
   <Route path="/OrderdProduct/:id" element={<OrderdProduct/>} />
   <Route path="/" element={<ProfileD/>} />
   <Route path="/UpdateProfileD/:id" element={<UpdateProfileD/>} />
   </>
}
   </Routes>
   </BrowserRouter>

   </DefContext.Provider>
<Footers/>



    </div>
  );
}

export default App;
