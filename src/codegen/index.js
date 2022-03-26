const { MYSQL_URL, MYSQL_DB } = require('../config/CommonConfig');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const { getContentRouter, getContentController, getContentDAL } = require('./formatModule')

console.log('Suggest: Tables and Columns should be cammelCase!')

const conn = mysql.createConnection(MYSQL_URL);

async function getGenerateTable() {
    return new Promise((res, rej) => {
        conn.connect((err) => {
            if (err) rej(err)
            conn.query('SHOW TABLES', async (err, results) => {
                if (err) rej(err)

                const listTables = []
                for (const res of results) {
                    for (const key in res) {
                        listTables.push({
                            name: res[key],
                            field: []
                        })
                    }
                }

                for (let i = 0; i < listTables.length; i++) {
                    try {
                        const cols = await new Promise((res, rej) => {
                            const listCols = []
                            conn.query(`select COLUMN_NAME from information_schema.columns where table_schema = '${MYSQL_DB}' and table_name = '${listTables[i].name}'`, (err, results) => {
                                if (err) rej(err)
                                for (const res of results) {
                                    listCols.push(res.COLUMN_NAME)
                                }
                                res(listCols)
                            })
                        })
                        listTables[i].field = [...cols]
                    } catch (error) {
                        rej(err)
                    }
                }
                res(listTables)
            })
        })
    })
}

async function createModule(tableInfo) {
    let tableNameUpperCase = tableInfo.name.charAt(0).toUpperCase() + tableInfo.name.slice(1)

    // create folder
    let dirModule = path.join(__dirname, `/../../src/component/${tableInfo.name}`)
    fs.mkdirSync(dirModule);

    // create controller
    let dirController = path.join(__dirname, `/../../src/component/${tableInfo.name}/${tableNameUpperCase}Controller.js`)
    await new Promise((res, rej) => {
        let contentController = getContentController(tableNameUpperCase, tableInfo.name)
        fs.writeFile(dirController, contentController, (err) => {
            if (err) rej(err);
            res()
        });
    })

    // create DAL
    let dirDAL = path.join(__dirname, `/../../src/component/${tableInfo.name}/${tableNameUpperCase}DAL.js`)
    await new Promise((res, rej) => {
        let contentDAL = getContentDAL(tableNameUpperCase, tableInfo.name)
        fs.writeFile(dirDAL, contentDAL, (err) => {
            if (err) rej(err);
            res()
        });
    })

    // create Router
    let dirRouter = path.join(__dirname, `/../../src/component/${tableInfo.name}/${tableNameUpperCase}Router.js`)
    await new Promise((res, rej) => {
        let contentRouter = getContentRouter(tableNameUpperCase, tableInfo.name)
        fs.writeFile(dirRouter, contentRouter, (err) => {
            if (err) rej(err);
            res()
        });
    })

    // add into router.js
    const routerContent = fs.readFileSync(path.join(__dirname, '/../../src/component/router.js')).toString()
    let index = 0;
    for (let i = 0; i < routerContent.length; i++) {
        if (routerContent[i] === ']') {
            index = i;
        }
    }
    const importStatementString = `import ${tableNameUpperCase}Router from './${tableInfo.name}/${tableNameUpperCase}Router';\n`
    const importModuleToArr = `, ${tableNameUpperCase}Router`
    const routerNewContent = importStatementString + routerContent.slice(0, index) + importModuleToArr + routerContent.slice(index)
    let dirRootRouter = path.join(__dirname, `/../../src/component/router.js`)
    await new Promise((res, rej) => {
        let contentRootRouter = routerNewContent

        fs.writeFile(dirRootRouter, contentRootRouter, (err) => {
            if (err) rej(err);
            res()
        });
    })
}

async function execute() {
    let listTables = await getGenerateTable()
    let modules = fs.readdirSync(path.join(__dirname, '/../../src/component'));
    // backup version of router.js
    const routerContent = fs.readFileSync(path.join(__dirname, '/../../src/component/router.js')).toString()
    let dirBackupRootRouter = path.join(__dirname, `/../../src/component/prev.router.js`)
    await new Promise((res, rej) => {
        fs.writeFile(dirBackupRootRouter, routerContent, (err) => {
            if (err) rej(err);
            res()
        });
    })

    for (const table of listTables) {
        if (!modules.includes(table.name)) {
            await createModule(table)
        }
    }
    console.log('Generate successful!')
}

execute()