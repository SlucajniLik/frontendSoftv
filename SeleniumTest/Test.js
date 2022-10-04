const{Builder,By,Key,until}=require('selenium-webdriver')


 async function example(){


   let driver=await new Builder().forBrowser('chrome').build()

       await driver.get("https://resplendent-croquembouche-6e983e.netlify.app/")

       await driver.findElement(By.name("email")).sendKeys("aminmelic555@gmail.com")
       await driver.sleep(1000);
       await driver.findElement(By.name("lozinka")).sendKeys("123456789")
       await driver.sleep(1000);
       await driver.findElement(By.name("login")).click()
       await driver.sleep(1000);
     await driver.findElement(By.name("updateProfle")).click()
     /* // await driver.get("http://localhost:3000/Profile")
    await driver.sleep(2000);
   
       await driver.sleep(1000);
       await driver.findElement(By.name("emailU")).sendKeys("aminmelic555@gmail.com1")
       await driver.sleep(1000);
       await driver.findElement(By.name("lozinkaU")).sendKeys("Amin1234")
       await driver.sleep(1000);
       await driver.findElement(By.name("lozinkaPU")).sendKeys("Amin1234")
     await driver.sleep(1000);
       await driver.findElement(By.name("slikaU")).sendKeys("C:\\Users\\Korisnik\\Desktop\\tetris.png ")
       await driver.sleep(1000);
       await driver.findElement(By.name("izmeniPod")).click()
       await driver.sleep(3000);
       await driver.findElement(By.name("logOut")).click()*/

       console.log("zavrsen je test")
}



example();