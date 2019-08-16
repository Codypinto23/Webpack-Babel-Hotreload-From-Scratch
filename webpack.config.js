const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //creates our index.html file
const TerserPlugin  = require('terser-webpack-plugin');


module.exports = (env)=> {
    const isDevelopment = env.development === true;
    const isProduction = env.production === true;
    console.log("is development",isDevelopment)
return{
    //Better debugging
    devtool: isDevelopment ? "inline-source-map": "",
    //Our react code location
    entry: './src/index.js',
    //Where our compiled code goes (including imported components)
    //__dirname means current directory
   output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        historyApiFallback: true,
        publicPath: '/'
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
        minimizer: [new TerserPlugin()],
        //SplitChunks lets you define various caching groups.
        //we set test to contain all modules whose path contains node_modules in it.
        // When a chunk name is matched, all modules in that chunk are selected
        splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
    },
    node: {
        fs: 'empty',
        net:'empty',
        tls:'empty'

      }
    }
};
