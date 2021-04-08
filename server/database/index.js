const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    password: 'jordan123',
    user: 'root',
    database: 'test_final_project',
    
})

module.exports =connection