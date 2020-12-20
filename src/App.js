import express from 'express';
import { errorHandler } from './middleware/ErrorHandler';
import routers from './component/router';
import CommonConfig from './config/CommonConfig';
import { corsMiddleware } from './middleware/Cors';
import bodyParser from 'body-parser';

const expressApp = express();

expressApp.use(corsMiddleware);
expressApp.use(bodyParser.json({
  limit: '50mb'
}));
expressApp.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
}));

for (const router of routers) {
  expressApp.use(router.path, router.router)
}

expressApp.use(errorHandler)

expressApp.listen(CommonConfig.PORT, () => {
  console.log('Server is running at port', CommonConfig.PORT)
});
