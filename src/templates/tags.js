import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import BlogLayout from '../layouts/BlogLayout';
import { ChevronsRight, Tag, Book } from 'react-feather';

class TagRoute extends React.Component {
    render() {
        const posts = this.props.data.allMarkdownRemark.edges;
        const postLinks = posts.map(post => (
            <div key={post.node.fields.slug} className="bg-white my-8">
                <h3 className="">
                    <Link
                        to={post.node.fields.slug}
                        className="block p-4 border-blue-light border-l-4 text-grey-darkest font-normal no-underline hover:border-blue"
                    >
                        <ChevronsRight
                            size={24}
                            className="inline-block align-middle"
                        />{' '}
                        <span className="inline-block align-middle">
                            {post.node.frontmatter.title}
                        </span>
                    </Link>
                </h3>
            </div>
        ));
        const tag = this.props.pageContext.tag;
        const title = this.props.data.site.siteMetadata.title;
        const totalCount = this.props.data.allMarkdownRemark.totalCount;
        const tagHeader = `${totalCount} post${
            totalCount === 1 ? '' : 's'
        } con la etiqueta “${tag}”`;

        return (
            <Layout>
                <BlogLayout>
                    <section>
                        <Helmet title={`${tag} | ${title}`} />

                        <div className="text-center">
                            <h2 className="inline-block text-3xl font-semibold mw-full mx-auto side-borders side-borders-dark mb-8">
                                Mis publicaciones
                            </h2>
                        </div>

                        <h3 className="font-medium text-2xl">{tagHeader}</h3>
                        {postLinks}
                        <p>
                            <Link
                                to="/tags/"
                                className="text-blue hover:text-blue-dark no-underline mr-4"
                            >
                                <Tag
                                    size={16}
                                    className="text-grey-darker inline-block align-middle"
                                />{' '}
                                <span className="inline-block align-middle">
                                    Ver todas las etiquetas
                                </span>
                            </Link>

                            <Link
                                to="/blog/"
                                className="text-blue hover:text-blue-dark no-underline"
                            >
                                <Book
                                    size={16}
                                    className="text-grey-darker inline-block align-middle"
                                />{' '}
                                <span className="inline-block align-middle">
                                    Ver todos los posts
                                </span>
                            </Link>
                        </p>
                    </section>
                </BlogLayout>
            </Layout>
        );
    }
}

export default TagRoute;

export const tagPageQuery = graphql`
    query TagPage($tag: String) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 1000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`;
