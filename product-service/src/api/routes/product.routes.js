import express from 'express';
const router = express.Router();

import { listProductController } from "../controllers";

router.get('/', listProductController);

export default router;