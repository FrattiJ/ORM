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

router.post('/', async (req, res) => {
  // create a new category
  try {
const categoryName= await Category.create(req.body);
res.json(categoryName)
  } catch (error) {
    console.log(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        },
      }
    ).then ((updatedCategory) => {
      res.json(updatedCategory);
    })
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.json({message: 'No category found with this id'});
      return
    }

    res.json(categoryData);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
