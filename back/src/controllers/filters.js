const axios = require('axios');

function filterSales(data, params){
    // { day: '3', month: '2', year: '2019' }
    var query = data;
    if (params.month == '' && params.day == '' && params.year == ''){
        return [];
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
                    console.log(day);
                    return sell; 
                }
            });
        } else {
            query = query;
        };
    };
    // console.log(query);

    
    return query;
};

function filterPayments(data, params){
    // { day: '3', month: '2', year: '2019' , type: ''}
    // console.log(params);
    var query = data;
    if (params.month == '' && params.day == '' && params.year == ''){
        if (params.type == ''){
            return [];
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
    // console.log(params);
    var query = [];
    var names = [];
    data.forEach(function(sell) {
        // console.log(sell.products);
        sell.products.forEach(function(prod){
            console.log(prod);
            if (params.category == prod.category) {
                if (names.indexOf(prod.name) == -1) {  
                    names.push(prod.name);
                    query.push(prod);
                };
            };
        });
    });
    console.log(query);
    return query;
};

module.exports = {
    filterSales,
    filterPayments,
    filterProducts,
    
}