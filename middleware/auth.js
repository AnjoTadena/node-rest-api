function auth (request, response, next) {
    console.log('Authenticating...');

    next();
}

module.exports = auth;
