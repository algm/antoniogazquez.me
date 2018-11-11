import React from 'react';
import linkedin from '../../static/img/linkedin.jpg';

const Footer = () => (
    <footer>
        <div className="mx-auto px-4 mt-8 max-w-md w-full text-center mb-16">
            <p className="grey-dark">
                Si quieres ponerte en contacto conmigo, puedes usar mi{' '}
                <a
                    className="text-blue"
                    target="_blank"
                    href="https://www.linkedin.com/in/antonio-g%C3%A1zquez-19341a18/"
                >
                    LinkedIn
                </a>
            </p>
            <p className="mt-4">
                <a
                    target="_blank"
                    href="https://www.linkedin.com/in/antonio-g%C3%A1zquez-19341a18/"
                >
                    <img src={linkedin} alt="linkedin" className="w-16" />
                </a>
            </p>
        </div>
    </footer>
);

export default Footer;
