const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

let mode = 'development';

if (process.env.NODE_ENV === 'production') mode = 'production';

console.log(`starting in ${mode} mode`)

module.exports = {
    mode: mode,
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: './index.js'
    },
    resolve: {
        alias: {
            Pug: path.resolve(__dirname, 'src/pug/'),
            Styles: path.resolve(__dirname, 'src/styles/'),
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "assets/[hash][ext][query]",
        filename: '[name].[contenthash].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./index.pug" }),
        new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    ],
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [

            // HTML LOADER
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            //CSS AND SCSS LOADER
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },

            // IMAGES
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: mode === 'production' ? 'asset' : 'asset/resource',
                // В продакшен режиме
                // изображения размером до 8кб будут инлайнится в код
                // В режиме разработки все изображения будут помещаться в dist/assets
            },
            // FONTS
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                exclude: /(node_modules|bower_components)/,
            },

            {
                test: /\.m?js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }

        ]
    },

    // optimization: {
    //     minimizer: [
    //         // "...",
    //         new ImageMinimizerPlugin({
    //             generator: [{
    //                 // You can apply generator using `?as=webp`, you can use any name and provide more options
    //                 preset: "webp",
    //                 implementation: ImageMinimizerPlugin.squooshGenerate,
    //                 options: {
    //                     encodeOptions: {
    //                         // Please specify only one codec here, multiple codecs will not work
    //                         webp: {
    //                             quality: 90,
    //                         },
    //                     },
    //                 },
    //             }, ],
    //         }),
    //     ],
    // },
}