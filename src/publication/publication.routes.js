import { Router } from "express";
import { addPublication, deletePublication } from "./publication.controller.js";
import { addPublicationValidator, deletePublicationValidator } from "../middlewares/publication-validator.js";

const router = Router();

router.post("/addPublication", addPublicationValidator, addPublication),

router.delete("/deletePublication/:id", deletePublicationValidator, deletePublication)
export default router;