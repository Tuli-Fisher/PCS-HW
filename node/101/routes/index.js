import express from "express";
//import nocache from 'nocache';
import pool from "../pool.js";
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const [results] = await /*global*/ /*.connection*/ pool./*query*/ execute(
      "SELECT * FROM nodecontacts",
    );

    res.render("layout", {
      title: "Contact List",
      contacts: results,
      noContacts: !results?.length,
      partials: { content: "index" },
    });
  } catch (err) {
    return next(err);
  }
});

router
  .route("/addContact")
  .get((req, res, next) => {
    res.render("layout", {
      title: "Add Contact",
      partials: { content: "contactForm" },
    });
  })
  .post(async (req, res, next) => {
    // should validate input here
    try {
      const [results] = await /*global*/ /*.connection*/ pool./*query*/ execute(
        `INSERT INTO nodecontacts(first, last, email, phone) VALUES (?,?,?,?)`,
        [req.body.first, req.body.last, req.body.email, req.body.phone],
      );

      res.writeHead(301, {
        location: "/",
      });

      res.end();
    } catch (err) {
      return next(err);
    }
  });

router.param("id", async (req, res, next, id) => {
  try {
    const [results] = await /*global*/ /*.connection*/ pool./*query*/ execute(
      `SELECT id, first, last, email, phone FROM nodecontacts WHERE id = ?`,
      [req.params.id],
    );

    console.log(results);

    if (!results.length) {
      return next(new Error(`contact ${req.params.id} not found`));
    }

    req.contact = results[0];
  } catch (err) {
    return next(err);
  }

  next();
});

router
  .route("/editContact/:id")
  .get((req, res, next) => {
    /*const contact = contacts.find(c => c.id === Number(req.params.id));

    if (!contact) {
      return next(new Error(`contact ${req.params.id} not found`));
    }*/

    res.render("layout", {
      title: "Edit Contact",
      contact: req.contact,
      partials: { content: "contactForm" },
    });
  })
  .post(async (req, res, next) => {
    /*const contact = contacts.find(c => c.id === Number(req.params.id));

    if (!contact) {
      return next(new Error(`contact ${req.params.id} not found`));
    }*/

    // should validate input here
    // Object.assign(req.contact, req.body);

    try {
      const [results] = await /*global*/ /*.connection*/ pool./*query*/ execute(
        `UPDATE nodecontacts SET first = ?, last = ?, email = ?, phone  = ? WHERE id = ?`,
        [
          req.body.first,
          req.body.last,
          req.body.email,
          req.body.phone,
          req.params.id,
        ],
      );

      if (!results.changedRows) {
        next(new Error(`contact ${req.params.id} not found`));
      }

      res.writeHead(301, {
        location: "/",
      });

      res.end();
    } catch (err) {
      return next(err);
    }
  });

/*router.post('/deleteContact/:id', (req, res, next) => {
  contacts = contacts.filter(c => c.id !== Number(req.params.id));

  res.writeHead(301, {
    location: '/'
  });

  res.end();
});*/

router.get(
  "/deleteContact/:id",
  /*nocache(),*/ async (req, res, next) => {
    // should check for contact existance here and return error if not
    // contacts = contacts.filter(c => c.id !== Number(req.params.id));

    //res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    try {
      const [results] = await /*global*/ /*.connection*/ pool./*query*/ execute(
        `DELETE FROM nodecontacts WHERE id = ?`,
        [req.params.id],
      );

      console.log(results);
      if (!results.affectedRows) {
        next(new Error(`contact ${req.params.id} not found`));
      }

      res.writeHead(/*302*/ 301, {
        location: "/",
      });

      res.end();
    } catch (err) {
      return next(err);
    }
  },
);

router.route("/api/contacts").get(async (req, res, next) => {
  try {
    const [results] = await /*global*/ /*.connection*/ pool./*query*/ execute(
      "SELECT * FROM nodecontacts",
    );

    res.json(results);
  } catch (err) {
    return res.sendStatus(500).json({ error: err.message });
  }
});

router.route("/api/contacts/:id").get(async (req, res, next) => {
  try {
    const [results] = await pool.execute(
      "SELECT * FROM nodecontacts WHERE id = ?",
      [req.params.id],
    );

    res.json(results);
  } catch (err) {
     res.status(500).json({error: 'there was an error retrieving this contact, are you sure it exists?'});
  }
});

export default router;
