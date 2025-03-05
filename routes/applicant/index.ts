import { Router } from "express";
import { createUser, loginUser, checkAuth, getUserDetail } from "../../controllers/applicant";

const router = Router();


router.post('/applicant/register', createUser);

router.post('/applicant/login', loginUser)

router.get('/applicant/auth', checkAuth);

router.get('/applicant')

router.get('/applicant', getUserDetail);

export default router;