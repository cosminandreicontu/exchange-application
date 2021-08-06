const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    externals: {
        'Config': JSON.stringify("http://localhost:8081/")
    },
    devtool: 'inline-source-map',
    devServer: {
        hot:true
    },


};