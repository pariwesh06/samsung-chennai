'use strict';

const Boom = require('boom');
const _ = require('lodash');
const joi = require('joi');
const schema = require('../lib/schemas');

// handlers are exported back for use in hapi routes
const Handlers = {};

// Lib contains our business specific logic
const Lib = {};

// our pretend database data
const ProductDatabase = [
    {
        id: 1,
        name: 'Shirt'
    },
    {
        id: 2,
        name: 'Pants'
    }
];

// a unit test-able function
Lib.getProducts = async (id) => {

    if (id) {
        const product = await _.find(ProductDatabase, (p) => {

            return p.id === id;
        });

        if (!product) {
            return null;
        }

        const result = joi.validate(product, schema.Product);
        if (result.error){
            return result.error;
        }
        return product;
    }

    return ProductDatabase;
};

//delete products
Lib.deleteProducts = async (id) => {

    if (id) {
        const product = await _.find(ProductDatabase, (p) => {

            return p.id === id;
        });

        if (!product) {
            return null;
        }

        const result = joi.validate(product, schema.Product);
        if (result.error){
            return result.error;
        }
        const index = ProductDatabase.indexOf(product);
        ProductDatabase.splice(index,1);
        return product;
    }


};

// hapi route handler
// only this function can call reply
Handlers.get = async (req, reply) => {
    //
    // Perform req processing & conversions for input here.
    //
    let id = null;

    if (req.params.id) {
        id = req.params.id;
    }

    const products = await Lib.getProducts(id);

    if (!products) {
        return Boom.notFound();
    }

    return { result: products };
};

Handlers.post = async (req, reply) => {
    //
    // Perform req processing & conversions for input here.
    //
    const data = req.payload ? req.payload : {};
    let id = null;
    let result = '';
    id = data.id;
    result = await Lib.getProducts(id);

    if (!result) {
        ProductDatabase.push(data);
    }
    else {
        let product = ProductDatabase.filter((product) => product.id === id);
        product = data;
    }
    return { result: data, status:{ code: result ? 'UPDATED' : 'CREATED' } };
};

Handlers.delete = async (req, reply) => {
    //
    // Perform req processing & conversions for input here.
    //
    let id = null;

    if (req.params.id) {
        id = req.params.id;
    }

    const products = await Lib.deleteProducts(id);

    if (!products) {
        return Boom.notFound();
    }

    return { result: products, status: { code: 'DELETED' } };

};

module.exports = {
    handlers: Handlers,
    lib: Lib
};
