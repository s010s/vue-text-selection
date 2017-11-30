const path = require('path');

module.exports = {
    entry: './selection.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'v-selection.js',
        library: 'selection',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};