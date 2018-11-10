import React from 'react';
import { Link } from 'gatsby';

const BlogSummary = ({ posts }) => {
    return (
        <section>
            <h2>Cosas que he dicho</h2>
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
        </section>
    );
};

export default BlogSummary;
