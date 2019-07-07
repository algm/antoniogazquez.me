import React from 'react';
import ExperienceItem from './resume/ExperienceItem';
import moment from 'moment';
import { StaticQuery, graphql } from 'gatsby';
const Resume = () => {
    return (
        <StaticQuery
            query={graphql`
                query ExpImages {
                    redegal: file(relativePath: { eq: "redegal.png" }) {
                        childImageSharp {
                            fluid(maxWidth: 250, quality: 90) {
                                ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                presentationWidth
                            }
                        }
                    }
                    cmrad: file(relativePath: { eq: "cmrad.png" }) {
                        childImageSharp {
                            fluid(maxWidth: 250, quality: 90) {
                                ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                presentationWidth
                            }
                        }
                    }
                    cbi: file(relativePath: { eq: "cbi.png" }) {
                        childImageSharp {
                            fluid(maxWidth: 250, quality: 90) {
                                ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                presentationWidth
                            }
                        }
                    }
                    firstSteps: file(relativePath: { eq: "first-steps.jpg" }) {
                        childImageSharp {
                            fluid(maxWidth: 250, quality: 90) {
                                ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                presentationWidth
                            }
                        }
                    }
                }
            `}
            render={({ redegal, cmrad, cbi, firstSteps }) => (
                <section>
                    <div className="bg-white pt-6 pb-16">
                        <div className="mx-auto md:mt-8 max-w-lg w-full">
                            <div className="text-center">
                                <h2 className="inline-block text-2xl md:text-3xl font-semibold mw-full mx-auto side-borders side-borders-dark">
                                    Dónde he trabajado hasta ahora
                                </h2>
                            </div>

                            <div className="container">
                                <ExperienceItem
                                    img={cmrad.childImageSharp}
                                    url="https://www.cmrad.com"
                                    title="Collective Minds Radiology"
                                    position="Senior Full-stack developer"
                                    from={moment('2019-05-13')}
                                    to="now"
                                >
                                    <p>
                                        En mayo de 2019 empiezo a trabajar para
                                        esta startup sueca en la que
                                        desarrollamos un producto que ayuda a
                                        los radiólogos de todo el mundo a
                                        colaborar en sus análisis y diagnósticos
                                        a través de Internet.
                                    </p>
                                </ExperienceItem>
                                <ExperienceItem
                                    img={redegal.childImageSharp}
                                    url="https://redegal.com"
                                    title="Redegal"
                                    position="Senior developer"
                                    from={moment('2018-05-14')}
                                    to={moment('2019-05-10')}
                                >
                                    <p>
                                        Desde mayo de 2018 me incorporo a
                                        Redegal, donde aporto mi experiencia en
                                        proyectos de ecommerce con Magento,
                                        Prestashop y desarrollos a medida con
                                        Laravel y otras muchas tecnologías.
                                    </p>
                                </ExperienceItem>
                                <ExperienceItem
                                    img={cbi.childImageSharp}
                                    title="CBI"
                                    url="https://cbiconsulting.es"
                                    position="Technical Manager"
                                    from={moment('2011-03-14')}
                                    to={moment('2018-05-04')}
                                >
                                    <p>
                                        Dirección de un equipo de hasta 7
                                        programadores, programación de un
                                        framework PHP basado en CakePHP 2.x,
                                        creación de una aplicación de gestión
                                        SaaS utilizada en varias de las grandes
                                        compañías españolas y en expansión.
                                        Realización de una red social de
                                        pacientes crónicos de habla hispana y
                                        otros muchos proyectos menores.
                                    </p>
                                </ExperienceItem>
                                <ExperienceItem
                                    img={firstSteps.childImageSharp}
                                    title="Primeros años"
                                    from={moment('2002-05-01')}
                                    to={moment('2011-03-14')}
                                >
                                    <p>
                                        Empecé a programar a los 16 años cuando
                                        aún estaba cursando bachillerato.
                                        Comencé con C++ y PHP y pronto decidí
                                        que lo que me gustaba era la web. Hice
                                        algunos proyectos por mi cuenta entre
                                        2005 y 2010 hasta que en 2011 decidí
                                        trabajar por cuenta ajena.
                                    </p>
                                </ExperienceItem>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        />
    );
};

export default Resume;
