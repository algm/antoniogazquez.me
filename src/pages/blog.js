import React from 'react';
import Layout from '../components/Layout';
import PostPreview from '../components/blog/PostPreview';

const Blog = ({ data }) => {
    const { edges: posts } = data.allMarkdownRemark;

    return (
        <div>
            {posts.map(({ node: post }) => (
                <PostPreview key={post.id} post={post} />
            ))}
        </div>
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
