import React from 'react';
import Gravatar from 'react-gravatar';
import { Link } from 'gatsby';
import { Twitter, Facebook, Linkedin, GitHub, Gitlab } from 'react-feather';

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
                        <a
                            className="inline-block text-grey-dark hover:text-grey-darker mr-1"
                            href="https://github.com/algm"
                            target="_blank"
                        >
                            <GitHub size={16} />
                        </a>
                        <a
                            className="inline-block text-grey-dark hover:text-grey-darker mr-1"
                            href="https://gitlab.com/algm"
                            target="_blank"
                        >
                            <Gitlab size={16} />
                        </a>
                        <a
                            className="inline-block text-grey-dark hover:text-grey-darker mr-1"
                            href="https://twitter.com/algm85"
                            target="_blank"
                        >
                            <Twitter size={16} />
                        </a>
                        <a
                            className="inline-block text-grey-dark hover:text-grey-darker mr-1"
                            href="https://www.facebook.com/agazquezmegias"
                            target="_blank"
                        >
                            <Facebook size={16} />
                        </a>
                        <a
                            className="inline-block text-grey-dark hover:text-grey-darker mr-1"
                            href="https://www.linkedin.com/in/antonio-g%C3%A1zquez-19341a18/"
                            target="_blank"
                        >
                            <Linkedin size={16} />
                        </a>
                    </div>
                </header>
            </aside>
        </div>

        <div className="w-3/4 p-2">{children}</div>
    </div>
);

export default BlogLayout;
