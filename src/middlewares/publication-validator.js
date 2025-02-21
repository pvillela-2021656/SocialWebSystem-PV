import { body, param } from "express-validator"
import { handleErrors } from "./handle-errors.js"
import { validarCampos } from "./validate-fields.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"

export const addPublicationValidator =[
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    body("title").notEmpty().withMessage("The title IS needed for the publication."),
    body("text").notEmpty().withMessage("The publication needs text for it to be valid."),
    validarCampos,
    handleErrors
]

export const deletePublicationValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "USER_ROLE"),
    param("id").isMongoId().withMessage("Not a valid Mongo ID"),
]