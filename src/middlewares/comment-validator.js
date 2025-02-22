import { handleErrors } from "./handle_errors.js"
import { validarCampos } from "./validate-fields.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"

export const addCommentsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    validarCampos,
    handleErrors
]

export const deleteCommentsValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const updateCommentsValidator =[
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    validarCampos,
    handleErrors
]