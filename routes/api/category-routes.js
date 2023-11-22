const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const category = await Category.findAll({
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }],
    });

    res.json(category);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = req.params.id;

    const category = await Category.findOne({
      where: { id: categoryId },
      include: [{
        model: Product, 
        attributes: ['iid', 'product_name', 'price', 'stock', 'category_id'],
      }],
    });

    res.json(category);
  } catch (err) {
    console.log(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
