var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = [{
    name: "flight-app",
    entry: ['./js/index.js'],
    output: {
        filename: 'my-flight-app.js'
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style','css!sass')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ],
    resolve: {
        extensions: ['', '.js']
    }
}]