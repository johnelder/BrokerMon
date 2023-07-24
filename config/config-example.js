exports.server = {
    port: 3000,
    baseUrl: 'https://bp.techunlimitedgroup.com',
    /*DO NOT include port in baseUrl if you are behind a proxy! */
    sslKey: '/etc/ssl/virtualmin/16623461872365749/ssl.key',
    sslCert: '/etc/ssl/virtualmin/16623461872365749/ssl.cert'
};

exports.options = {
    compileSass: false,
    testDBConnection: true
};

exports.db = {
    /* `dialect: ‘mysql’, ‘mariadb’, ‘postgres’, ‘mssql’ */
    dialect: "mariadb",
    host: "localhost",
    port: "3306",
    databaseName: 'bp',
    username: "boilerplate",
    password: "boilerplate1234",
    logging: console.log(),

};