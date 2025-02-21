import { body, param } from "express-validator";
import { emailExists, userExists, usernameExists } from "../helpers/db-validators.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle_errors.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
export const registerValidator = [
    body("name").notEmpty().withMessage("Name IS required."),
    body("username").notEmpty().withMessage("Username IS required."),
    body("email").notEmpty().withMessage("The email IS required."),
    body("email").isEmail().withMessage("Not a valid Email."),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Not a valid email."),
    body("username").optional().isString().withMessage("Username's in a wrong format."),
    body("password").isLength({min: 4}).withMessage("The password MUST have at least of 8 characters."),
    validarCampos,
    handleErrors
]

export const updateProfilePictureValidator = [
    param("uid").isMongoId().withMessage("Not a valid mongo ID."),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid").isMongoId().withMessage("Not a valid mongo ID."),
    param("uid").custom(userExists),
    body("newPassword").isLength({ min: 8 }).withMessage("The password MUST be at least of 8 characters."),
    validarCampos,
    handleErrors
]


export const updateUserValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    param("uid").custom(userExists),
    body("email").optional().isEmail().withMessage("Enter a valid email."),
    body("email").custom(emailExists),
    validarCampos,
    handleErrors
]