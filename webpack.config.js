const path = require('path');
module.exports = {
    entry: path.join(__dirname, './client/index.js'),
    output: {
        filename: 'main.js',
        path: path.join(__dirname, './dist'),
    },
    mode: "development",
    node: {
        fs: "empty"
     },
    devtool: 'source-map',
    module: {
        rules: [
            {
            use: {
                loader: 'babel-loader'
            },
            exclude: /node_modules/,
            },
            {
                test: /\.css/i,
                use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    
                  }
                ]
              }
        ]
    }
};