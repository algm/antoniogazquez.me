import React from 'react';
import PropTypes from 'prop-types';

export default class HTML extends React.Component {
    render() {
        return (
            <html
                {...this.props.htmlAttributes}
                className="bg-grey-lightest antialiased"
                lang="es"
            >
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <meta httpEquiv="Content-Language" content="es" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    {this.props.headComponents}
                </head>
                <body
                    {...this.props.bodyAttributes}
                    className="font-sans font-normal text-grey-darkest leading-normal"
                >
                    {this.props.preBodyComponents}
                    <div
                        key={'body'}
                        id="___gatsby"
                        dangerouslySetInnerHTML={{ __html: this.props.body }}
                    />
                    {this.props.postBodyComponents}
                </body>
            </html>
        );
    }
}

HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
};
