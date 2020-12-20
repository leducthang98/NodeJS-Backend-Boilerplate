import { Router } from 'express';

import { controllerHandler } from '../../middleware/ErrorHandler';
import { login } from './AuthController';

const path = '/auth';
const router = Router();

router.post('/login', controllerHandler(login));

export default { path, router };
