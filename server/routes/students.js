const express=require("express");
const router=express.Router();
const studentController=require("../controllers/studentsController")

//view all recods
router.get('/',studentController.view);

router.get('/adduser',studentController.adduser);
router.post('/adduser',studentController.save);

router.get('/edituser/:id',studentController.edituser);
router.post('/edituser/:id',studentController.edit);


router.get('/deleteuser/:id',studentController.delete);



router.get('',(req,res)=>{
res.render("home");
});



module.exports=router;

