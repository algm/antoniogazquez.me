import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import CookieConsent from 'react-cookie-consent';
import './all.css';

const TemplateWrapper = ({ children }) => (
    <div>
        <Helmet title="Antonio Gázquez" />
        <Fragment>{children}</Fragment>

        <CookieConsent
            location="bottom"
            buttonText="Vale!"
            cookieName="cookie_consent"
        >
            Este sitio utiliza cookies para mejorar la experiencia del usuario.
            Necesitamos que aceptes este mensaje para que podamos dejar de
            molestarte.
        </CookieConsent>
    </div>
);

export default TemplateWrapper;
