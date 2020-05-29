/*
 * File: webpack.config.js
 * Desc: 描述
 * File Created: 2020-04-23 14:04:06
 * Author: chenghao
 * ------
 * Copyright 2020 - present, chenghao
 */
'use stric';
const path = require('path');
const paths = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

// style files regexes
const cssRegex = /\.css$/;
// const sassRegex = /\.(scss|sass)$/;
// const lessRegex = /\.less$/;

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        require.resolve('style-loader'),
        {
            loader: MiniCssExtractPlugin.loader,
            // options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
        },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                            flexbox: 'no-2009',
                        },
                        stage: 3,
                    }),
                ],
            },
        },
    ];
    if (preProcessor) {
        loaders.push({
            loader: require.resolve(preProcessor),
        });
    }
    return loaders;
};

module.exports = function (webpackEnv = 'development') {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    return {
        mode: webpackEnv,
        entry: paths.appIndexJs,
        devtool: 'cheap-module-source-map',
        output: {
            path: paths.appBuild,
            filename: '[name].chunk.js',
            libraryTarget: 'umd',
        },
        optimization: {
            minimize: isEnvProduction,
            minimizer: [new TerserPlugin()],
        },
        externals: require('./externals'),
        module: {
            rules: [
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    enforce: 'pre',
                    use: [
                        {
                            options: {
                                cache: true,
                                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                                eslintPath: require.resolve('eslint'),
                                // resolvePluginsRelativeTo: path.resolve('../'),
                                resolvePluginsRelativeTo: __dirname,
                                // configFile: path.resolve(__dirname, '.eslintrc.js'),
                                // extends: [require.resolve('eslint-config-react-app')]
                            },
                            loader: require.resolve('eslint-loader'),
                        },
                    ],
                    include: paths.appSrc,
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                customize: require.resolve(
                                    'babel-preset-react-app/webpack-overrides'
                                ),
                            },
                        },
                        'ts-loader',
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: cssRegex,
                    use: getStyleLoaders({
                        importLoaders: 1,
                    }),
                    sideEffects: true,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') },
            }),
            new ManifestPlugin(),
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].css',
                chunkFilename: 'static/css/[name].chunk.css',
            }),
        ],
    };
};
