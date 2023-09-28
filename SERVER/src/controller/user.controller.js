/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API related to Users
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID của người dùng.
 *       full_name:
 *         type: string
 *         description: Tên đầy đủ của người dùng.
 *       email:
 *         type: string
 *         format: email
 *         description: Địa chỉ email của người dùng.
 *       password:
 *         type: string
 *         description: Mật khẩu của người dùng.
 *       phone_number:
 *         type: string
 *         description: Số điện thoại của người dùng.
 *       address:
 *         type: string
 *         description: Địa chỉ của người dùng.
 *       role:
 *         type: string
 *         description: Vai trò của người dùng (ví dụ: "SALER", "CUSTOMER").
 *       status:
 *         type: integer
 *         description: Trạng thái của người dùng (0 - ngừng hoạt động, 1 - hoạt động).
 */
const userModel = require("../models/user.model");
const { Op } = require("sequelize");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy danh sách người dùng với phân trang và tìm kiếm.
 *     description: Lấy danh sách tất cả người dùng với phân trang và tìm kiếm tùy chọn theo tên đầy đủ.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Số trang cho phân trang.
 *         required: false
 *         type: integer
 *       - name: limit
 *         in: query
 *         description: Số lượng mục trên mỗi trang.
 *         required: false
 *         type: integer
 *       - name: keyword
 *         in: query
 *         description: Từ khóa để tìm kiếm người dùng theo tên đầy đủ.
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Danh sách người dùng với thông tin phân trang.
 *         schema:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             users:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
const findAll = async (req, res) => {
  try {
    const { page, limit, keyword } = req.query;
    const pageOptions = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };

    // Điều kiện tìm kiếm
    const whereCondition = {};

    if (keyword) {
      whereCondition.full_name = { [Op.like]: `%${keyword}%` };
      // Nếu bạn muốn tìm kiếm theo nhiều trường khác, bạn có thể thêm vào whereCondition tương ứng.
    }

    // Tìm kiếm và phân trang
    const users = await userModel.findAndCountAll({
      attributes: { exclude: ["password"] }, // Exclude the 'password' field
      where: whereCondition,
      offset: (pageOptions.page - 1) * pageOptions.limit,
      limit: pageOptions.limit,
    });

    return res.json({
      page: pageOptions.page,
      limit: pageOptions.limit,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết về một người dùng theo ID.
 *     description: Lấy thông tin chi tiết về một người dùng dựa trên ID của họ.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của người dùng cần lấy thông tin.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Thông tin chi tiết về người dùng.
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: Lỗi, không tìm thấy người dùng.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
const findById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
  }
};

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Tạo một người dùng mới.
 *     description: Tạo một người dùng mới với thông tin cần thiết.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: full_name
 *         in: formData
 *         description: Tên đầy đủ của người dùng.
 *         required: true
 *         type: string
 *         example: John Doe
 *       - name: email
 *         in: formData
 *         description: Địa chỉ email của người dùng.
 *         required: true
 *         type: string
 *         format: email
 *         example: john@example.com
 *       - name: password
 *         in: formData
 *         description: Mật khẩu của người dùng.
 *         required: true
 *         type: string
 *         example: mypassword123
 *       - name: phone_number
 *         in: formData
 *         description: Số điện thoại của người dùng.
 *         required: true
 *         type: string
 *         example: 123-456-7890
 *       - name: address
 *         in: formData
 *         description: Địa chỉ của người dùng.
 *         required: true
 *         type: string
 *         example: 123 Main St
 *       - name: role
 *         in: formData
 *         description: Vai trò của người dùng (ví dụ: "SALER", "CUSTOMER").
 *         required: true
 *         type: string
 *         example: CUSTOMER
 *       - name: status
 *         in: formData
 *         description: Trạng thái của người dùng (0 - ngừng hoạt động, 1 - hoạt động).
 *         required: true
 *         type: integer
 *         example: 1
 *     responses:
 *       201:
 *         description: Người dùng mới đã được tạo thành công.
 *         schema:
 *           $ref: '#/definitions/User'
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
const create = async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi tạo người dùng" });
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng hiện có theo ID.
 *     description: Cập nhật thông tin người dùng hiện có dựa trên ID của họ.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của người dùng cần cập nhật.
 *         required: true
 *         type: integer
 *       - name: full_name
 *         in: formData
 *         description: Tên đầy đủ mới của người dùng.
 *         required: true
 *         type: string
 *         example: Jane Doe
 *       - name: email
 *         in: formData
 *         description: Địa chỉ email mới của người dùng.
 *         required: true
 *         type: string
 *         format: email
 *         example: jane@example.com
 *       - name: password
 *         in: formData
 *         description: Mật khẩu mới của người dùng.
 *         required: true
 *         type: string
 *         example: newpassword123
 *       - name: phone_number
 *         in: formData
 *         description: Số điện thoại mới của người dùng.
 *         required: true
 *         type: string
 *         example: 987-654-3210
 *       - name: address
 *         in: formData
 *         description: Địa chỉ mới của người dùng.
 *         required: true
 *         type: string
 *         example: 456 Elm St
 *       - name: role
 *         in: formData
 *         description: Vai trò mới của người dùng (ví dụ: "SALER", "CUSTOMER").
 *         required: true
 *         type: string
 *         example: SALER
 *       - name: status
 *         in: formData
 *         description: Trạng thái mới của người dùng (0 - ngừng hoạt động, 1 - hoạt động).
 *         required: true
 *         type: integer
 *         example: 0
 *     responses:
 *       200:
 *         description: Cập nhật thông tin người dùng thành công.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Lỗi, không tìm thấy người dùng.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
const update = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    await user.update(req.body);
    res.json({ message: "Cập nhật người dùng thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật người dùng" });
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Xóa một người dùng theo ID (thiết lập trạng thái = 0 thay vì xóa).
 *     description: Xóa một người dùng theo ID (thiết lập trạng thái = 0 thay vì xóa).
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của người dùng cần xóa hoặc ngưng hoạt động.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Người dùng đã bị xóa hoặc ngưng hoạt động thành công.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Lỗi, không tìm thấy người dùng.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedRows = await userModel.update(
      { status: 0 },
      { where: { id } }
    );
    if (updatedRows[0] === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa người dùng" });
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
