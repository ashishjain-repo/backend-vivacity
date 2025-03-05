import { Router } from "express";
import Applicant from './applicant';

const router = Router();

router.use('/awesome', Applicant);

export default router;