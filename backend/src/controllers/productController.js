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

  try {
    // 1. You must assign the result to a variable
    const product = await productService.getProductById(id);

    // 2. Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 3. Send the successfully found product
    res.status(200).json(product);
  } catch (error) {
    // 4. Use 500 for server errors, as 404 is specifically for "Not Found"
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
