function getContentRouter(tableNameUpperCase, tableNameLowwerCase) {
    return `import { Router } from 'express';
import { controllerHandler } from '../../middleware/ErrorHandler';
import { create${tableNameUpperCase}, delete${tableNameUpperCase}ById, get${tableNameUpperCase}ById, getAll${tableNameUpperCase}, update${tableNameUpperCase}ById } from './${tableNameUpperCase}Controller';
const path = '/${tableNameLowwerCase}'; 
const router = Router();
    
router.get('/list', controllerHandler(getAll${tableNameUpperCase})); 
    
router.get('/:id', controllerHandler(get${tableNameUpperCase}ById)); 
    
router.post('/', controllerHandler(create${tableNameUpperCase})); 
    
router.put('/:id', controllerHandler(update${tableNameUpperCase}ById)); 
    
router.delete('/:id', controllerHandler(delete${tableNameUpperCase}ById)); 
    
export default { path, router };
    `
}

function getContentController(tableNameUpperCase, tableNameLowwerCase) {
    return `import * as jwtUtil from '../../util/Jwt';
import { commonResponse } from "../../util/ResponseForm";
import { ERRORS } from '../../constant/Errors';
    
export const getAll${tableNameUpperCase} = (req, res, next) => {
    
}
export const get${tableNameUpperCase}ById = (req, res, next) => {
    
}
export const create${tableNameUpperCase} = (req, res, next) => {
    
}
export const update${tableNameUpperCase}ById = (req, res, next) => {
    
}
export const delete${tableNameUpperCase}ById = (req, res, next) => {
    
}`
}

module.exports = {
    getContentRouter,
    getContentController
}
