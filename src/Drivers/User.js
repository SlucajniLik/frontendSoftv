const  router=require('express').Router()
let User =require('../modeli/User')
const jwt=require('jsonwebtoken')
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../JWT");
const { sign, JsonWebTokenError } = require('jsonwebtoken');
const multer=require("multer")
router.use(cookieParser());
const {sendForgetPasswordEmail,sendVeritificationEmail}=require("../SendEmail")

const storage=multer.diskStorage({
  
    destination:(req,file,callback)=>{
         
           callback(null,"../frontend/public/Images/")
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})

const upload=multer({storage:storage})














router.route('/register').post(upload.single("image"),async (req,res)=>
{

const name=req.body.name
const surname=req.body.surname
const email=req.body.email
const password=req.body.password 
const role=req.body.role
const image=req.file.originalname //file 

bcrypt.hash(password,10).then(

(password)=>
{


    const newUser=new User({name,surname,email,password,image,role})
    newUser.save()





  
})

const token=jwt.sign(
    {email:email},'sda',{expiresIn:'7d'}
   )

const link="http://"+req.hostname+":5000/users/verifyEmail?token="+token

const sendEmail=  await sendVeritificationEmail(email,link)


  if(!sendEmail)
  {
    res.status(201).json({succes:true,msg:"Registred sucesfully"})
  }
  else
  {
    res.status(201).json({succes:true,msg:"Error in sending"})
  }







   /*const newUser=new User({name,surname,email,password,image,role})
    newUser.save()
    .then(()=>res.json(name))
    .catch(err=>res.status(400).json('Errornesto:'+err))*/




})


//verify email

router.route('/verifyEmail').get(
   async (req,res)=>{

   const {token}=req.query

   if(!token){
    res.status(403).json({success:false,msg:"Invalid token"})
   }
   

   let decodedToken;

   try{
    decodedToken=jwt.verify(token,"sda")
   }
   catch(err)
   {

        res.status(403).json({success:false,msg:"Invalid token",error:err})
    
   }

const oldUser=await User.findOne({email:decodedToken.email})

if(!oldUser){
    res.status(403).json({success:false,msg:"User not found"})
   }
 
    oldUser.verified=true;

    await oldUser.save()



    res.status(200).json({success:true,msg:"You are verified succesfully"})
}
)









/*router.route('/proveri').post((req,res)=>
{

const username=req.body.username
const password=req.body.password

const newUser=new User({username,password})


User.findOne({username:req.body.username},(err,user)=>{
    if(user)
    {
        res.send('1')
    }
    else
    {
        res.send({ message: "REGISTRUJTE SE"}  )
    }
    
});
}
)
*/
router.route('/login').post((req,res)=>
{

const email=req.body.email
const password=req.body.password

const newUser=new User({email,password})


User.findOne({email:req.body.email}).then(


    (user)=>{
       /* if(user)
        {
            res.send('1')
        }
        else
        {
            res.send({ message: "REGISTRUJTE SE"}  )
        }*/
          
      if(user)
      {
        const dbPassword=user.password

        bcrypt.compare(password,dbPassword).then((match)=>{
            if (!match) {
                res.json({ error: "Wrong Username and Password Combination!"+"sifra"+password });
              } else {



    //const accessToken=sign({username:user.username,id:user._id},"important")






            const accessToken = createTokens(user);
          
              /* res.cookie("access", accessToken, {

                 // httpOnly: true,
                });*/
          
                res.json({token:accessToken,email:user.email,id:user._id,name:user.name,role:user.role})
              }
        })
      }
      else
      {
        res.json({ error: "Wrong Username " });

      }




    }
).catch(err=>res.status(400).json('Errornesto:'+err));
})









router.route('/forgotPassword').post((req,res)=>
{

const email=req.body.email





User.findOne({email:req.body.email}).then(

    
    async (user)=>{


          console.log(req.body.email)


      if(user)
      {

        const token = createTokens(user);

        const link="http://"+req.hostname+":3000/ResetPassword/"+token


        const sendEmail=  await sendForgetPasswordEmail(user.email,link)








        if(!sendEmail)
  {
    res.status(201).json({succes:true,msg:"Email je uspesno poslat"})
  }
  else
  {
    res.status(201).json({succes:true,msg:"Error in sending"})
  }

     
      }
      else
      {
        res.json({ error: "Wrong email" });

      }




    }
).catch(err=>res.status(400).json('Errornesto:'+err));
})





router.route('/updateProfile/:id').post(validateToken,upload.single("image"),(req,res)=>
{
    console.log("ovahj "+req.body.email)

   
    bcrypt.hash(req.body.password,10).then(

      (password)=>
      {
      
      
          
        User.findByIdAndUpdate(req.params.id,
          {
           email:req.body.email,
           password:password,
           image:req.file.originalname
         
          } 
           ).then(
         
             r=>{
               res.json(r)
             }
           )
      
      
      
      
        
      })
})








































router.route('/check').get(validateToken,
  (req,res)=>{

    res.json(req.user)
  }
 
   
 )
 


 router.route('/profile/:id').get(validateToken,
  (req,res)=>{


    User.findById(req.params.id).then(

      user=>{
        res.json(user)
      }
    )


    
  }
 
   
 )















/*router.route('/:id').get((req,res)=>{
    User.findById(req.params.id).then(user=>res.json(user))
    .catch(err=>res.status(400).json('Errornesto:'+err))
    
})*/



router.route('/resetPassword').post(validateToken,async (req,res)=>
{


const newpassword=req.body.password 

console.log("oVDE PASS"+newpassword)
bcrypt.hash(newpassword,10).then(

  (newpassword)=>
{
   console.log("Ovde neki id:"+req.user.id)
   User.findByIdAndUpdate(
      
        req.user.id,
    
      {
        password:newpassword
      }
    ).catch( err=>{
      res.json(err)
    })
    {
     
    }

  
})


res.json("Uspenso ste izmenili sifru")

})

























router.route('/').get(validateToken,(req,res)=>{
    User.find().then(user=>res.json(user))
    .catch(err=>res.status(400).json('Errornesto:'+err))
    
})






router.route('/reject/:id').delete(validateToken,(req,res)=>{
    User.findByIdAndDelete(req.params.id).then(()=>res.json('User deleted'))
    .catch(err=>res.status(400).json(err))
    
})
router.route('/aprove/:id').post(validateToken,(req,res)=>{
   
  User.findById(req.params.id).then(user=>{

        user.aproved=true;
      

        user.save().then(()=>res.json('User aproved'+user.id))
        .catch(err=>res.status(400).json(err))


    }).catch(err=>res.status(400).json(err))





    
})







module.exports=router