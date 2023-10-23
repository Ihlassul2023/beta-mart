const router = require("express").Router();
const { postProduct, getProduct, deleteProduct, postRack, getAllRack } = require("../controller/product");

router.route("/newRack").post(postRack).get(getAllRack);
router.route("/:rack").post(postProduct).get(getProduct).delete(deleteProduct);

module.exports = router;
