const express = require("express");
const router = express.Router();
const {
  contactsValidateBody,
  authorizationCheck,
  upload,
} = require("../../middlewares");
const ctrl = require("../../contollers/auth");

const { schemas } = require("../../models/users");

router.post(
  "/register",
  contactsValidateBody(schemas.registerSchema),
  ctrl.registration
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  contactsValidateBody(schemas.emailSchema),
  ctrl.resendVerification
);

router.post("/login", contactsValidateBody(schemas.logInSchema), ctrl.login);

router.get("/current", authorizationCheck, ctrl.currentUser);

router.delete("/logout", authorizationCheck, ctrl.logout);

router.patch(
  "/avatar",
  authorizationCheck,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
