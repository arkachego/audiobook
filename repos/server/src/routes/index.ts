

import { Router } from 'express';

import HealthRoute from "./health";
import OnboardRoute from "./onboard";
import RecordRoute from "./record";

const router = Router();

router.get("/health", HealthRoute);
router.post("/onboard", OnboardRoute);
router.get("/record/:id", RecordRoute);

export default router;
