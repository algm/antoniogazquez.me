import React from 'react';
import Gravatar from 'react-gravatar';
import { Link } from 'gatsby';

import SocialLinks from '../components/SocialLinks';

const BlogLayout = ({ children }) => (
    <div className="container m-auto my-8 flex">
        <div className="w-64 p-2 max-h-screen sticky pin-t">
            <aside>
                <header className="sticky pin-t">
                    <div className="flex justify-start content-start items-start">
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
                    <div className="my-2 font-sm">
                        <SocialLinks />
                    </div>
                </header>
            </aside>
        </div>

        <div className="w-3/4 p-2">{children}</div>
    </div>
);

export default BlogLayout;
