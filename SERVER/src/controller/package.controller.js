/**
 * @swagger
 * tags:
 *   - name: Packages RESTful
 *     description: API related to Packages
 */

/**
 * @swagger
 * definitions:
 *   Package:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID of the package.
 *       name:
 *         type: string
 *         description: The name of the package.
 *       price:
 *         type: number
 *         format: float
 *         description: The price of the package.
 *       date:
 *         type: string
 *         format: date
 *         description: The date of the package.
 *       status:
 *         type: integer
 *         description: The status of the package (1 - Active, 0 - Inactive).
 */

const { Package } = require("../models/index");

/**
 * @swagger
 * /api/packages:
 *   get:
 *     summary: Get a list of packages.
 *     description: Get a list of all packages.
 *     tags:
 *       - Packages
 *     responses:
 *       200:
 *         description: A list of packages.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Package'
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
      page: parseInt(page, 10) || 1, // Trang mặc định là 1 nếu không có tham số
      limit: parseInt(limit, 10) || 10, // Giới hạn số mục trên mỗi trang, mặc định là 10 nếu không có tham số
    };

    // Điều kiện tìm kiếm
    const whereCondition = {};

    if (keyword) {
      whereCondition.name = { [Op.like]: `%${keyword}%` };
      // Nếu bạn muốn tìm kiếm theo nhiều trường khác, bạn có thể thêm vào whereCondition tương ứng.
    }

    const packages = await Package.findAndCountAll({
      where: whereCondition,
      offset: (pageOptions.page - 1) * pageOptions.limit,
      limit: pageOptions.limit,
    });

    return res.json({
      page: pageOptions.page,
      limit: pageOptions.limit,
      packages,
    });
  } catch (error) {
    console.error("Error fetching packages:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/packages/{id}:
 *   get:
 *     summary: Get detailed information about a package by ID.
 *     description: Get detailed information about a package based on its ID.
 *     tags:
 *       - Packages
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the package to retrieve information about.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Detailed information about the package.
 *         schema:
 *           $ref: '#/definitions/Package'
 *       404:
 *         description: Error, package not found.
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
    const package = await Package.findByPk(id);

    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }

    return res.json(package);
  } catch (error) {
    console.error(`Error fetching package with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/packages:
 *   post:
 *     summary: Create a new package.
 *     description: Create a new package with the necessary information.
 *     tags:
 *       - Packages
 *     parameters:
 *       - name: name
 *         in: formData
 *         description: The name of the new package.
 *         required: true
 *         type: string
 *       - name: price
 *         in: formData
 *         description: The price of the new package.
 *         required: true
 *         type: number
 *       - name: date
 *         in: formData
 *         description: The date of the new package.
 *         required: true
 *         type: string
 *         format: date
 *       - name: status
 *         in: formData
 *         description: The status of the new package (1 - Active, 0 - Inactive).
 *         required: true
 *         type: integer
 *     responses:
 *       201:
 *         description: The new package has been successfully created.
 *         schema:
 *           $ref: '#/definitions/Package'
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
    const { name, price, date, status } = req.body;
    const newPackage = await Package.create({
      name,
      price,
      date,
      status,
    });
    return res.status(201).json(newPackage);
  } catch (error) {
    console.error("Error creating package:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/packages/{id}:
 *   put:
 *     summary: Update an existing package by ID.
 *     description: Update an existing package's information based on its ID.
 *     tags:
 *       - Packages
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the package to update.
 *         required: true
 *         type: integer
 *       - name: name
 *         in: formData
 *         description: The name of the package.
 *         required: true
 *         type: string
 *       - name: price
 *         in: formData
 *         description: The price of the package.
 *         required: true
 *         type: number
 *       - name: date
 *         in: formData
 *         description: The date of the package.
 *         required: true
 *         type: string
 *         format: date
 *       - name: status
 *         in: formData
 *         description: The status of the package (1 - Active, 0 - Inactive).
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The package has been successfully updated.
 *         schema:
 *           $ref: '#/definitions/Package'
 *       404:
 *         description: Error, package not found.
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
    const { name, price, date, status } = req.body;
    const existingPackage = await Package.findByPk(id);

    if (!existingPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    existingPackage.name = name;
    existingPackage.price = price;
    existingPackage.date = date;
    existingPackage.status = status;

    await existingPackage.save();

    return res.json(existingPackage);
  } catch (error) {
    console.error(`Error updating package with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/packages/{id}:
 *   delete:
 *     summary: Deactivate a package by ID (set status to 0).
 *     description: Deactivate a package by updating its status to "0".
 *     tags:
 *       - Packages
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the package to deactivate.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The package has been marked as deactivated successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Error, package not found.
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
    const updatedRows = await Package.update({ status: 0 }, { where: { id } });

    if (updatedRows[0] === 0) {
      return res.status(404).json({ message: "Package not found" });
    }

    return res.json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error(`Error deleting package with ID ${id}:`, error);
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
