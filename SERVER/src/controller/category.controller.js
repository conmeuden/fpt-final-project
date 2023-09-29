/**
 * @swagger
 * tags:
 *   - name: Categories RESTful
 *     description: API related to Categories
 */

/**
 * @swagger
 * definitions:
 *   Category:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID of the category.
 *       name:
 *         type: string
 *         description: Name of the category.
 *       shop_id:
 *         type: integer
 *         description: ID of the shop that the category belongs to.
 *       status:
 *         type: integer
 *         description: Status of the category (e.g., active, inactive).
 */
const { Category } = require("../models/index");

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get a list of categories with pagination and search.
 *     description: Get a list of all categories with the ability to paginate and search by keyword.
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number to retrieve (default is 1).
 *         required: false
 *         type: integer
 *       - name: limit
 *         in: query
 *         description: The number of categories per page (default is 10).
 *         required: false
 *         type: integer
 *       - name: keyword
 *         in: query
 *         description: The keyword to search for in category names.
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: A list of found categories.
 *         schema:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             categories:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Category'
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
const findAll = async (req, res) => {
  try {
    const { page, limit, keyword, status } = req.query;
    const pageOptions = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };

    const whereCondition = {};

    if (keyword) {
      whereCondition.name = { [Op.like]: `%${keyword}%` };
    }

    if (status) {
      whereCondition.status = { [Op.like]: `%${status}%` };
    }

    const categories = await Category.findAndCountAll({
      where: whereCondition,
      offset: (pageOptions.page - 1) * pageOptions.limit,
      limit: pageOptions.limit,
    });

    return res.json({
      page: pageOptions.page,
      limit: pageOptions.limit,
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get detailed information about a category by ID.
 *     description: Get detailed information about a category based on its ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the category to retrieve information about.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Detailed information about the category.
 *         schema:
 *           $ref: '#/definitions/Category'
 *       404:
 *         description: Error, category not found.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.json(category);
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category.
 *     description: Create a new category with the necessary information.
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: name
 *         in: formData
 *         description: The name of the new category.
 *         required: true
 *         type: string
 *       - name: shop_id
 *         in: formData
 *         description: The ID of the shop to which the category belongs.
 *         required: true
 *         type: integer
 *       - name: status
 *         in: formData
 *         description: The status of the category (1 - Active, 0 - Inactive).
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The new category has been successfully created.
 *         schema:
 *           $ref: '#/definitions/Category'
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
const create = async (req, res) => {
  try {
    const firstShopId = req.user.shops[0].id;
    const { name, status } = req.body;
    const category = await Category.create({
      name,
      shop_id: firstShopId,
      status,
    });
    return res.json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update category information by ID.
 *     description: Update information of a category based on its ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the category to update information.
 *         required: true
 *         type: integer
 *       - name: name
 *         in: formData
 *         description: The name of the category to update.
 *         required: true
 *         type: string
 *       - name: shop_id
 *         in: formData
 *         description: The ID of the shop to which the category belongs.
 *         required: true
 *         type: integer
 *       - name: status
 *         in: formData
 *         description: The status of the category (1 - Active, 0 - Inactive).
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Category information has been successfully updated.
 *         schema:
 *           $ref: '#/definitions/Category'
 *       404:
 *         description: Error, category not found.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, shop_id, status } = req.body;

    const existingCategory = await Category.findByPk(id);

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    existingCategory.name = name;
    existingCategory.shop_id = shop_id;
    existingCategory.status = status;

    await existingCategory.save();

    return res.json(existingCategory);
  } catch (error) {
    console.error(`Error updating category with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID.
 *     description: Mark a category as deleted by updating its status to "0".
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the category to delete.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The category has been marked as deleted successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Error, category not found.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRows = await Category.update({ status: 0 }, { where: { id } });

    if (updatedRows[0] === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(`Error deleting category with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
