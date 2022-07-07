const axios = require('axios');
const filter = require('./filters');

function getProducts(data){
    var products = [];
    data.forEach(function(sell) {
        // console.log(sell.products);
        sell.products.forEach(function(prod){
            console.log(prod);
            if (products.indexOf(prod.category) == -1) {  
                products.push(prod.category); 
            };
        });
    });
    return products;
};


module.exports = {
    getProducts,

    async getData(req, res) {
        var data = '';
        await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')
        .then(response => {
            // console.log(response.data[1].products);
            data = response.data;
        })
        .catch(error => {
            console.log(error);
        });
        const products = getProducts(data)
        
        jsonSend = {
            products: products,
            data: []
        }
        res.status(200).send(jsonSend);
    },

    async filters(req, res) {
        // console.log(req.query);
        const params = req.query;
        var data = '';
        await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')
        .then(response => {
            // console.log(response.data[1].products);
            data = response.data;
        })
        .catch(error => {
            console.log(error);
        });
        const products = filter.filterProducts(data, params)
        // console.log(dates);
       
        // jsonSend = {
        //     products: products,
        //     data: []
        // }
        res.status(200).send(products);
    },
  }
  
