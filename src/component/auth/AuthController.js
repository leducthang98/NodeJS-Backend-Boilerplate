import * as authDAL from './AuthDAL';

import * as jwtUtil from '../../util/JwtUtils';
import * as bcryptUtil from '../../util/BcryptUtil';
import { commonResponse } from "../../util/ResponseForm";
import { TOKEN } from "../../constant/Token";
import { ERRORS } from '../../constant/Errors';
import { hash, compare } from '../../util/BcryptUtil';

export const login = async (req, res, next) => {
    const { username, password } = req.body;
    if (username && password) {
        const user = await authDAL.getUserByUsername(username);
        if (user) {
            const isPasswordValid = await compare(password, user.password);
            if (isPasswordValid) {
                let data = {
                    userId: user.id,
                    username: user.username
                }
                const token = await jwtUtil.generateToken(data, { expiresIn: TOKEN.TOKEN_EXPIRED })
                let tokenInfo = {
                    token: token,
                    timeExpireMs: TOKEN.TOKEN_EXPIRED
                }
                res.send(commonResponse(tokenInfo))
            } else {
                next(ERRORS.INVALID_USERNAME_OR_PASSWORD_ERROR)
            }
        } else {
            next(ERRORS.INVALID_USERNAME_OR_PASSWORD_ERROR)
        }
    } else {
        next(ERRORS.INVALID_INPUT_PARAMS)
    }
}
