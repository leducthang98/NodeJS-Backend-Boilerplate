function getContentRouter(tableNameUpperCase, tableNameLowwerCase) {
    return `import { Router } from 'express';
import { controllerHandler } from '../../middleware/ErrorHandler';
import { jwtFilter } from '../../middleware/Authenticate';
import { create${tableNameUpperCase}Controller, delete${tableNameUpperCase}ByIdController, get${tableNameUpperCase}ByIdController, getList${tableNameUpperCase}Controller, update${tableNameUpperCase}ByIdController } from './${tableNameUpperCase}Controller';
const path = '/${tableNameLowwerCase}'; 
const router = Router();
    
router.get('/list', jwtFilter, controllerHandler(getList${tableNameUpperCase}Controller)); 
    
router.get('/:id', jwtFilter, controllerHandler(get${tableNameUpperCase}ByIdController)); 
    
router.post('/', jwtFilter, controllerHandler(create${tableNameUpperCase}Controller)); 
    
router.put('/:id', jwtFilter, controllerHandler(update${tableNameUpperCase}ByIdController)); 
    
router.delete('/:id', jwtFilter, controllerHandler(delete${tableNameUpperCase}ByIdController)); 
    
export default { path, router };
    `
}

function getContentController(tableNameUpperCase, tableNameLowwerCase) {
    return `import * as jwtUtil from '../../util/Jwt';
import { commonResponse } from '../../util/ResponseForm';
import { getList${tableNameUpperCase}DAL, get${tableNameUpperCase}ByIdDAL, create${tableNameUpperCase}DAL, update${tableNameUpperCase}ByIdDAL, delete${tableNameUpperCase}ByIdDAL } from './${tableNameUpperCase}DAL';

export const getList${tableNameUpperCase}Controller = async (req, res, next) => {
    
}
export const get${tableNameUpperCase}ByIdController = async (req, res, next) => {
    const { id } = req.params
    if (!id) next('Invalid input params')

    try {
        const result = await get${tableNameUpperCase}ByIdDAL(id)

        if(!result) next('id not exist')
        
        res.send(commonResponse(result))
    } catch (error) {
        next(error)
    }
}
export const create${tableNameUpperCase}Controller = async (req, res, next) => {
    
}
export const update${tableNameUpperCase}ByIdController = async (req, res, next) => {
    
}
export const delete${tableNameUpperCase}ByIdController = async (req, res, next) => {
    
}`
}

function getContentDAL(tableNameUpperCase, tableNameLowwerCase){
    return `import * as dbUtil from '../../util/Database';
import { v4 as uuidv4 } from 'uuid';
    
export const getList${tableNameUpperCase}DAL = async () => {
        
}
    
export const get${tableNameUpperCase}ByIdDAL = async (id) => {
    const sql = 'select * from ${tableNameLowwerCase} where id = ?';
    const result = await dbUtil.queryOne(sql, [id]);
    return result;
}
    
export const create${tableNameUpperCase}DAL = async () => {
    
    }
    
export const update${tableNameUpperCase}ByIdDAL = async (id) => {
    
}
    
export const delete${tableNameUpperCase}ByIdDAL = async (id) => {
    
}`
}

module.exports = {
    getContentRouter,
    getContentController,
    getContentDAL
}
