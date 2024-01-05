// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// A Product belongs to a Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// A Category has many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// A Product belongs to many Tags through ProductTag
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

// A Tag belongs to many Products through ProductTag
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

// Export the models
module.exports = { Category, Product, ProductTag, Tag };


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
