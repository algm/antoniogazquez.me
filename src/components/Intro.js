import React from 'react';
import { Parallax } from 'react-parallax';
import SocialLinks from './SocialLinks';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Intro = () => (
    <StaticQuery
        query={graphql`
            query HomeImages {
                cartoon: file(relativePath: { eq: "cartoon_1.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 500, quality: 90) {
                            ...GatsbyImageSharpFluid_withWebp_tracedSVG
                        }
                    }
                }
                background: file(relativePath: { eq: "header-bg.jpg" }) {
                    childImageSharp {
                        fluid(maxWidth: 2600, quality: 88) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        `}
        render={({ cartoon, background }) => (
            <header>
                <Parallax
                    bgImage={background.childImageSharp.fluid.src}
                    strength={400}
                    className="h-screen bg-black text-white p-0 m-0 bg-cover bg-center"
                    bgClassName="h-screen fit-cover"
                >
                    <div className="h-screen w-screen flex content-center justify-center items-center radial-overlay">
                        <div className="leading-loose text-center">
                            <Img
                                className="block mb-2"
                                alt="Cartoon"
                                key={cartoon.childImageSharp.fluid.src}
                                fluid={cartoon.childImageSharp.fluid}
                            />
                            <p className="italic text-lg text-grey-light">
                                ¡Hola! Soy
                            </p>
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
        )}
    />
);

export default Intro;
