const axios = require('axios');

function filterSales(data, params){
    var query = data;
    if (params.month == '' && params.day == '' && params.year == ''){
        return data;
    };
    
    if (params.month != ''){
        query = query.filter(function (sell) {
            const month = new Date(sell.date_closed).getMonth();
            if (month == params.month) {
                return sell; 
            }
        });
        if (params.day != ''){
            query = query.filter(function (sell) {
                const day = new Date(sell.date_closed).getDate();
                if (day == params.day) {
                    return sell; 
                }
            });
        } else {
            query = query;
        };
    } else {
        if (params.day != ''){
            query = query.filter(function (sell) {
                const day = new Date(sell.date_closed).getDate();
                if (day == params.day) {
                    return sell; 
                }
            });
        } else {
            query = query;
        };
    };
    return query;
};

function filterPayments(data, params){
    var query = data;
    if (params.month == '' && params.day == '' && params.year == ''){
        if (params.type == ''){
            return data;
        } else {
            var datas = [];
            query = query.filter(function (sell) {
                        sell.payments.forEach(function(pay){
                            if (pay.type == params.type) { 
                                datas.push(sell);
                            };
                        });
            });
            return datas;
        }
    };

    if (params.month != ''){
        query = query.filter(function (sell) {
            const month = new Date(sell.date_closed).getMonth();
            if (month == params.month) {
                return sell;
                }
        });
        if (params.day != ''){
            query = query.filter(function (sell) {
                const day = new Date(sell.date_closed).getDate();
                if (day == params.day) {
                    return sell;
                }});
        } else {
            query = query;
        };
    } else {
        if (params.day != ''){
            query = data.filter(function (sell) {
                const day = new Date(sell.date_closed).getDate();
                if (day == params.day) {
                    return sell;
                }
            });
        } else {
            query = query
        };
    };
    if (params.type != ''){
        var datas = [];
        query = query.filter(function (sell) {
                        sell.payments.forEach(function(pay){
                            if (pay.type == params.type) { 
                                datas.push(sell);
                            };
                        });
        });
        return datas;
    };

    
    return query;
};

function filterProducts(data, params){
    var query = [];
    var names = [];
    data.forEach(function(sell) {
        sell.products.forEach(function(prod){
            if (params.category == prod.category) {
                if (names.indexOf(prod.name) == -1) {  
                    names.push(prod.name);
                    query.push(prod);
                };
            };
        });
    });
    return query;
};

function filterByCategory(data, params){
    var query = [];
    data.forEach(function(sell) {
        sell.products.forEach(function(prod){
            if (params.category == prod.category) {
                query.push(prod);
            } else if (params.category  == '') {
                query.push(prod);
            };
        });
    });
    return query;
};

function getFullProfit(data){
    var total = 0;
    var counter = 0;
    var diners = 0;
    data.forEach(function(sell) {
        total += sell.total;
        counter += 1;
        diners += sell.diners;
    });
    const dinerAverage = diners / counter;
    const average = total / counter;
    const send = {
        total: total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        average: average.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        diners: dinerAverage.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    };
    return send;
};

function getProfitByProduct(data){
    var categoriesCounter = {};
    data.forEach(function(sell) {
        sell.products.forEach(function(prod) {
                if (prod.name in categoriesCounter){
                        categoriesCounter[`${prod.name}`] += prod.price*prod.quantity;
                } else {
                    categoriesCounter[`${prod.name}`] = prod.price*prod.quantity;
        }});
    });
    var arrayCounter = [];
    let claves = Object.keys(categoriesCounter);
    for(let i=0; i< claves.length; i++){
        let clave = claves[i];
        arrayCounter.push({product: clave, valor: categoriesCounter[clave].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')});
    };
    return arrayCounter;
};

function getBillsAndPorcentages(data){
    var counterDeb = 0;
    var counterCred = 0;
    var counterCash = 0;
    var counter = 0;
    var earnDeb = 0;
    var earnCred = 0;
    var earnCash = 0;

    data.forEach(function(sell) {
        sell.payments.forEach(function(pay) {
                if (pay.type == "Tarjeta crédito"){
                    counterCred += 1;
                    earnCred += pay.amount;
                } else if (pay.type == "Tarjeta débito"){
                    counterDeb += 1;
                    earnDeb += pay.amount;
                } else if (pay.type == "Efectivo"){
                    counterCash += 1;
                    earnCash += pay.amount;
                };
                counter += 1;
        });
    });
    const porDeb  = ((counterDeb/counter )*100).toFixed(2);
    const porCred = ((counterCred/counter)*100).toFixed(2);
    const porCash = ((counterCash/counter)*100).toFixed(2);
    var total = earnDeb + earnCred + earnCash;
    const jsonSend = {
        earn: [
            {val: 'Debit Card',  earn: earnDeb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},
            {val: 'Credit Card', earn: earnCred.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},
            {val: 'Cash',        earn: earnCash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},
        ],
        counter: counter,
        counterDeb: porDeb,
        counterCred: porCred,
        counterCash: porCash,
        total: total,
    };
    return jsonSend;
};

function getSalesByCashierOrWaiter(data, params){

    var query = data;
    if (params.cashier == '' && params.waiter == ''){
        return data;
    };
    
    if (params.cashier != ''){
        query = query.filter(function (sell) {
            if (sell.cashier == params.cashier) {
                return sell; 
            }
        });
        if (params.waiter != ''){
            query = query.filter(function (sell) {
                if (sell.waiter == params.waiter) {
                    return sell; 
                }
            });
        } else {
            query = query;
        };
    } else {
        if (params.waiter != ''){
            query = query.filter(function (sell) {
                if (sell.waiter == params.waiter) {
                    return sell; 
                }
            });
        } else {
            query = query;
        };
    };
    return query;
};

function getInfoCashierWaiter(data){
    var cashiers = {};
    var waiter = {};
    data.forEach(function(sell) {
        if (sell.waiter in waiter){
            waiter[`${sell.waiter}`][0] += sell.total;
            waiter[`${sell.waiter}`][1] += 1;
        } else {
            waiter[`${sell.waiter}`] = [sell.total, 1];
        };
        if (sell.cashier in cashiers){
            cashiers[`${sell.cashier}`][0] += sell.total;
            cashiers[`${sell.cashier}`][1] += 1;
        } else {
            cashiers[`${sell.cashier}`] = [sell.total, 1];
        };
    });
    var arrayCashiers = [];
    let claves = Object.keys(cashiers);
    for(let i=0; i< claves.length; i++){
        let clave = claves[i];
        arrayCashiers.push({person: clave, bills: cashiers[clave][0], counter: cashiers[clave][1]});
    };
    var arrayWaiters = [];
    let key = Object.keys(waiter);
    for(let i=0; i< key.length; i++){
        let clave = key[i];
        arrayWaiters.push({person: clave, bills: waiter[clave][0], counter: waiter[clave][1]});
    };
    const json = {
        cashiers: arrayCashiers,
        waiters: arrayWaiters,
    };
    return json;
};




module.exports = {
    filterSales,
    filterPayments,
    filterProducts,
    filterByCategory,
    getFullProfit,
    getProfitByProduct,
    getBillsAndPorcentages,
    getSalesByCashierOrWaiter,
    getInfoCashierWaiter,
    
}