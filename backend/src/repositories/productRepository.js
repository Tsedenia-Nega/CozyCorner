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
    // 1. Destructure to remove 'id' and 'createdAt' from the body
    // Prisma throws an error if you include the Primary Key in the 'data' section
    const { id: _, createdAt, ...updateData } = data;

    return await prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...updateData,
        // 2. Force conversion to numbers in case they come as strings from the form
        price: updateData.price ? parseFloat(updateData.price) : undefined,
        stock: updateData.stock ? parseInt(updateData.stock) : undefined,
      },
    });
  }
  async getById(id) {
    return await prisma.product.findUnique({ where: { id: Number(id) } });
  }
  async delete(id) {
    return await prisma.product.delete({
      where: { id: Number(id) }, // Add Number() here
    });
  }
}
export default new ProductRepository();