//view details visible
const mysql=require("mysql");

const con=mysql.createPool({
    connectionLimit:10,
    host    :process.env.DB_HOST,
    user    :process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
    
    });

    exports.view=(req,res)=>{

        con.getConnection((err,connection)=>{
            if(err) throw err
            console.log("connection okay databases..")
            connection.query("select * from curd_operation",(err,rows)=>{
            connection.release();
            if(!err){
                console.log("good")
               //row display in home
              res.render("home",{rows});   
            }
            else{
                console.log("EROOR in DATA")
            }
            });

            });

 
    };



//add user
exports.adduser=(req,res)=>{
    res.render("adduser")
}


exports.save=(req,res)=>{
   con.getConnection((err,connection)=>{
            if(err) throw err
            const{name,age,city,phonenumber}=req.body;



            console.log("connection okay databases..")
            connection.query("insert into curd_operation(NAME,AGE,CITY,PHONE_NUMBER)values(?,?,?,?)",[name,age,city,phonenumber],
            (err,rows)=>{
            connection.release();
            if(!err){
                console.log("good")
               //row display in home
               res.render("adduser",{msg:"Added success."});
            }
            else{
                console.log("EROOR in DATA")
            }
            });

            });

}

exports.edituser=(req,res)=>{ 
    
    con.getConnection((err,connection)=>{
    console.log("edut");
    if(err) throw err
    console.log("connection okay databases..")
       //get id
       let id=req.params.id;




    connection.query("select * from curd_operation where id=?",[id],(err,rows)=>{
    connection.release();
    if(!err){
        console.log("good")
       //row display in home
       res.render("edituser",{rows})  
    }
    else{
        console.log("EROOR in DATA"+err)
    }
    });

    });
}

/*
      let id=req.params.id;
             connection.query("update curd_operation set NAME=?,AGE=?,CITY=?,PHONE_NUMBER=? where ID=?",[name,age,city,phonenumber,id],
             (err,rows)=>{
             connection.release();


*/




exports.edit=(req,res)=>{
    con.getConnection((err,connection)=>{
             if(err) throw err
             const{name,age,city,phonenumber}=req.body;
 
 
 
             let id=req.params.id;
             connection.query("update curd_operation set NAME=?,AGE=?,CITY=?,PHONE_NUMBER=? where ID=?",[name,age,city,phonenumber,id],
             (err,rows)=>{
             connection.release();
             
             if(!err){
                con.getConnection((err,connection)=>{
                    console.log("edut");
                    if(err) throw err
                    console.log("connection okay databases..")
                       //get id
                       let id=req.params.id;
                    connection.query("select * from curd_operation where id=?",[id],(err,rows)=>{
                    connection.release();
                    if(!err){
                        console.log("good")
                        res.render("edituser",{rows,msg:"Added success."});  
                    }
                    else{
                        console.log("EROOR in DATA"+err)
                    }
                    });
                
                    });
            
             }
             else{
                 console.log("EROOR in DATA")
             }
             });
 
             });
 
 }
 

//delete
exports.delete=(req,res)=>{
    con.getConnection((err,connection)=>{
if(err) throw err

let id=req.params.id;
connection.query("delete from curd_operation where id=?",[id],
(err,rows)=>{

connection.release();
if(!err){
res.redirect('/');
}else{
    console.log(err);
}

});
    });
}




