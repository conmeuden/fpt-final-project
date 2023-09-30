/**
 * @swagger
 * tags:
 *   - name: Suppliers RESTful
 *     description: API related to Suppliers
 */

/**
 * @swagger
 * definitions:
 *   Supplier:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID of the supplier.
 *       name:
 *         type: string
 *         description: Name of the supplier.
 *       address:
 *         type: string
 *         description: Address of the supplier.
 *       shop_id:
 *         type: integer
 *         description: ID of the shop associated with the supplier.
 *       phone_number:
 *         type: string
 *         description: Phone number of the supplier.
 *       debt:
 *         type: number
 *         description: Debt amount of the supplier.
 *       status:
 *         type: integer
 *         description: Status of the supplier (0 - deactivated, 1 - active).
 */
const { Op } = require("sequelize");
const { Supplier } = require("../models"); // Import model Supplier

/**
 * @swagger
 * /api/suppliers:
 *   get:
 *     summary: Get a list of suppliers with pagination and search.
 *     description: Get a list of all suppliers with pagination and optional keyword search.
 *     tags:
 *       - Suppliers
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number for pagination.
 *         required: false
 *         type: integer
 *       - name: limit
 *         in: query
 *         description: The number of items per page.
 *         required: false
 *         type: integer
 *       - name: keyword
 *         in: query
 *         description: The keyword to search for suppliers by name.
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: A list of suppliers with pagination information.
 *         schema:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             suppliers:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Supplier'
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
    const pageOptions = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };

    const whereCondition = {};

    if (keyword) {
      whereCondition.name = { [Op.like]: `%${keyword}%` };
    }

    const suppliers = await Supplier.findAndCountAll({
      where: whereCondition,
      offset: (pageOptions.page - 1) * pageOptions.limit,
      limit: pageOptions.limit,
    });

    return res.json({
      page: pageOptions.page,
      limit: pageOptions.limit,
      suppliers,
    });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/suppliers/{id}:
 *   get:
 *     summary: Get detailed information about a supplier by ID.
 *     description: Get detailed information about a supplier based on their ID.
 *     tags:
 *       - Suppliers
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the supplier to retrieve information about.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Detailed information about the supplier.
 *         schema:
 *           $ref: '#/definitions/Supplier'
 *       404:
 *         description: Error, supplier not found.
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
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    return res.json(supplier);
  } catch (error) {
    console.error(`Error fetching supplier with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/suppliers:
 *   post:
 *     summary: Create a new supplier.
 *     description: Create a new supplier with the necessary information.
 *     tags:
 *       - Suppliers
 *     parameters:
 *       - name: name
 *         in: formData
 *         description: Name of the supplier.
 *         required: true
 *         type: string
 *       - name: address
 *         in: formData
 *         description: Address of the supplier.
 *         required: true
 *         type: string
 *       - name: shop_id
 *         in: formData
 *         description: ID of the shop associated with the supplier.
 *         required: true
 *         type: integer
 *       - name: phone_number
 *         in: formData
 *         description: Phone number of the supplier.
 *         required: true
 *         type: string
 *       - name: debt
 *         in: formData
 *         description: Debt amount of the supplier.
 *         required: true
 *         type: number
 *       - name: status
 *         in: formData
 *         description: Status of the supplier (0 - deactivated, 1 - active).
 *         required: true
 *         type: integer
 *     responses:
 *       201:
 *         description: The new supplier has been successfully created.
 *         schema:
 *           $ref: '#/definitions/Supplier'
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
    const { name, address, shop_id, phone_number, debt, status } = req.body;
    const newSupplier = await Supplier.create({
      name,
      address,
      shop_id,
      phone_number,
      debt,
      status,
    });
    return res.status(201).json(newSupplier);
  } catch (error) {
    console.error("Error creating supplier:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/suppliers/{id}:
 *   put:
 *     summary: Update an existing supplier by ID.
 *     description: Update an existing supplier's information based on their ID.
 *     tags:
 *       - Suppliers
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the supplier to update.
 *         required: true
 *         type: integer
 *       - name: name
 *         in: formData
 *         description: New name of the supplier.
 *         required: true
 *         type: string
 *       - name: address
 *         in: formData
 *         description: New address of the supplier.
 *         required: true
 *         type: string
 *       - name: shop_id
 *         in: formData
 *         description: New ID of the shop associated with the supplier.
 *         required: true
 *         type: integer
 *       - name: phone_number
 *         in: formData
 *         description: New phone number of the supplier.
 *         required: true
 *         type: string
 *       - name: debt
 *         in: formData
 *         description: New debt amount of the supplier.
 *         required: true
 *         type: number
 *       - name: status
 *         in: formData
 *         description: New status of the supplier (0 - deactivated, 1 - active).
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The supplier has been successfully updated.
 *         schema:
 *           $ref: '#/definitions/Supplier'
 *       404:
 *         description: Error, supplier not found.
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
    const { name, address, shop_id, phone_number, debt, status } = req.body;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    await supplier.update({
      name,
      address,
      shop_id,
      phone_number,
      debt,
      status,
    });

    return res.json(supplier);
  } catch (error) {
    console.error(`Error updating supplier with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/suppliers/{id}:
 *   delete:
 *     summary: Deactivate a supplier by ID.
 *     description: Deactivate a supplier based on their ID by setting the status to 0.
 *     tags:
 *       - Suppliers
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the supplier to deactivate.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The supplier has been successfully deactivated.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Error, supplier not found.
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
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    await supplier.update({ status: 0 });

    return res.json({ message: "Supplier deactivated successfully" });
  } catch (error) {
    console.error(`Error deactivating supplier with ID ${id}:`, error);
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
