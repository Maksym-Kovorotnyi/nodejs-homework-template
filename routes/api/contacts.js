const express = require("express");
const router = express.Router();
const ctrl = require("../../contollers/contacts");
const { contactsValidateBody, isvalidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isvalidId, ctrl.getOneContact);

router.post("/", contactsValidateBody(schemas.addSchema), ctrl.addNewContact);

router.delete("/:contactId", isvalidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isvalidId,
  contactsValidateBody(schemas.addSchema),
  ctrl.changeContact
);

router.patch(
  "/:contactId/favorite",
  isvalidId,
  contactsValidateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorites
);

module.exports = router;
