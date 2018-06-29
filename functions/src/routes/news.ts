import { Router, Request, Response } from "express";
import { aggregate } from "../services/aggregate";
const router: Router = Router();

export default router;

router.get("/", async (req: Request, res: Response) => {
  try {
    const limit: number = req.query.limit;
    const data = await aggregate(limit);
    res.json(data);
  } catch (error) {
    res.json({ error: "error getting news items" });
  }
});
