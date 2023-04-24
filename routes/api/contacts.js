const express = require("express");
const router = express.Router();
const ctrl = require("../../contollers/contacts");
const {
  contactsValidateBody,
  isvalidId,
  authorizationCheck,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", authorizationCheck, ctrl.getAllContacts);

router.get("/:contactId", authorizationCheck, isvalidId, ctrl.getOneContact);

router.post(
  "/",
  authorizationCheck,
  contactsValidateBody(schemas.addSchema),
  ctrl.addNewContact
);

router.delete("/:contactId", authorizationCheck, isvalidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  authorizationCheck,
  isvalidId,
  contactsValidateBody(schemas.addSchema),
  ctrl.changeContact
);

router.patch(
  "/:contactId/favorite",
  authorizationCheck,
  isvalidId,
  contactsValidateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorites
);

module.exports = router;
