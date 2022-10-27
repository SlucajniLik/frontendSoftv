import {render,act,fireEvent} from "@testing-library/react";
import ForgotPassword from './ForgotPassword';
import React from "react"


describe("button component",()=>{


    it("check button exists",()=>{

        // await act(async ()=>{
      
              const {getByTestId}=render(<ForgotPassword/>);
              const button=getByTestId("button")
             
              expect(button).toBeTruthy()
             
      
      
      
      
        //  })
       
      
      });






it("error after button",()=>{

  // await act(async ()=>{

        const {getByTestId}=render(<ForgotPassword/>);
        const button=getByTestId("button")
        fireEvent.click(button)
        const errorEmail=getByTestId("errorEmail")
        expect(errorEmail.innerHTML).toBe("Vas email nije validan")
       




  //  })
 

});



/*it("success after button",()=>{

    //act(async ()=>{
  
          const {getByTestId}=render(<ForgotPassword/>);
          const button=getByTestId("button")
          const input=getByTestId("inputEmail")
          const inputWord="aminmelic555@gmail.com"
          fireEvent.change(input,{target:{value:inputWord}})
         fireEvent.click(button)
          const successEmail=getByTestId("successEmail")
          expect(successEmail.innerHTML).toBe("Uspesno ste poslali email")
         
  
  
  
  
    // })
   
  
  })*/



})