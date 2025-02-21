import { config } from "dotenv"
import { initServer } from "./configs/server.js"
import { adminCreator } from "./src/user/user.admin.js"

config()
initServer()
adminCreator()