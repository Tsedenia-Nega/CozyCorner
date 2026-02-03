import productRepository from "../repositories/productRepository.js";

class ProductService {
  async addProduct(data) {
    if (data.price < 0) throw new Error("Price cannot be negative");
    return await productRepository.createProduct(data);
  }
  async getAllproducts() {
    return await productRepository.getAll();
  }
  async updateProduct(id, updateData) {
    const existing = await productRepository.findById(id);
    if (!existing) throw new Error("Product not found");
    return await productRepository.update(id, updateData);
  }
  async removeProduct(id) {
    return await productRepository.delete(id);
  }
}
export default new ProductService();