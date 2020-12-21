import { STATUS } from "../constant/Status";
import { commonResponse } from "../util/ResponseForm";

export const controllerHandler = f => async (req, res, next) => {
  try {
    await f(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const errorHandler = (error, req, res, next) => {
  if (typeof error === 'string') {
    res.status(500);
    res.send(commonResponse(error, STATUS.SERVER_ERROR.CODE, STATUS.SERVER_ERROR.MESSAGE))
  } else {
    let code = STATUS.UNKNOWN_ERROR.CODE;
    let message = STATUS.UNKNOWN_ERROR.MESSAGE;
    if (error.status >= 400 && error.status <= 499) {
      code = STATUS.CLIENT_ERROR.CODE;
      message = STATUS.CLIENT_ERROR.MESSAGE;
    } else {
      console.log(error)
      code = STATUS.SERVER_ERROR.CODE;
      message = STATUS.SERVER_ERROR.MESSAGE;
    }
    res.status(error.status || 500);
    res.send(commonResponse(error.toString(), code, message))
  }
};
