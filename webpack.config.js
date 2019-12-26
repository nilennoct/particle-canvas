const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        app: './src/index.tsx',
    },
    output: {
        path: path.resolve('dist'),
        libraryTarget: 'var',
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    onlyCompileBundledFiles: true,
                },
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.less'],
    },
};
