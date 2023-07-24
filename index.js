'use strict'

//UTILITY
const fs = require('fs');

const config = require('./config/config.js');
const Events = require('events');

//EXPRESS SERVER
const express = require('express');
const app = express();
const https = require('https');
const sockets = require('./src/core/sockets');
const port = config.server.port || 3000;

var server = https.createServer({
    key: u.fs.readFileSync(config.server.sslKey),
    cert: u.fs.readFileSync(config.server.sslCert),
}, app);

server.on('listening', function() {
    console.info('----------------- SERVER STARTED -----------------')
    console.info("Listening on " + (config.server.baseUrl || "localhost") + ':' + port)
    console.info('node:', process.version)
    console.info('--------------------------------------------------')
    console.info(' ')
    if (r.config.options.debugMode) {
        console.warn('************** DEBUG MODE ON **************')
    }
})



var r = {};
var alterSync = true;
var sync = true;

async function startup() {
    console.info('----------------- SERVER STARTING ----------------')
    //Setup object to pass loaded modules to other modules.
    r = {
        events: new Events.EventEmitter(),
        plugins: require('./src/plugins'),
        ejs: require('ejs'),
        themes: require('./src/themes'),
        // panel: require('./src/core/panel.js'),
        users: require('./src/users'),
        server: server,
        app: app,
        sequelize: sequelize,
        config: config, //TODO CHANGE THIS UGLY DUPLICATE
        opt: config.options,
        associations: [],
        u: u,
    };

    //app.js is app configuration
    require('./src/app')(r);
    require('./src/users/user.auth')(r);
    require('./src/core/sockets')(r);

    // r.io = require('./src/core/sockets')(r);
    // r.app = require('./src/app')(r)



    /**
     * Add external services init as async operations (db, redis, etc...)
     * e.g.
     * await sequelize.authenticate()
     */

    if (r.config.options.testDBConnection) {
        try {
            await r.sequelize.authenticate();
            console.info('Database Connection has been established successfully.');
            r.sequelize.close()
        } catch (error) {
            console.warn('Unable to connect to the database:', error);
        }
    }

    //Compile SASS/SCSS
    if (r.config.options.compileSass) {
        // u.findFile(process.cwd() + "/src/themes", /\.scss$/, async function(filename) {
        //     if (filename.includes('theme.scss') || filename.includes('custom.scss')) {
        //         // const styleResult = await sassRenderPromise({
        //         //     file: filename,
        //         //     outFile: filename.replace('.scss', '.css'),
        //         // });
        //         // writeFilePromise(filename.replace('.scss', '.css'), styleResult.css, "utf8");
        //     }
        // });
        const styleResult = await sassRenderPromise({
            file: `${process.cwd()}/src/sass/style.scss`,
            outFile: `${process.cwd()}/public/css/core-style.css`,
        });
        writeFilePromise(`${process.cwd()}/public/css/core-style.css`, styleResult.css, "utf8");
    }

    return r;
}





startup()
    .then(r => {
        server.listen(port)
        return r;
    })
    .then((r) => {
        //Scan plugins
        r.plugins.scan(r);
        r.themes.scan(r);
        return r
    })
    .then(async r => {
        await r.plugins.loadPlugins(r);
        r.themes.loadThemes(r);
        return r;
    })
    .then(async (r) => {
        console.log('load models')
        await r.users.loadModels(r);
        await r.plugins.loadModels(r);
        r.plugins.loadAssociations(r)
        return r;
    })
    .then(async (r) => {
        //load middleware
        r.plugins.loadMiddleware(r);
        return r;
    })
    .then(async r => {

        return r;
    })
    .then(async r => {
        //load routes
        await r.plugins.loadRoutes(r);
        await r.users.loadRoutes(r);
        require('./src/core/routes')(r);


        return r;
    })
    .catch(error => {
        console.warn('Server Error:');
        console.warn(error);
    })
    .finally(async () => {







        //Sync Models
        if (sync) {
            console.info('SYNCING', r.sequelize.models)
            try {
                console.info('STARTING SYNC')
                console.log(r.sequelize.models)
                r.sequelize.sync({
                    force: false,
                    alter: alterSync
                }).catch(err => {
                    console.warn("CATCH SYNC ERROR")
                    throw err;

                });
                console.info('MODELS SYNCED')
            } catch (err) {
                console.warn("SYNC ERROR")
                console.warn(err)
            }
        } else {
            console.info('MODELS SYNC SKIPPED')
        }
    });







// setInterval(function() {
//     // console.info('CURRENT SOCKETS')
//     var socks = [];
//     for (const sock of r.io.sockets.sockets) {
//         if (sock.request) {
//             socks.push(sock[1].request.user.id + ": " + sock[1].request.user.firstName + " " + sock[1].request.user.lastName)
//         } else {
//             socks.push('Public Viewer')
//         }
//         // console.info()
//     }
//     if (socks.length > 0) {
//         console.info('ONLINE', socks)
//     } else {
//         // console.info('ONLINE', 'NONE')
//     }
// }, 10000)