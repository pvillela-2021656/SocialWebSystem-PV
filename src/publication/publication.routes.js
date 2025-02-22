import { Router } from "express";
import { addPublicationValidator, deletePublicationValidator, updatePublicationValidator } from "../middlewares/publication-validator.js";
import { addPublication, deletePublication, updatePublication } from "./publication.controller.js";

const router = Router();

router.post("/addPublication", addPublicationValidator, addPublication),

router.delete("/deletePublication/:id", deletePublicationValidator, deletePublication),

router.put("/updPublication/:id", updatePublicationValidator, updatePublication)
export default router;