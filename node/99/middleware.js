import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  res.end("hello world with express");
});

app.use((req, res, next) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).send("invalid query parameters");
  }

  if (!isNaN(a) && !isNaN(b)) {
    req.a = a;
    req.b = b;
    next();
  }
});

app.get("/add", (req, res, next) => {
  res.send(`the sum of ${req.a} and ${req.b} equals ${req.a + req.b}`);
});

app.get("/subtract", (req, res, next) => {
  res.send(`the difference of ${req.a} and ${req.b} equals ${req.a - req.b}`);
});


app.get("/operator", (req, res, next) => {
   const operator = req.query.op;

  switch (operator) {
    case "+":
      res.send(`the sum of ${req.a} and ${req.b} equals ${req.a + req.b}`);
      break;
    case "-":
      res.send(
        `the difference of ${req.a} and ${req.b} equals ${req.a - req.b}`,
      );
      break;
    case "*":
      res.send(`the product of ${req.a} and ${req.b} equals ${req.a * req.b}`);
      break;
    case "/":
      res.send(`the quotient of ${req.a} and ${req.b} equals ${req.a / req.b}`);
      break;
    default:
      res.send('invalid operator try "+, -, *, /');
  }
});

app.listen(80);
