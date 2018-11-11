import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { ExternalLink } from 'react-feather';

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
        <div className="my-8">
            <article>
                <div className="flex justify-start items-center content-center text-base">
                    <div className="pr-4">
                        <img
                            src={img}
                            alt={title}
                            className="w-48 max-h-full  rounded-lg"
                        />
                    </div>
                    <div className="w-3/4 pl-4 flex-1">
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
