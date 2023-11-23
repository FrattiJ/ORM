const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findAll({
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }],
    });

    res.json(tag);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = req.params.id;

    const tag = await Tag.findOne({
      where: { id: tagId },
      include: [{
        model: Product, 
        attributes: ['iid', 'product_name', 'price', 'stock', 'category_id'],
      }],
    });

    res.json(tag);
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagName= await Tag.create(req.body);
    res.json(tagName)
      } catch (error) {
        console.log(err);
      }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        },
      }
    ).then ((updatedTag) => {
      res.json(updatedTag);
    })
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.json({message: 'No tag found with this id'});
      return
    }

    res.json(tagData);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
