import { Router } from "express";
import { indexPage } from "../controllers/viewController.mjs";

const router = Router();
router.get('/', indexPage)

export { router }