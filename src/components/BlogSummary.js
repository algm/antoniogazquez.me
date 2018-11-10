import React from 'react';
import { Link } from 'gatsby';

const BlogSummary = ({ posts }) => {
    return (
        <section>
            <div className="mx-auto mt-8 max-w-md w-full">
                <div className="text-center">
                    <h2 className="inline-block text-3xl font-semibold mw-full mx-auto side-borders side-borders-dark">
                        Cosas que he dicho
                    </h2>
                </div>
                {posts.map(({ node: post }) => (
                    <article key={post.id}>
                        <h3>
                            <Link to={post.fields.slug}>
                                {post.frontmatter.title}
                            </Link>
                        </h3>
                        <p>Publicado el {post.frontmatter.date}</p>

                        <div>{post.excerpt}</div>
                        <p>
                            <Link to={post.fields.slug}>Seguir leyendo</Link>
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default BlogSummary;
