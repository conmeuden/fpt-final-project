/**
 * @swagger
 * tags:
 *   - name: Industries RESTful
 *     description: API related to Industries
 */

/**
 * @swagger
 * definitions:
 *   Industry:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID of the industry.
 *       name:
 *         type: string
 *         description: The name of the industry.
 *       icon:
 *         type: string
 *         description: The icon representing the industry.
 *       status:
 *         type: integer
 *         description: The status of the industry (1 - Active, 0 - Inactive).
 */
const Industry = require("../models/industry.model");
const { Op } = require("sequelize");

/**
 * @swagger
 * /api/industries:
 *   get:
 *     summary: Get a list of industries with pagination and search.
 *     description: Get a list of all industries with the ability to paginate and search by keyword.
 *     tags:
 *       - Industries
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number to retrieve (default is 1).
 *         required: false
 *         type: integer
 *       - name: limit
 *         in: query
 *         description: The number of industries per page (default is 10).
 *         required: false
 *         type: integer
 *       - name: keyword
 *         in: query
 *         description: The keyword to search for in industry names.
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: A list of found industries.
 *         schema:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             industries:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Industry'
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

    // Tìm kiếm, phân trang và trả về kết quả
    const industries = await Industry.findAndCountAll({
      where: whereCondition,
      offset: (pageOptions.page - 1) * pageOptions.limit,
      limit: pageOptions.limit,
    });

    return res.json({
      page: pageOptions.page,
      limit: pageOptions.limit,
      industries,
    });
  } catch (error) {
    console.error("Error fetching industries:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/industries/{id}:
 *   get:
 *     summary: Get detailed information about an industry by ID.
 *     description: Get detailed information about an industry based on its ID.
 *     tags:
 *       - Industries
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the industry to retrieve information about.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Detailed information about the industry.
 *         schema:
 *           $ref: '#/definitions/Industry'
 *       404:
 *         description: Error, industry not found.
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
  const { id } = req.params;
  try {
    const industry = await Industry.findByPk(id);
    if (!industry) {
      return res.status(404).json({ error: "Industry not found" });
    }
    return res.json(industry);
  } catch (error) {
    console.error(`Error fetching industry with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/industries:
 *   post:
 *     summary: Create a new industry.
 *     description: Create a new industry with the necessary information.
 *     tags:
 *       - Industries
 *     parameters:
 *       - name: name
 *         in: formData
 *         description: The name of the new industry.
 *         required: true
 *         type: string
 *       - name: icon
 *         in: formData
 *         description: The icon representing the industry.
 *         required: true
 *         type: string
 *       - name: status
 *         in: formData
 *         description: The status of the industry (1 - Active, 0 - Inactive).
 *         required: true
 *         type: integer
 *     responses:
 *       201:
 *         description: The new industry has been successfully created.
 *         schema:
 *           $ref: '#/definitions/Industry'
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
const create = async (req, res) => {
  const { name, icon, status } = req.body;
  try {
    const industry = await Industry.create({ name, icon, status });
    return res.json(industry);
  } catch (error) {
    console.error("Error creating industry:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/industries/{id}:
 *   put:
 *     summary: Update an existing industry by ID.
 *     description: Update an existing industry's information based on its ID.
 *     tags:
 *       - Industries
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the industry to update.
 *         required: true
 *         type: integer
 *       - name: name
 *         in: formData
 *         description: The name of the industry.
 *         required: true
 *         type: string
 *       - name: icon
 *         in: formData
 *         description: The icon representing the industry.
 *         required: true
 *         type: string
 *       - name: status
 *         in: formData
 *         description: The status of the industry (1 - Active, 0 - Inactive).
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The industry has been successfully updated.
 *         schema:
 *           $ref: '#/definitions/Industry'
 *       404:
 *         description: Error, industry not found.
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
  const { id } = req.params;
  const { name, icon, status } = req.body;
  try {
    const industry = await Industry.findByPk(id);
    if (!industry) {
      return res.status(404).json({ error: "Industry not found" });
    }
    industry.name = name;
    industry.icon = icon;
    industry.status = status;
    await industry.save();
    return res.json(industry);
  } catch (error) {
    console.error(`Error updating industry with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/industries/{id}:
 *   delete:
 *     summary: Deactivate an industry by ID (set status to 0).
 *     description: Deactivate an industry by updating its status to "0".
 *     tags:
 *       - Industries
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the industry to deactivate.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The industry has been marked as deactivated successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Error, industry not found.
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
  const { id } = req.params;
  try {
    const industry = await Industry.findByPk(id);
    if (!industry) {
      return res.status(404).json({ error: "Industry not found" });
    }

    // Thay vì xóa mục, hãy cập nhật trường status thành 0
    industry.status = 0;
    await industry.save();

    return res.json({ message: "Industry marked as deleted" });
  } catch (error) {
    console.error(`Error marking industry with ID ${id} as deleted:`, error);
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
