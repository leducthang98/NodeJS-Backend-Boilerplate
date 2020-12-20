import { Router } from 'express';
import { jwtFilter } from '../../middleware/Authenticate';
import { controllerHandler } from '../../middleware/ErrorHandler';
import * as bcryptUtil from '../../util/BcryptUtil';
const path = '/default';
const router = Router();

router.get('/', (req, res) => {
  res.send('ok');
});

router.get('/tokenCheck', jwtFilter, controllerHandler((req, res, next) => {
  res.send(req.tokenDecoded)
}))

router.get('/genBcrypt', controllerHandler(async (req, res, next) => {
  let data = req.query.data
  let hashed = await bcryptUtil.hash(data);
  res.send({
    data: data,
    hash: hashed
  })
}))

export default { path, router };
