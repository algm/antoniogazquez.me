import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { ChevronRight } from 'react-feather';

const PostPreview = ({ post }) => (
    <article>
        <div className="md:flex md:justify-between md:content-center md:items-center mb-4 md:mb-8">
            <div className="md:w-2/3">
                <h3 className="font-light text-2xl">
                    <Link
                        className="no-underline text-blue hover:text-blue-dark"
                        to={post.fields.slug}
                    >
                        {post.frontmatter.title}
                    </Link>
                </h3>
                <p className="text-grey-dark">
                    Publicado el {post.frontmatter.date}
                </p>

                <div className="mb-3 text-lg">{post.excerpt}</div>
                <p>
                    <Link
                        className="text-blue hover:text-blue-dark no-underline inline-block rounded"
                        to={post.fields.slug}
                    >
                        <span className="inline-block align-middle">
                            Seguir leyendo
                        </span>{' '}
                        <ChevronRight
                            size={14}
                            className="text-grey-dark inline-block align-middle"
                        />
                    </Link>
                </p>
            </div>
            <div className="md:w-1/3 md:pl-4 invisible hidden md:visible md:block">
                <Img
                    key={post.frontmatter.image.publicURL}
                    className="rounded-lg"
                    fluid={post.frontmatter.image.childImageSharp.fluid}
                />
            </div>
        </div>
    </article>
);

export default PostPreview;
