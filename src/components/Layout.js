import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import CookieConsent from 'react-cookie-consent';
import Footer from './Footer';
import './all.css';

const TemplateWrapper = ({ children }) => (
    <div>
        <Helmet
            title="Home"
            titleTemplate={'%s - Antonio Gázquez'}
            description="Desarrollador web"
        >
            <meta
                name="description"
                content="Web personal de Antonio Gázquez"
            />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Antonio Gázquez" />
            <meta property="og:site_name" content="AntonioGázquez" />
            <meta property="og:url" content="https://antoniogazquez.me/" />
            <meta
                property="og:description"
                content="Web personal de Antonio Gázquez"
            />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/img/header-bg.jpg" />
            <meta name="og:locale" content="es_ES" />
            <link rel="canonical" href="https://antoniogazquez.me/" />
        </Helmet>
        <Fragment>{children}</Fragment>
        <Footer />
        <CookieConsent
            location="bottom"
            buttonText="¡Vale!"
            cookieName="cookie_consent"
        >
            Este sitio utiliza cookies para mejorar la experiencia del usuario.
            Necesitamos que aceptes este mensaje para que podamos dejar de
            molestarte.
        </CookieConsent>
    </div>
);

export default TemplateWrapper;
