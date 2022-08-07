/********************** add a url for whitelist access **************************/
/******** any url that doesnt exit in here doesnt have access to the api ********/

const allowedOrigins = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5500',
    'http://localhost:3000',
    'http://localhost:3500',
];

module.exports = allowedOrigins;