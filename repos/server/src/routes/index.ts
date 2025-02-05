

import { Router } from 'express';

import HealthRoute from "./health";
import OnboardRoute from "./onboard";
import ProfileRoute from "./profile";
import RecordsRoute from "./records";

const router = Router();

router.get("/health", HealthRoute);
router.post("/onboard", OnboardRoute);
router.get("/profile/:id", ProfileRoute);
router.get("/records/:id", RecordsRoute);

export default router;
