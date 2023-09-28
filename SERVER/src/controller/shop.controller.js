/**
 * @swagger
 * tags:
 *   - name: Shops RESTful
 *     description: API related to Shops
 */

/**
 * @swagger
 * definitions:
 *   Shop:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID of the shop.
 *       name:
 *         type: string
 *         description: Name of the shop.
 *       user_id:
 *         type: integer
 *         description: ID of the user associated with the shop.
 *       package_id:
 *         type: integer
 *         description: ID of the package associated with the shop.
 *       logo:
 *         type: string
 *         description: Logo URL of the shop.
 *       description:
 *         type: string
 *         description: Description of the shop.
 *       address:
 *         type: string
 *         description: Address of the shop.
 *       phone_number:
 *         type: string
 *         description: Phone number of the shop.
 *       status:
 *         type: integer
 *         description: The status of the shop (1 - Active, 0 - Inactive).
 */
const { Shop } = require("../models/index");
const { Op } = require("sequelize");

/**
 * @swagger
 * /api/shops:
 *   get:
 *     summary: Get a list of shops.
 *     description: Get a list of all shops.
 *     tags:
 *       - Shops
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default: 1).
 *         required: false
 *         type: integer
 *       - name: limit
 *         in: query
 *         description: Number of shops to retrieve per page (default: 10).
 *         required: false
 *         type: integer
 *       - name: keyword
 *         in: query
 *         description: Keyword for searching shop names (default: "").
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: A list of shops.
 *         schema:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             shops:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Shop'
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
    const { page = 1, limit = 10, keyword = "" } = req.query;

    const whereCondition = {};

    if (keyword) {
      whereCondition.name = { [Op.like]: `%${keyword}%` };
      // Nếu bạn muốn tìm kiếm theo nhiều trường khác, bạn có thể thêm vào whereCondition tương ứng.
    }

    // Sử dụng phân trang và điều kiện tìm kiếm
    const shops = await Shop.findAndCountAll({
      where: whereCondition,
      offset: (page - 1) * limit,
      limit: parseInt(limit),
    });

    return res.json({
      page,
      limit,
      shops,
    });
  } catch (error) {
    console.error("Error fetching shops:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/shops/{id}:
 *   get:
 *     summary: Get detailed information about a shop by ID.
 *     description: Get detailed information about a shop based on its ID.
 *     tags:
 *       - Shops
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the shop to retrieve information about.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Detailed information about the shop.
 *         schema:
 *           $ref: '#/definitions/Shop'
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
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findByPk(id);

    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    return res.json(shop);
  } catch (error) {
    console.error(`Error fetching shop with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/shops:
 *   post:
 *     summary: Create a new shop.
 *     description: Create a new shop with the necessary information.
 *     tags:
 *       - Shops
 *     parameters:
 *       - name: name
 *         in: formData
 *         description: Name of the shop.
 *         required: true
 *         type: string
 *       - name: user_id
 *         in: formData
 *         description: ID of the user associated with the shop.
 *         required: true
 *         type: integer
 *       - name: package_id
 *         in: formData
 *         description: ID of the package associated with the shop.
 *         required: true
 *         type: integer
 *       - name: logo
 *         in: formData
 *         description: Logo URL of the shop.
 *         type: string
 *       - name: description
 *         in: formData
 *         description: Description of the shop.
 *         type: string
 *       - name: address
 *         in: formData
 *         description: Address of the shop.
 *         type: string
 *       - name: phone_number
 *         in: formData
 *         description: Phone number of the shop.
 *         type: string
 *       - name: status
 *         in: formData
 *         description: The status of the shop (1 - Active, 0 - Inactive).
 *         required: true
 *         type: integer
 *     responses:
 *       201:
 *         description: The new shop has been successfully created.
 *         schema:
 *           $ref: '#/definitions/Shop'
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
    const {
      name,
      user_id,
      package_id,
      logo,
      description,
      address,
      phone_number,
      status,
    } = req.body;
    const newShop = await Shop.create({
      name,
      user_id,
      package_id,
      logo,
      created_at: new Date(),
      description,
      address,
      phone_number,
      status,
    });
    return res.status(201).json(newShop);
  } catch (error) {
    console.error("Error creating shop:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/shops/{id}:
 *   put:
 *     summary: Update an existing shop by ID.
 *     description: Update an existing shop's information based on its ID.
 *     tags:
 *       - Shops
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the shop to update.
 *         required: true
 *         type: integer
 *       - name: name
 *         in: formData
 *         description: New name for the shop.
 *         required: true
 *         type: string
 *       - name: user_id
 *         in: formData
 *         description: New ID of the user associated with the shop.
 *         required: true
 *         type: integer
 *       - name: package_id
 *         in: formData
 *         description: New ID of the package associated with the shop.
 *         required: true
 *         type: integer
 *       - name: logo
 *         in: formData
 *         description: New logo URL of the shop.
 *         type: string
 *       - name: description
 *         in: formData
 *         description: New description of the shop.
 *         type: string
 *       - name: address
 *         in: formData
 *         description: New address of the shop.
 *         type: string
 *       - name: phone_number
 *         in: formData
 *         description: New phone number of the shop.
 *         type: string
 *       - name: status
 *         in: formData
 *         description: New status of the shop (1 - Active, 0 - Inactive).
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The shop has been successfully updated.
 *         schema:
 *           $ref: '#/definitions/Shop'
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
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      user_id,
      package_id,
      logo,
      description,
      address,
      phone_number,
      status,
    } = req.body;
    const existingShop = await Shop.findByPk(id);

    if (!existingShop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    existingShop.name = name;
    existingShop.user_id = user_id;
    existingShop.package_id = package_id;
    existingShop.logo = logo;
    existingShop.description = description;
    existingShop.address = address;
    existingShop.phone_number = phone_number;
    existingShop.status = status;

    await existingShop.save();

    return res.json(existingShop);
  } catch (error) {
    console.error(`Error updating shop with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/shops/{id}:
 *   delete:
 *     summary: Delete a shop by ID.
 *     description: Delete a shop based on its ID (sets status to 0).
 *     tags:
 *       - Shops
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the shop to delete.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The shop has been successfully deleted.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
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
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRows = await Shop.update({ status: 0 }, { where: { id } });

    if (updatedRows[0] === 0) {
      return res.status(404).json({ error: "Shop not found" });
    }

    return res.json({ message: "Shop deleted successfully" });
  } catch (error) {
    console.error(`Error deleting shop with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
