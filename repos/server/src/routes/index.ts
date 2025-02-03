

import { Router } from 'express';

import HealthRoute from "./health";
import RecordRoute from "./record";

const router = Router();

router.get("/health", HealthRoute);
router.get("/record/:id", RecordRoute);

export default router;
