import React from 'react';
import Gravatar from 'react-gravatar';
import { Link } from 'gatsby';

import SocialLinks from '../components/SocialLinks';

const BlogLayout = ({ children }) => (
    <div className="container m-auto my-2 md:my-8 md:flex">
        <div className="md:w-64 py-2 px-8 md:p-2 max-h-screen md:sticky md:pin-t bg-grey-lightest">
            <aside>
                <header>
                    <div className="flex justify-center md:justify-start content-center md:content-start items-center ">
                        <div className="max-w-1/4 text-center">
                            <Gravatar
                                email="piticonejo@gmail.com"
                                className="rounded-full"
                            />
                        </div>
                        <div className="pl-4">
                            <h1 className="text-lg">
                                <Link
                                    to="/"
                                    className="text-grey-darkest no-underline hover:text-grey-darker"
                                >
                                    Antonio Gázquez
                                </Link>
                            </h1>
                            <p className="text-sm text-grey-dark">
                                Desarrollador web
                            </p>
                        </div>
                    </div>
                    <div className="my-2 font-sm text-center md:text-left">
                        <SocialLinks />
                    </div>
                </header>
            </aside>
        </div>

        <div className="md:w-3/4 p-2">{children}</div>
    </div>
);

export default BlogLayout;
