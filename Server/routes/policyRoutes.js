const express = require("express");
const { body } = require("express-validator");

const {
  getPolicies,
  getPolicyById,
  addPolicy,
  updatePolicy,
  deletePolicy,
} = require("../controllers/policyController");

const {
  authenticate,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();
const validRoles = ["admin", "technician", "viewer"];

const validatePolicy = [
  body("appName")
    .notEmpty()
    .withMessage("App name is required")
    .isString()
    .withMessage("App name must be a string"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(validRoles)
    .withMessage(`Role must be one of: ${validRoles.join(", ")}`),

  body("allowedActions")
    .optional()
    .isArray()
    .withMessage("allowedActions must be an array of strings")
    .bail()
    .custom((arr) => arr.every((item) => typeof item === "string"))
    .withMessage("allowedActions must only contain strings"),

  body("deniedActions")
    .optional()
    .isArray()
    .withMessage("deniedActions must be an array of strings")
    .bail()
    .custom((arr) => arr.every((item) => typeof item === "string"))
    .withMessage("deniedActions must only contain strings"),
];

router.use(authenticate);

router.get("/", authorizeRoles("admin"), getPolicies);
router.get("/:id", authorizeRoles("admin"), getPolicyById);
router.post("/", authorizeRoles("admin"), validatePolicy, addPolicy);
router.put("/:id", authorizeRoles("admin"), validatePolicy, updatePolicy);
router.delete("/:id", authorizeRoles("admin"), deletePolicy);

module.exports = router;
