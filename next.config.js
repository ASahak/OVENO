require('dotenv').config();
const path = require('path');
const Dotenv = require('dotenv-webpack');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const resourcesLoader = {
    loader: 'sass-resources-loader',
    options: {
        resources: [
            './static/styles/_variables.scss',
            './static/styles/_mixins.scss',
            './static/styles/_medias.scss',
        ]
    }
};
module.exports = withSass(withCss({
    cssModules: true,
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        });
        config.module.rules.map(rule => {
            if (
                rule.test.source.includes('scss') ||
                rule.test.source.includes('sass')
            ) {
                rule.use.push(resourcesLoader);
            }
        });
        config.plugins = config.plugins || [];
        config.plugins = [
            ...config.plugins,
            // Read the .env file
            new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true
            })
        ];

        config.resolve.alias['components'] = path.join(__dirname, 'components');
        config.resolve.alias['utils'] = path.join(__dirname, 'utils');
        config.resolve.alias['static'] = path.join(__dirname, 'static');
        config.resolve.alias['hooks'] = path.join(__dirname, 'hooks');
        config.resolve.alias['assets'] = path.join(__dirname, 'assets');
        config.resolve.alias['store'] = path.join(__dirname, 'store');
        config.resolve.alias['lib'] = path.join(__dirname, 'lib');
        return config;
    }
}));
