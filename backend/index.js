import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import prisma from './src/config/db.js';
dotenv.config();
const app = express();
app.use(helmet());
app.use(cors());
 
app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));   
//simple health check
app.get('/health',async (req,res)=>{
  
   try{
await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({status:'ok',database:'connected'});
   }catch(err){
    res.status(500).json({status:'error',message: err.message,database:'not connected'});
   }
})
app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes);
app.listen(process.env.PORT,()=>{
    console.log(`Cozy corner backend is running on port ${process.env.PORT}`);
})  