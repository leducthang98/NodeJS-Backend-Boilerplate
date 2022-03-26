function getContentRouter(tableNameUpperCase, tableNameLowwerCase) {
    return `import { Router } from 'express';
import { controllerHandler } from '../../middleware/ErrorHandler';
    
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

module.exports = {
    getContentRouter
}
