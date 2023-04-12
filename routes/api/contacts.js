const express = require("express");
const router = express.Router();
const ctrl = require("../../contollers/contacts");
const { contactsValidateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getOneContact);

router.post("/", contactsValidateBody(addSchema), ctrl.addNewContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", contactsValidateBody(addSchema), ctrl.changeContact);

module.exports = router;
