import React from 'react';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../../components/Layout';
import BlogLayout from '../../layouts/BlogLayout';
import { Tag, Book } from 'react-feather';

const TagsPage = ({
    data: {
        allMarkdownRemark: { group },
        site: {
            siteMetadata: { title },
        },
    },
}) => (
    <Layout>
        <Helmet title={`Tags | ${title}`} />
        <BlogLayout>
            <section>
                <div className="text-center">
                    <h2 className="inline-block text-3xl font-semibold mw-full mx-auto side-borders side-borders-dark mb-8">
                        Mis publicaciones
                    </h2>
                </div>

                <h3 className="font-medium text-2xl mb-4">Etiquetas</h3>

                {group.map(tag => (
                    <div
                        key={tag.fieldValue}
                        className="capitalize text-xl my-8 bg-white"
                    >
                        <Link
                            to={`/tags/${kebabCase(tag.fieldValue)}/`}
                            className="no-underline text-blue hover:text-blue-dark block p-4 border-blue-light border-l-4 hover:border-blue"
                        >
                            <Tag
                                size={18}
                                className="inline-block align-middle text-grey-dark"
                            />{' '}
                            <span className="inline-block align-middle">
                                {tag.fieldValue} ({tag.totalCount}
                            </span>
                            )
                        </Link>
                    </div>
                ))}

                <p>
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

export default TagsPage;

export const tagPageQuery = graphql`
    query TagsQuery {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(limit: 1000) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`;
