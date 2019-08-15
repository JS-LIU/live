/**
 * Created by Liudq on 2019-08-15
 */
const path = require('path');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
module.exports = {
    entry: {
        main:[
            './src/index.js',
            "babel-polyfill"
        ],
        vendor:[
            "qrcode.react",
            "rc-calendar",
            "react",
            "react-dom",
            "react-paginate",
            "react-router",
            "react-router-dom"
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
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
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
};