/**
 * @swagger
 * tags:
 *   - name: Coupons RESTful
 *     description: API related to Coupons
 */
/**
 * @swagger
 * definitions:
 *   Coupon:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID of the coupon.
 *       shop_id:
 *         type: integer
 *         description: ID of the shop associated with the coupon.
 *       code:
 *         type: string
 *         description: The coupon code.
 *       type:
 *         type: string
 *         description: The type of the coupon (e.g., percentage, fixed amount).
 *       effect_at:
 *         type: date
 *         description: The date when the coupon becomes effective.
 *       expire_at:
 *         type: date
 *         description: The expiration date of the coupon.
 *       discount_amount:
 *         type: number
 *         description: The discount amount applied by the coupon.
 *       minimum_purchase_amount:
 *         type: number
 *         description: The minimum purchase amount required to use the coupon.
 *       max_usage_count:
 *         type: integer
 *         description: The maximum number of times the coupon can be used.
 *       status:
 *         type: integer
 *         description: The status of the coupon (1 - Active, 0 - Inactive).
 */
const { Op } = require("sequelize");
const { Coupon } = require("../models"); // Import model Coupon

/**
 * @swagger
 * /api/coupons:
 *   get:
 *     summary: Get a list of coupons with pagination and search.
 *     description: Get a list of all coupons with the ability to paginate and search by keyword.
 *     tags:
 *       - Coupons
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number to retrieve (default is 1).
 *         required: false
 *         type: integer
 *       - name: limit
 *         in: query
 *         description: The number of coupons per page (default is 10).
 *         required: false
 *         type: integer
 *       - name: keyword
 *         in: query
 *         description: The keyword to search for in coupon codes.
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: A list of found coupons.
 *         schema:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             coupons:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Coupon'
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
      whereCondition.code = { [Op.like]: `%${keyword}%` };
    }

    const coupons = await Coupon.findAndCountAll({
      where: whereCondition,
      offset: (pageOptions.page - 1) * pageOptions.limit,
      limit: pageOptions.limit,
    });

    return res.json({
      page: pageOptions.page,
      limit: pageOptions.limit,
      coupons,
    });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/coupons/{id}:
 *   get:
 *     summary: Get detailed information about a coupon by ID.
 *     description: Get detailed information about a coupon based on its ID.
 *     tags:
 *       - Coupons
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the coupon to retrieve information about.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Detailed information about the coupon.
 *         schema:
 *           $ref: '#/definitions/Coupon'
 *       404:
 *         description: Error, coupon not found.
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
    const coupon = await Coupon.findByPk(id);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    return res.json(coupon);
  } catch (error) {
    console.error(`Error fetching coupon with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/coupons/code/{code}:
 *   get:
 *     summary: Get detailed information about a coupon by code.
 *     description: Get detailed information about a coupon based on its code.
 *     tags:
 *       - Coupons
 *     parameters:
 *       - name: code
 *         in: path
 *         description: The code of the coupon to retrieve information about.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Detailed information about the coupon.
 *         schema:
 *           $ref: '#/definitions/Coupon'
 *       404:
 *         description: Error, coupon not found.
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
const findByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const coupon = await Coupon.findOne({ where: { code } });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    return res.json(coupon);
  } catch (error) {
    console.error(`Error fetching coupon with code ${code}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/coupons:
 *   post:
 *     summary: Create a new coupon.
 *     description: Create a new coupon with the necessary information.
 *     tags:
 *       - Coupons
 *     parameters:
 *       - name: shop_id
 *         in: formData
 *         description: The ID of the shop to which the coupon belongs.
 *         required: true
 *         type: integer
 *       - name: code
 *         in: formData
 *         description: The code of the new coupon.
 *         required: true
 *         type: string
 *       - name: type
 *         in: formData
 *         description: The type of the coupon (e.g., percentage, fixed amount).
 *         required: true
 *         type: string
 *       - name: effect_at
 *         in: formData
 *         description: The date when the coupon becomes effective.
 *         required: true
 *         type: date
 *       - name: expire_at
 *         in: formData
 *         description: The expiration date of the coupon.
 *         required: true
 *         type: date
 *       - name: discount_amount
 *         in: formData
 *         description: The discount amount applied by the coupon.
 *         required: true
 *         type: number
 *       - name: minimum_purchase_amount
 *         in: formData
 *         description: The minimum purchase amount required to use the coupon.
 *         required: true
 *         type: number
 *       - name: max_usage_count
 *         in: formData
 *         description: The maximum number of times the coupon can be used.
 *         required: true
 *         type: integer
 *       - name: status
 *         in: formData
 *         description: The status of the coupon (1 - Active, 0 - Inactive).
 *         required: true
 *         type: integer
 *     responses:
 *       201:
 *         description: The new coupon has been successfully created.
 *         schema:
 *           $ref: '#/definitions/Coupon'
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
      shop_id,
      code,
      type,
      effect_at,
      expire_at,
      discount_amount,
      minimum_purchase_amount,
      max_usage_count,
      status,
    } = req.body;

    const newCoupon = await Coupon.create({
      shop_id,
      code,
      type,
      effect_at,
      expire_at,
      discount_amount,
      minimum_purchase_amount,
      max_usage_count,
      status,
    });

    return res.status(201).json(newCoupon);
  } catch (error) {
    console.error("Error creating coupon:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/coupons/{id}:
 *   put:
 *     summary: Update an existing coupon by ID.
 *     description: Update an existing coupon's information based on its ID.
 *     tags:
 *       - Coupons
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the coupon to update.
 *         required: true
 *         type: integer
 *       - name: shop_id
 *         in: formData
 *         description: The ID of the shop to which the coupon belongs.
 *         required: true
 *         type: integer
 *       - name: code
 *         in: formData
 *         description: The code of the coupon.
 *         required: true
 *         type: string
 *       - name: type
 *         in: formData
 *         description: The type of the coupon (e.g., percentage, fixed amount).
 *         required: true
 *         type: string
 *       - name: effect_at
 *         in: formData
 *         description: The date when the coupon becomes effective.
 *         required: true
 *         type: date
 *       - name: expire_at
 *         in: formData
 *         description: The expiration date of the coupon.
 *         required: true
 *         type: date
 *       - name: discount_amount
 *         in: formData
 *         description: The discount amount applied by the coupon.
 *         required: true
 *         type: number
 *       - name: minimum_purchase_amount
 *         in: formData
 *         description: The minimum purchase amount required to use the coupon.
 *         required: true
 *         type: number
 *       - name: max_usage_count
 *         in: formData
 *         description: The maximum number of times the coupon can be used.
 *         required: true
 *         type: integer
 *       - name: status
 *         in: formData
 *         description: The status of the coupon (1 - Active, 0 - Inactive).
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The coupon has been successfully updated.
 *         schema:
 *           $ref: '#/definitions/Coupon'
 *       404:
 *         description: Error, coupon not found.
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
      shop_id,
      code,
      type,
      effect_at,
      expire_at,
      discount_amount,
      minimum_purchase_amount,
      max_usage_count,
      status,
    } = req.body;

    const coupon = await Coupon.findByPk(id);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    await coupon.update({
      shop_id,
      code,
      type,
      effect_at,
      expire_at,
      discount_amount,
      minimum_purchase_amount,
      max_usage_count,
      status,
    });

    return res.json(coupon);
  } catch (error) {
    console.error(`Error updating coupon with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/coupons/{id}:
 *   delete:
 *     summary: Deactivate a coupon by ID (set status to 0).
 *     description: Deactivate a coupon by updating its status to "0".
 *     tags:
 *       - Coupons
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the coupon to deactivate.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The coupon has been marked as deactivated successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Error, coupon not found.
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
    const coupon = await Coupon.findByPk(id);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    await coupon.update({ status: 0 });

    return res.json({ message: "Coupon deactivated successfully" });
  } catch (error) {
    console.error(`Error deactivating coupon with ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  findAll,
  findByCode,
  findById,
  create,
  update,
  remove,
};
