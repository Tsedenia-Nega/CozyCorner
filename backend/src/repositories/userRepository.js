import prisma from '../config/db.js';
class UserRepository {
async createUser(data) {
    return await prisma.user.create({ data });
  }
async findByEmail(email){
    return await prisma.user.findUnique({ where : {email}, });
}
async findById(id){
    return await prisma.user.findUnique({where : {id},})
}

}
export default new UserRepository();