import { config } from "dotenv"
import { initServer } from "./configs/server.js"
import { defaultCategory } from "./src/category/category.default.js"
import { adminCreator } from "./src/user/user.admin.js"

config()
initServer()
adminCreator()
defaultCategory()