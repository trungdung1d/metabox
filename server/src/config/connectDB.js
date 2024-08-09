const sql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        const config = {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            server: process.env.DB_SERVER,
            database: process.env.DB_DATABASE,
            // connectionTimeout: 50000,
            // requestTimeout: 50000,
            options: {
                //instanceName: process.env.DB_INSTANCE, 
                encrypt: false,     
                trustServerCertificate: true,
                trustedConnection: false,
                enableArithAbort: true
            },
            port: 1433
        };

        await sql.connect(config)
        console.log('Kết nối thành công với SQL Server')
    } catch (error) {
        console.log(`Error: ${error.message}`);
        await sql.close();
        process.exit(1);
    }
}

module.exports = connectDB;
