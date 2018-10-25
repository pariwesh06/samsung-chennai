'use strict';
const async = require('async');
const pg = require('pg');

const config = {
    user: 'root',
    host: 'localhost',
    database: 'ecom',
    port: 26257
};

// Create a pool.
const pool = new pg.Pool(config);
async function get(){
    let result = '';
    try {
        result = await pool.query('SELECT id, balance FROM accounts;');
    }
    catch (error){
        result = Promise.resolve({ code: 400, msg:'error while getting data' });
    }
    if (result && result.code !== 400){
        result = { code:200, count: result.rowcount, msg:'success', data:result.rows };
    }
    return result;
}

async function createAccount(amount){
    let result = '';
    try {
        result = await pool.query(`INSERT INTO accounts (balance) VALUES (${amount});`);
    }
    catch (error){
        result = Promise.resolve({ code: 400, msg:'error while getting data' });
    }
    if (result && result.code !== 400){
        console.log(result);
        result = { code:200, count: result.rowcount, msg:'success' };
    }
    return result;
}

//working on products

async function getProducts(id){
    let result = '';
    try {
        if (id){
            result = await pool.query(`SELECT * FROM products where id=${id};`);
        }
        else {
            result = await pool.query('SELECT * FROM products;');
        }
    }
    catch (error){
        result = null;
    }
    return result ? id ? result.rows[0] : result.rows : null;
}

async function postProducts(data){
    let result = '';
    try {
        result = await pool.query(`INSERT INTO products (id, name) VALUES (${data.id}, '${data.name}');`);
    }
    catch (error){
        result = null;
    }
    return result ? data : null;
}

async function updateProducts(data){
    let result = '';
    try {
        result = await pool.query(`update products set name='${data.name}' where id=${data.id};`);
    }
    catch (error){
        result = null;
    }
    return result ? data : null;
}

async function deleteProducts(id){
    let result = '';
    try {
        result = await pool.query(`delete from products where id=${id};`);
    }
    catch (error){
        result = null;
    }
    return result ? id : null;
}

module.exports.get = get;
module.exports.createAccount = createAccount;
module.exports.getProducts = getProducts;
module.exports.postProducts = postProducts;
module.exports.deleteProducts = deleteProducts;
module.exports.updateProducts = updateProducts;


