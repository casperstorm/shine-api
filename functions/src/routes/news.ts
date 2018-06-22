import { Router, Request, Response } from "express";
import { aggregate } from '../services/aggregate'
const router: Router = Router()

export default router

router.get('/', async (req: Request, res: Response) => {
  try {
    const data = await aggregate()
    res.json(data)
  } catch (error) {
    res.json({ error: 'error getting news items' })
  }
})