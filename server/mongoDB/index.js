require('dotenv').config();

const username = process.env.DB_USERNAME;
const password = encodeURIComponent(process.env.DB_PASSWORD);
const clusterUrl = process.env.DB_CLUSTER_URL;
const appName = process.env.DB_APPNAME;
const dbName = process.env.DB_NAME
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority&appName=${appName}`;
module.exports = uri;