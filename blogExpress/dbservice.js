const { response } = require('express');
const mysql = require('mysql')
let instance = null
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dastan',
    password: 'dastan123',
    database: 'blog',
    port: 3306,
});

connection.connect((err) => {
    if(err){
        console.log(err.message)
    }
    console.log('db' + connection.state)
})


class DbService{
    static getDbServiceInstance(){
        return instance ? instance: new DbService()
    }

    async getAllBlogs(){
        try {
            const response = await new Promise((resolve, reject) =>{
                const query = "SELECT * FROM blogtable;";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async addBlog(title, body){
        const date = new Date();
        try {
            const insert = await new Promise((resolve, reject)=>{
                const query = "INSERT INTO blogtable (title, body, added_on) VALUES (?,?,?);";
                connection.query(query, [title, body, date], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results)
                });
            });
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async getBlog(id){
        id = parseInt(id)
        console.log(typeof id)
        try {
            const response = await new Promise((resolve, reject) =>{
                const query = "SELECT * FROM blogtable WHERE id=?;";
                connection.query(query,[id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async updateBlogById(id, title, body) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE blogtable SET title = ?, body = ? WHERE id = ?";
    
                connection.query(query, [title, body, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM blogtable WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = DbService;