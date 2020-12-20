import mysql from 'mysql';
import CommonConfig from '../config/CommonConfig';

const pool = mysql.createPool(CommonConfig.MYSQL_URL);

export const query = async (sql, params) => {
    console.log('----------------------------');
    console.log('sql:', mysql.format(sql, params));
    console.log('----------------------------');
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
};

export const queryOne = async (sql, params) => {
    const results = await query(sql, params);
    return results[0];
  };
  
