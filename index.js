const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const productRoute = require("./router/productRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/product", productRoute);
app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
