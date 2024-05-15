const express = require("express");
const {
  createContact,
  getContacts,
  deleteContact,
  updateContact,
} = require("../controllers/ContactController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require authentication for routes
router.use(requireAuth);

//get all contacts
router.get("/", getContacts);

//POST a contact
router.post("/new", createContact);

//DELETE a contact
router.delete("/:id", deleteContact);

//UPDATE a contact
router.patch("/:id", updateContact);

module.exports = router;
