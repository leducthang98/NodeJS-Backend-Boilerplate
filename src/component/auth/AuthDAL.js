import * as dbUtil from '../../util/DatabaseUtil';

export const getUserByUsername = async (username, password) => {
    const sql = 'select * from account where username = ?';
    const result = await dbUtil.queryOne(sql, [username, password]);
    return result;
}