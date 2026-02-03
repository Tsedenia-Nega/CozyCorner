import productService from "../services/productService.js";

export const createProduct = async (req, res) => {
  try {
    const product = await productService.addProduct(req.body);          
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};  
export const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllproducts();     
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }         

};
  export const updateProduct = async (req, res) => {        const { id } = req.params;
    try {
      const updatedProduct = await productService.updateProduct(id, req.body);  
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }       }
// };
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productService.removeProduct(id);          
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getProductById = async (req, res) => {
  const { id } = req.params;            
    try {   await productService.getProductById(id);          
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  } };
