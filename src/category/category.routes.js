import { Router } from "express";
import { addCategoryValidator, deleteCategoryValidator, updateCategoryValidator } from "../middlewares/category-validator.js";
import { addCategory, deleteCategory, updateCategory } from "./category.controller.js";

const router = Router();

router.post("/addCategory", addCategoryValidator, addCategory);

router.put("/updateCategory/:id", updateCategoryValidator, updateCategory)

router.delete("/deleteCategories/:id", deleteCategoryValidator, deleteCategory)

export default router;