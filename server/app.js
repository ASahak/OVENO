const express = require('express');
const loaders = require('./loaders');
const http = require('http');
const { port } = require('./config');

class App {
    static async start () {
        this.app = express();
        await loaders.init({expressApp: this.app});

        const server = http.createServer(this.app);


        server.listen(port, () => {
            console.info(`Listening ${server.address().port} port`);
        });
    }

}
App.start();
