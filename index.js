import express from 'express';
import { createConnection } from 'mysql2';


const PORT = 3403;
const app = express(); 
app.use(express.json());//middleware

const connection=createConnection({
    host:'localhost',
    user:'root',
    password:'cdac',
    database:'mydb'
});
app.get("/",(request,response)=>{//Read (GET request)
    response.send({message:"Welcome to Employee CRUD API"});
});//for handling rout

app.post("/register-employee",(request,response)=>{//Create (POST request)
    try {
        const data= request.body;
        const insertquery=`INSERT INTO employee VALUES(${data.id},'${data.name}',${data.salary})`;
        connection.query(insertquery,(error,result)=>{
            if(error){
                response.status(500).send({message:"Error Registering employee"});
            }
            else{
                response.status(201).send({message:"Employee Registered"});
            }
        });
        
    } catch (error) {       
        response.status(500).send({message:"Error Registering employee"});
        
    }

});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`); 
    connection.connect((error)=>{
        if(error){
            console.log(error);   
        }
        else{
            console.log("Connected to database");
            
        }

    });
    
});

   