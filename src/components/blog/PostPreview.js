import React from 'react';
import { Link, Img } from 'gatsby';

const PostPreview = ({ post }) => (
    <article>
        <div className="flex justify-between content-center items-center mb-16">
            <div className="w-2/3">
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
                        className="bg-blue hover:bg-blue-dark text-white no-underline p-2 inline-block rounded"
                        to={post.fields.slug}
                    >
                        Seguir leyendo
                    </Link>
                </p>
            </div>
            <div className="w-1/3 pl-4">
                <img src={post.frontmatter.image.publicURL} />
            </div>
        </div>
    </article>
);

export default PostPreview;
