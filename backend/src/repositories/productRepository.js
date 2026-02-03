import prisma from "../config/db.js";

class ProductRepository {
  async createProduct(data) {
    return await prisma.product.create({ data });
  }
  async getAll() {
    return await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
  async update(id, data) {
    return await prisma.product.update({
      where: { id: Number(id) },
      data: data, // Prisma only updates the fields present in this object
    });
  }
  async getById(id) {
    return await prisma.product.findUnique({ where: { id: Number(id) } });
  }
  async delete(id) {
    return await prisma.product.delete({ where: { id } });
  }
}
export default new ProductRepository();