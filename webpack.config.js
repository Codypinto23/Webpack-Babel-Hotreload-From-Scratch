const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //creates our index.html file
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    //Our react code location
    entry: './src/index.js',
    //Where our compiled code goes (including imported components)
    //__dirname means current directory
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    },
    //Here we specify our loader
    module: {
        rules: [
            {
                test: /\.js$/, //takes a regular expression, looks for JS files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html' //looks at this file as our template
        })
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    }
};