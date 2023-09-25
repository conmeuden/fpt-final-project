/**
 * @swagger
 * tags:
 *   - name: Ratings RESTful
 *     description: API related to Ratings
 */

/**
 * @swagger
 * definitions:
 *   Rating:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID of the rating.
 *       product_id:
 *         type: integer
 *         description: ID of the product being rated.
 *       star:
 *         type: integer
 *         description: Star rating (1 to 5).
 *       comment:
 *         type: string
 *         description: Comment or review text.
 *       user_id:
 *         type: integer
 *         description: ID of the user who created the rating.
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Timestamp when the rating was created.
 *       status:
 *         type: integer
 *         description: The status of the rating (1 - Active, 0 - Inactive).
 */
const { Rating } = require("../models"); // Import model Rating

/**
 * @swagger
 * /api/ratings:
 *   get:
 *     summary: Get a list of ratings.
 *     description: Get a list of all ratings.
 *     tags:
 *       - Ratings
 *     responses:
 *       200:
 *         description: A list of ratings.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Rating'
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
    const ratings = await Rating.findAll();
    return res.json(ratings);
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/ratings/{id}:
 *   get:
 *     summary: Get detailed information about a rating by ID.
 *     description: Get detailed information about a rating based on its ID.
 *     tags:
 *       - Ratings
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the rating to retrieve information about.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Detailed information about the rating.
 *         schema:
 *           $ref: '#/definitions/Rating'
 *       404:
 *         description: Error, rating not found.
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
    const rating = await Rating.findByPk(id);
    if (!rating) {
      return res.status(404).json({ error: "Rating not found" });
    }
    return res.json(rating);
  } catch (error) {
    console.error(`Error fetching rating with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/ratings:
 *   post:
 *     summary: Create a new rating.
 *     description: Create a new rating with the necessary information.
 *     tags:
 *       - Ratings
 *     parameters:
 *       - name: product_id
 *         in: formData
 *         description: The ID of the product being rated.
 *         required: true
 *         type: integer
 *       - name: star
 *         in: formData
 *         description: Star rating (1 to 5).
 *         required: true
 *         type: integer
 *       - name: comment
 *         in: formData
 *         description: Comment or review text.
 *         type: string
 *       - name: user_id
 *         in: formData
 *         description: ID of the user who created the rating.
 *         required: true
 *         type: integer
 *       - name: created_at
 *         in: formData
 *         description: Timestamp when the rating was created.
 *         type: string
 *         format: date-time
 *       - name: status
 *         in: formData
 *         description: The status of the rating (1 - Active, 0 - Inactive).
 *         required: true
 *         type: integer
 *     responses:
 *       201:
 *         description: The new rating has been successfully created.
 *         schema:
 *           $ref: '#/definitions/Rating'
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
    const { product_id, star, comment, user_id, created_at, status } = req.body;
    const newRating = await Rating.create({
      product_id,
      star,
      comment,
      user_id,
      created_at,
      status,
    });
    return res.status(201).json(newRating);
  } catch (error) {
    console.error("Error creating rating:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/ratings/{id}:
 *   put:
 *     summary: Update an existing rating by ID.
 *     description: Update an existing rating's information based on its ID.
 *     tags:
 *       - Ratings
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the rating to update.
 *         required: true
 *         type: integer
 *       - name: product_id
 *         in: formData
 *         description: The ID of the product being rated.
 *         required: true
 *         type: integer
 *       - name: star
 *         in: formData
 *         description: Star rating (1 to 5).
 *         required: true
 *         type: integer
 *       - name: comment
 *         in: formData
 *         description: Comment or review text.
 *         type: string
 *       - name: user_id
 *         in: formData
 *         description: ID of the user who created the rating.
 *         required: true
 *         type: integer
 *       - name: created_at
 *         in: formData
 *         description: Timestamp when the rating was created.
 *         type: string
 *         format: date-time
 *       - name: status
 *         in: formData
 *         description: The status of the rating (1 - Active, 0 - Inactive).
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The rating has been successfully updated.
 *         schema:
 *           $ref: '#/definitions/Rating'
 *       404:
 *         description: Error, rating not found.
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
  try {
    const rating = await Rating.findByPk(id);
    if (!rating) {
      return res.status(404).json({ error: "Rating not found" });
    }
    const { product_id, star, comment, user_id, created_at, status } = req.body;
    await rating.update({
      product_id,
      star,
      comment,
      user_id,
      created_at,
      status,
    });
    return res.json(rating);
  } catch (error) {
    console.error(`Error updating rating with ID ${id}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/ratings/{id}:
 *   delete:
 *     summary: Delete a rating by ID.
 *     description: Delete a rating based on its ID.
 *     tags:
 *       - Ratings
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the rating to delete.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: The rating has been deleted successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Error, rating not found.
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
    const deletedRowCount = await Rating.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Rating not found" });
    }
    return res.json({ message: "Rating deleted successfully" });
  } catch (error) {
    console.error(`Error deleting rating with ID ${id}:`, error);
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
