import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';
class AuthService{
async register (name,email,password){
    const existingUser = await userRepository.findByEmail(email);
    if(existingUser){
        throw new Error('User already exists with this email');
    }
    const hashedPassword = await bcrypt.hash(password,10);
    return await userRepository.createUser({
        name,email,password:hashedPassword,
        isAdmin:false,
    });
}

async login (email,password){
    const user = await userRepository.findByEmail(email);
    if(!user){
        throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Invalid email or password');
    }
    const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'1d'});
    return {token,user};
}
    }
export default new AuthService();   