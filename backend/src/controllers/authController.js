import authService from '../services/authService.js';
export const register=async(req,res)=>{
try{
const {name,email,password}= req.body;
const user = await authService.register(name,email,password);
res.status(201).json({message:'User registered successfully',user});
}catch(err){
    res.status(500).json({message:err.message});

}
}
export const login=async(req,res)=>{
    try{
    const {email,password}= req.body;                   
    const data = await authService.login(email,password);
    res.status(200).json(data);
    }catch(err){
        res.status(500).json({message:err.message});    }}