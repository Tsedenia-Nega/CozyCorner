import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './src/config/db.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());    
//simple health check
app.get('/health',async (req,res)=>{
  
   try{
await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({status:'ok',database:'connected'});
   }catch(err){
    res.status(500).json({status:'error',message: err.message,database:'not connected'});
   }
})
app.listen(process.env.PORT,()=>{
    console.log(`Cozy corner backend is running on port ${process.env.PORT}`);
})  