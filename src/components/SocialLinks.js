import React, { Fragment } from 'react';
import { Twitter, Facebook, Linkedin, GitHub, Gitlab } from 'react-feather';

const SocialLinks = ({ size, color, hoverColor }) => (
    <Fragment>
        <a
            className={`inline-block text-${
                color ? color : 'grey-dark'
            } hover:text-${hoverColor ? hoverColor : 'grey-darker'} mr-2`}
            href="https://github.com/algm"
            target="_blank"
            rel="noreferrer"
        >
            <GitHub size={size ? size : 16} />
        </a>
        <a
            className={`inline-block text-${
                color ? color : 'grey-dark'
            } hover:text-${hoverColor ? hoverColor : 'grey-darker'} mr-2`}
            href="https://gitlab.com/algm"
            target="_blank"
            rel="noreferrer"
        >
            <Gitlab size={size ? size : 16} />
        </a>
        <a
            className={`inline-block text-${
                color ? color : 'grey-dark'
            } hover:text-${hoverColor ? hoverColor : 'grey-darker'} mr-2`}
            href="https://twitter.com/algm85"
            target="_blank"
            rel="noreferrer"
        >
            <Twitter size={size ? size : 16} />
        </a>
        <a
            className={`inline-block text-${
                color ? color : 'grey-dark'
            } hover:text-${hoverColor ? hoverColor : 'grey-darker'} mr-2`}
            href="https://www.facebook.com/agazquezmegias"
            target="_blank"
            rel="noreferrer"
        >
            <Facebook size={size ? size : 16} />
        </a>
        <a
            className={`inline-block text-${
                color ? color : 'grey-dark'
            } hover:text-${hoverColor ? hoverColor : 'grey-darker'} mr-2`}
            href="https://www.linkedin.com/in/antonio-g%C3%A1zquez-19341a18/"
            target="_blank"
            rel="noreferrer"
        >
            <Linkedin size={size ? size : 16} />
        </a>
    </Fragment>
);

export default SocialLinks;
