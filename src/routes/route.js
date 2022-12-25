const express = require("express")
const router = express.Router()
const customerController = require("../controllers/customerController")
const cardController = require("../controllers/cardController")

router.post("/customer",customerController.createCustomer)

// router.get("/customer",customerController.getCustomer)

// router.delete("/customer",customerController.deleteCustomer)

router.post("/card",cardController.createCard)

router.get("/card",cardController.getcard)

module.exports = router