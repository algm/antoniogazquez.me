import React from 'react';
import { Parallax } from 'react-parallax';
import background from '../../static/img/header-bg.jpg';
import SocialLinks from './SocialLinks';

const Intro = () => (
    <header>
        <Parallax
            bgImage={background}
            strength={400}
            className="h-screen bg-black text-white p-0 m-0 bg-cover bg-center"
            bgClassName="h-screen fit-cover"
        >
            <div className="h-screen w-screen flex content-center justify-center items-center radial-overlay">
                <div className="leading-loose text-center">
                    <p className="italic text-lg text-grey-light">¡Hola! Soy</p>
                    <h1 className="md:text-5xl font-medium tracking-wide uppercase side-borders relative">
                        Antonio Gázquez
                    </h1>
                    <p>Desarrollador web</p>
                    <p className="text-center">
                        <SocialLinks
                            size={16}
                            color="grey-light"
                            hoverColor="white"
                        />
                    </p>
                </div>
            </div>
        </Parallax>
    </header>
);

export default Intro;
