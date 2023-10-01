/**
 * @swagger
 * tags:
 *   - name: Shop Users RESTful
 *     description: API related to Shop Users
 */

/**
 * @swagger
 * definitions:
 *   ShopUser:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID of the shop user.
 *       shop_id:
 *         type: integer
 *         description: ID of the shop associated with the user.
 *       user_id:
 *         type: integer
 *         description: ID of the user associated with the shop.
 */
const { ShopUser } = require("../models/index");

/**
 * @swagger
 * /api/shop-users:
 *   get:
 *     summary: Get a list of shop users.
 *     description: Get a list of all shop users.
 *     tags:
 *       - Shop Users
 *     responses:
 *       200:
 *         description: A list of shop users.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/ShopUser'
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
    const shopUsers = await ShopUser.findAll();
    return res.json(shopUsers);
  } catch (error) {
    console.error("Error fetching shop users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/shop-users/get-users/{shop_id}:
 *   get:
 *     summary: Get a list of users by shop ID.
 *     description: Get a list of users associated with a shop based on its ID.
 *     tags:
 *       - Shop Users
 *     parameters:
 *       - name: shop_id
 *         in: path
 *         description: The ID of the shop to retrieve users for.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A list of users associated with the shop.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/ShopUser'
 *       404:
 *         description: Error, shop not found.
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
const getUsersByShopId = async (req, res) => {
  try {
    const { shop_id } = req.params;
    const shopUsers = await ShopUser.findAll({ where: { shop_id } });
    return res.json(shopUsers);
  } catch (error) {
    console.error("Error fetching users by shop ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/shop-users/{id}:
 *   get:
 *     summary: Get detailed information about a shop user by ID.
 *     description: Get detailed information about a shop user based on their ID.
 *     tags:
 *       - Shop Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the shop user to retrieve information about.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Detailed information about the shop user.
 *         schema:
 *           $ref: '#/definitions/ShopUser'
 *       404:
 *         description: Error, shop user not found.
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
    const shopUser = await ShopUser.findByPk(id);
    if (!shopUser) {
      return res.status(404).json({ message: "ShopUser not found" });
    }
    return res.json(shopUser);
  } catch (error) {
    console.error(`Error fetching shop user with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/shop-users:
 *   post:
 *     summary: Create a new shop user.
 *     description: Create a new shop user with the necessary information.
 *     tags:
 *       - Shop Users
 *     parameters:
 *       - name: shop_id
 *         in: formData
 *         description: ID of the shop associated with the user.
 *         required: true
 *         type: integer
 *       - name: user_id
 *         in: formData
 *         description: ID of the user associated with the shop.
 *         required: true
 *         type: integer
 *     responses:
 *       201:
 *         description: The new shop user has been successfully created.
 *         schema:
 *           $ref: '#/definitions/ShopUser'
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
    const { shop_id, user_id } = req.body;
    const shopUser = await ShopUser.create({
      shop_id,
      user_id,
    });
    return res.json(shopUser);
  } catch (error) {
    console.error("Error creating shop user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/shop-users/{id}:
 *   put:
 *     summary: Update an existing shop user by ID.
 *     description: Update an existing shop user's information based on their ID.
 *     tags:
 *       - Shop Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the shop user to update.
 *         required: true
 *         type: integer
 *       - name: shop_id
 *         in: formData
 *         description: New ID of the shop associated with the user.
 *         required: true
 *         type: integer
 *       - name: user_id
 *         in: formData
 *         description: New ID of the user associated with the shop.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The shop user has been successfully updated.
 *         schema:
 *           $ref: '#/definitions/ShopUser'
 *       404:
 *         description: Error, shop user not found.
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
    const { shop_id, user_id } = req.body;

    const existingShopUser = await ShopUser.findByPk(id);

    if (!existingShopUser) {
      return res.status(404).json({ message: "ShopUser not found" });
    }

    existingShopUser.shop_id = shop_id;
    existingShopUser.user_id = user_id;

    await existingShopUser.save();

    return res.json(existingShopUser);
  } catch (error) {
    console.error(`Error updating shop user with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/shop-users/{id}:
 *   delete:
 *     summary: Delete a shop user by ID.
 *     description: Delete a shop user based on their ID.
 *     tags:
 *       - Shop Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the shop user to delete.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The shop user has been successfully deleted.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Error, shop user not found.
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
    const deletedShopUser = await ShopUser.findByPk(id);

    if (!deletedShopUser) {
      return res.status(404).json({ message: "ShopUser not found" });
    }

    await deletedShopUser.destroy();

    return res.json({ message: "ShopUser deleted successfully" });
  } catch (error) {
    console.error(`Error deleting shop user with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  findAll,
  getUsersByShopId,
  findById,
  create,
  update,
  remove,
};
