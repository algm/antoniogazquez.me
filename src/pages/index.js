import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Intro from '../components/Intro';
import BlogSummary from '../components/BlogSummary';
import Resume from '../components/Resume';

export default class IndexPage extends React.Component {
    render() {
        const { data } = this.props;
        const { edges: posts } = data.allMarkdownRemark;

        return (
            <Layout>
                <Intro />
                <BlogSummary posts={posts} />
                <Resume />
            </Layout>
        );
    }
}

IndexPage.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
};

export const pageQuery = graphql`
    query IndexQuery {
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
                            childImageSharp {
                                fluid(maxWidth: 230, quality: 85) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        date(formatString: "DD MMMM YYYY", locale: "es-ES")
                    }
                }
            }
        }
    }
`;
