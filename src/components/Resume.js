import React from 'react';
import ExperienceItem from './resume/ExperienceItem';
import cbi from './img/cbi.png';
import redegal from './img/redegal.png';
import firstSteps from './img/first-steps.jpg';
import moment from 'moment';

const Resume = () => {
    return (
        <section>
            <div className="bg-white pt-6 pb-16">
                <div className="mx-auto mt-8 max-w-lg w-full">
                    <div className="text-center">
                        <h2 className="inline-block text-3xl font-semibold mw-full mx-auto side-borders side-borders-dark">
                            Dónde he trabajado hasta ahora
                        </h2>
                    </div>

                    <div className="container">
                        <ExperienceItem
                            img={redegal}
                            url="https://redegal.com"
                            title="Redegal"
                            position="Senior developer"
                            from={moment('2018-05-14')}
                            to="now"
                        >
                            <p>
                                Desde mayo de 2018 me incorporo a Redegal, donde
                                aporto mi experiencia en proyectos de ecommerce
                                con Magento, Prestashop y desarrollos a medida
                                con Laravel y otras muchas tecnologías.
                            </p>
                        </ExperienceItem>
                        <ExperienceItem
                            img={cbi}
                            title="CBI"
                            url="https://cbiconsulting.es"
                            position="Technical Manager"
                            from={moment('2011-03-14')}
                            to={moment('2018-05-04')}
                        >
                            <p>
                                Dirección de un equipo de hasta 7 programadores,
                                programación de un framework PHP basado en
                                CakePHP 2.x, creación de una aplicación de
                                gestión SaaS utilizada en varias de las grandes
                                compañías españolas y en expansión. Realización
                                de una red social de pacientes crónicos de habla
                                hispana y otros muchos proyectos menores.
                            </p>
                        </ExperienceItem>
                        <ExperienceItem
                            img={firstSteps}
                            title="Primeros años"
                            from={moment('2002-05-01')}
                            to={moment('2011-03-14')}
                        >
                            <p>
                                Empecé a programar a los 16 años cuando aún
                                estaba cursando bachillerato. Comencé con C++ y
                                PHP y pronto decidí que lo que me gustaba era la
                                web. Hice algunos proyectos por mi cuenta entre
                                2005 y 2010 hasta que en 2011 decidí trabajar
                                por cuenta ajena.
                            </p>
                        </ExperienceItem>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;
