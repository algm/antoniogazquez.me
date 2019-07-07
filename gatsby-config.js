var tailwindcss = require('tailwindcss');

module.exports = {
    siteMetadata: {
        title: 'Antonio Gázquez',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-plugin-postcss',
            options: {
                postCssPlugins: [
                    require('postcss-preset-env')({ stage: 0 }),
                    tailwindcss('./tailwind.js'),
                    require('autoprefixer'),
                ],
            },
        },

        {
            // keep as first gatsby-source-filesystem plugin for gatsby image support
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/static/img`,
                name: 'uploads',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/pages`,
                name: 'pages',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/img`,
                name: 'images',
            },
        },
        'gatsby-remark-copy-linked-files',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-component',
                    },
                    {
                        resolve: 'gatsby-remark-relative-images',
                        options: {
                            name: 'uploads',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 2048,
                            quality: 75,
                            withWebp: true,
                            imageClass: 'block mx-auto my-6',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-prismjs',
                        options: {
                            // Class prefix for <pre> tags containing syntax highlighting;
                            // defaults to 'language-' (eg <pre class="language-js">).
                            // If your site loads Prism into the browser at runtime,
                            // (eg for use with libraries like react-live),
                            // you may use this to prevent Prism from re-processing syntax.
                            // This is an uncommon use-case though;
                            // If you're unsure, it's best to use the default value.
                            classPrefix: 'font-mono bg-black language-',
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            // This separator is a string and will do no white-space
                            // stripping.
                            // A suggested value for English speakers is the non-ascii
                            // character '›'.
                            inlineCodeMarker: null,
                            // This lets you set up language aliases.  For example,
                            // setting this to '{ sh: "bash" }' will let you use
                            // the language "sh" which will highlight using the
                            // bash highlighter.
                            aliases: {},
                            // This toggles the display of line numbers alongside the code.
                            // To use it, add the following line in src/layouts/index.js
                            // right after importing the prism color scheme:
                            //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
                            // Defaults to false.
                            showLineNumbers: false,
                            // If setting this to true, the parser won't handle and highlight inline
                            // code used in markdown i.e. single backtick code like `this`.
                            noInlineHighlight: true,
                        },
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-netlify-cms',
            options: {
                modulePath: `${__dirname}/src/cms/cms.js`,
            },
        },
        'gatsby-plugin-netlify', // make sure to keep it last in the array
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Antonio Gázquez',
                short_name: 'Antonio Gázquez',
                start_url: '/',
                background_color: '#f8fafc',
                theme_color: '#3d4852',
                icon: 'src/img/icon.jpg',
            },
        },
        {
            resolve: 'gatsby-plugin-google-fonts',
            options: {
                fonts: ['Cabin'],
                display: 'swap',
            },
        },
    ],
};
