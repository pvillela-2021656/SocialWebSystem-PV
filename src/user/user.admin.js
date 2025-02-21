import { hash } from "argon2"
import User from "./user.model.js";

export const adminCreator = async () => {
    try {

        const existingAdmin = await User.findOne({ role: "ADMIN_ROLE" });
        if (existingAdmin) {
            console.log("Admin has already been created");
            return;
        }
            await User.create({
                name: "NAME_ADMIN",
                surname: "SURNAME_ADMIN",
                username: "ADMIN",
                email: "ADMIN@kinal.edu.gt",
                password: await hash("ADMIN#16"),
                profilePicture: "pvillela.jpg",
                phone: "99996666",
                role: "ADMIN_ROLE"
            });
            
        console.log("Default admin created");

    } catch (err) {
        console.log("Error creating user");
    }
};

export default adminCreator;