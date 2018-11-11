import React from 'react';
import Layout from '../components/Layout';
import BlogLayout from '../layouts/BlogLayout';
import PostPreview from '../components/blog/PostPreview';
import { graphql } from 'gatsby';

const Blog = ({ data }) => {
    const { edges: posts } = data.allMarkdownRemark;

    return (
        <Layout>
            <BlogLayout>
                <div className="text-center">
                    <h2 className="inline-block text-3xl font-semibold mw-full mx-auto side-borders side-borders-dark mb-8">
                        Cosas que he dicho
                    </h2>
                </div>
                {posts.map(({ node: post }) => (
                    <PostPreview key={post.id} post={post} />
                ))}
            </BlogLayout>
        </Layout>
    );
};

export default Blog;

export const pageQuery = graphql`
    query BlogIndexQuery {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
            limit: 3
        ) {
            edges {
                node {
                    excerpt(pruneLength: 400)
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        templateKey
                        image {
                            relativePath
                            publicURL
                        }
                        date(formatString: "DD MMMM YYYY", locale: "es-ES")
                    }
                }
            }
        }
    }
`;
