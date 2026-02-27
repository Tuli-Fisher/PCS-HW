import express, { Router } from "express";
import pool from "../pool.js";
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const [results] = await pool.execute("SELECT * FROM recipes");
    res.json(results);
  } catch (err) {
    return res.sendStatus(500).json({ error: err.message });
  }
});

router
  .route("/recipe/:id")
  .get(async (req, res, next) => {
    try {
      const query1 = ` SELECT r.id, r.name,  r.url, d.step_number, d.instruction
        FROM recipes r
        LEFT JOIN directions d
            ON r.id = d.recipe_id
        WHERE r.id = ?
        ORDER BY d.step_number`;

      //const query2 = "SELECT * FROM recipes Where id = ?";

      const [results] = await pool.execute(query1, [req.params.id]);

      if (results.length === 0) {
        throw new Error("Recipe not found");
      }

      const recipe = {
        id: results[0].id,
        name: results[0].name,
        url: results[0].url,
        directions: [],
      };

      results.forEach((row) => {
        if (row.instruction) {
          recipe.directions.push({
            step_number: row.step_number,
            instruction: row.instruction,
          });
        }
      });
      res.json(recipe);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  })
  .delete(async (req, res, next) => {
    try {
      const [results] = await pool.execute("DELETE FROM recipes WHERE id = ?", [
        req.params.id,
      ]);

      if (!results.affectedRows) {
        res.statusCode = 404;
        return res.send(`Cant find recipe ${req.params.id}`);
      }

      res.sendStatus(204);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  })
  .put(async (req, res, next) => {
    try {
      const [results] = await pool.execute("UPDATE recipes SET name =?, url=? WHERE id = ?", [
        req.body.name, req.body.url, req.params.id,
      ]);

     if (!results.affectedRows) {
        res.statusCode = 404;
        return res.send(`Cant find recipe ${req.params.id}`);
      }

      res.sendStatus(204);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });


export default router;
