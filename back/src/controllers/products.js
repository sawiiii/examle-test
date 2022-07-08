const axios = require('axios');
const filter = require('./filters');

function getFilterProduct(data){
    var products = [];
    data.forEach(function(sell) {
        sell.products.forEach(function(prod){
            if (products.indexOf(prod.category) == -1) {  
                products.push(prod.category); 
            };
        });
    });
    return products;
};

function getAllProducts(data){
    var products = [];
    var names = [];
    data.forEach(function(sell) {
        sell.products.forEach(function(prod){
            if (names.indexOf(prod.name) == -1) {  
                names.push(prod.name);
                products.push({
                    category: prod.category,
                    name: prod.name,
                    price: prod.price,
                }); 
            };
        });
    });
    return products;
};

function getFoodCounters(data) {
    var categoriesCounter = {};
    data.forEach(function(sell) {
        sell.products.forEach(function(prod){
            if (prod.name in categoriesCounter){
                    categoriesCounter[`${prod.name}`] += prod.quantity;
            } else {
                categoriesCounter[`${prod.name}`] = prod.quantity;
            }});
    });
    var arrayCounter = [];
    var counter = 0;
    var setMax = { name: '' , quantity: 0 };
    let claves = Object.keys(categoriesCounter);
    for(let i=0; i< claves.length; i++){
        let clave = claves[i];
        arrayCounter.push({product: clave, valor: categoriesCounter[clave]});
        if (categoriesCounter[clave] > counter) {
            counter = categoriesCounter[clave];
            setMax = { name: clave, quantity: categoriesCounter[clave]  };
        };
    };
    const  jsonSend ={
        data: arrayCounter,
        maax: setMax,
    };
    return jsonSend;

};

function getFoodCountersOnFilter(data) {
    var categoriesCounter = {};
    data.forEach(function(prod) {
            if (prod.name in categoriesCounter){
                    categoriesCounter[`${prod.name}`] += prod.quantity;
            } else {
                categoriesCounter[`${prod.name}`] = prod.quantity;
    }});
    var arrayCounter = [];
    var counter = 0;
    var setMax = { name: '' , quantity: 0 };
    let claves = Object.keys(categoriesCounter);
    for(let i=0; i< claves.length; i++){
        let clave = claves[i];
        arrayCounter.push({product: clave, valor: categoriesCounter[clave]});
        if (categoriesCounter[clave] > counter) {
            counter = categoriesCounter[clave];
            setMax = { name: clave, quantity: categoriesCounter[clave]  };
        };
    };
    const  jsonSend ={
        data: arrayCounter,
        maax: setMax,
    };
    return jsonSend;

};

function getFoodWithPrice(data) {
    var categoriesCounter = {};
    var counters = 0;
    data.forEach(function(sell) {
        sell.products.forEach(function(prod){
            if (!(prod.name in categoriesCounter)){
                counters += 1;
                categoriesCounter[`${prod.name}`] = prod.price;
            }})});
    var arrayCounter = [];
    let claves = Object.keys(categoriesCounter);
    for(let i=0; i< claves.length; i++){
        let clave = claves[i];
        arrayCounter.push({product: clave, valor: categoriesCounter[clave]});
    };
    const  jsonSend ={
        data: arrayCounter,
        total: counters,
    };
    return jsonSend;

};

function getCategoriesCounters(data) {
    var categoriesCounter = {};
    data.forEach(function(sale){ 
          sale.products.forEach(function(product){
            if (product.category in categoriesCounter){
                   categoriesCounter.product.category +=1;
            } else {
                categoriesCounter.product.category = 1;
            }})
    });
    const max = Math.max(... categoriesCounter.map(o => o));
    const  jsonSend ={
        max : max,
        categoriesCounters: categoriesCounter,
    };
    return jsonSend;
};


module.exports = {
    getFilterProduct,
    getFoodCounters,
    getCategoriesCounters,
    getAllProducts,
    getFoodCountersOnFilter,
    getFoodWithPrice,

    async getData(req, res) {
        var data = '';
        await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')
        .then(response => {
            data = response.data;
        })
        .catch(error => {
            console.log(error);
        });
        const products = getFilterProduct(data);
        const datas = getAllProducts(data);
        const foodCounter = getFoodCounters(data); 
        
        jsonSend = {
            products: products,
            foodCounter: foodCounter.data,
            max: foodCounter.maax,
            data: datas,
        }
        res.status(200).send(jsonSend);
    },

    async filters(req, res) {
        const params = req.query;
        var data = '';
        await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')
        .then(response => {
            data = response.data;
        })
        .catch(error => {
            console.log(error);
        });
        const types =  getFilterProduct(data);
        const products = filter.filterProducts(data, params);
        const filtered = filter.filterByCategory(data, params);
        const foodCounter = getFoodCountersOnFilter(filtered); 
        jsonSend = {
            products: types,
            foodCounter: foodCounter.data,
            max: foodCounter.maax,
            data: products,
        }
        res.status(200).send(jsonSend);
    },
  }
  
