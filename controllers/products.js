const Product = require('../models/Product.js');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    if (req.query.json === 'true') {
      return res.json(products);
    }

    const html = `
      <html>
      <body>
        <h1>Products <span style="font-size: 14px">(use <code>json=true</code> query param in order to see this in JSON)</span></h1>
        <ul>
          ${products.map(p => `<li>${p.name} - $${p.price}</li>`).join('')}
        </ul>
      </body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'product not found' });
    res.json({ message: 'deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
