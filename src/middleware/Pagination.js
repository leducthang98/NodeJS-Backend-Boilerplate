
export const pagination = (page = 1, size = 10) => async (req, res, next) => {
    let actualPage = req.query.page || page;
    let actualSize = req.query.size || size;
    req.pagination.offset = parseInt((actualPage - 1) * actualSize);
    req.pagination.limit = parseInt(actualSize);
    req.pagination.page = parseInt(actualPage);
    req.pagination.size = parseInt(actualSize);
    next();
}