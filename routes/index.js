const router = require("express").Router();
// const htmlRoutes = require("./html");
const apiRoutes = require("./api");

// router.use("/", htmlRoutes);
router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send(`<h1> 404 error!</h1>`);
});

module.exports = router;
