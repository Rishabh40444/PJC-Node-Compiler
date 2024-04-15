import { compiler } from "../controllers/apiController.mjs";
import { Router } from "express";
const router = Router()

router.post("/compile", compiler)
export {router}