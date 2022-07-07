import { Router } from "express";
import { battle, ranking } from "../controllers/controller.js";

const router = Router();

router.post("/battle", battle);
router.get("/ranking", ranking);

export default router;
