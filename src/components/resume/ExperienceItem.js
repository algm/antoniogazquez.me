import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { ExternalLink } from 'react-feather';
import Img from 'gatsby-image';

const ExperienceItem = ({ children, img, title, position, from, to, url }) => {
    let positionContent = null;
    let titleContent = title;

    if (position) {
        positionContent = `${position} - `;
    }

    if (url) {
        titleContent = (
            <a
                className="text-blue hover:text-blue-dark no-underline"
                href={url}
                target="_blank"
                rel="noreferrer"
                title={title}
            >
                {title}
                <ExternalLink
                    size={12}
                    className="inline-block align-text-bottom ml-1"
                />
            </a>
        );
    }

    return (
        <div className="my-4 mb-8 md:my-8">
            <article>
                <div className="px-8 md:flex md:justify-start md:items-center md:content-center md:text-base">
                    <div className="md:pr-4 md:pl-0">
                        <Img
                            {...img}
                            alt={title}
                            className="h-auto w-24 md:w-48 md:max-h-full rounded-lg mb-2"
                        />
                    </div>
                    <div className="md:w-3/4 md:pl-4 md:flex-1">
                        <h3 className="text-2xl font-medium text-blue">
                            {titleContent}
                        </h3>

                        <p className="text-grey-dark text-sm">
                            {positionContent} Desde el{' '}
                            {moment(from).format('LL')} hasta{' '}
                            {to == 'now'
                                ? 'hoy'
                                : `el ${moment(to).format('LL')}`}{' '}
                        </p>
                        <div>{children}</div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default ExperienceItem;
