const express = require("express");
const router = express.Router();
const {
  contactsValidateBody,
  authorizationCheck,
} = require("../../middlewares");
const ctrl = require("../../contollers/auth");

const { schemas } = require("../../models/users");

router.post(
  "/register",
  contactsValidateBody(schemas.registerSchema),
  ctrl.registration
);
router.post("/login", contactsValidateBody(schemas.logInSchema), ctrl.login);

router.get("/current", authorizationCheck, ctrl.currentUser);

router.delete("/logout", authorizationCheck, ctrl.logout);

module.exports = router;
