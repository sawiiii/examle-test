const axios = require('axios');

function getData(){
    axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')
        .then(response => {
            // console.log(response.data[1].products);
            // var data = response.data;
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
};


const data = (function() {
    axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')
        .then(response => {
            console.log(response.data[1].products);
            const data = response.data;
            return data;
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = {

    async get_info(req, res) {
        var data = '';
        await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')
        .then(response => {
            // console.log(response.data[1].products);
            data = response.data;
        })
        .catch(error => {
            console.log(error);
        });
        console.log(data);
        res.status(200).send(data[0].zone);
    }
  }
  