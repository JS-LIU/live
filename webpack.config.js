const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 9000,
        proxy:{
            "/api":{
                target: 'http://api-test.sscoding.com',
                secure: false,
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        return '/index.html';
                    }
                    if (req.headers.accept.indexOf('css') !== -1) {
                        return '/src/Util/base.css';
                    }
                    if (req.headers.accept.indexOf('images') !== -1) {
                        return req.url;
                    }
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(js|jsx)$/,
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react']
                    }
                }
            }
        ]
    }
};