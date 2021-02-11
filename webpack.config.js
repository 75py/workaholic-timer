module.exports = {
    entry: './serviceworker/service-worker.js',
    output: {
        path: __dirname + '/dist',
        filename: 'service-worker.js'
    }
};