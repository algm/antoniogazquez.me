import React from 'react';
import PropTypes from 'prop-types';
import { Parallax } from 'react-parallax';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Disqus from 'disqus-react';

export const BlogPostTemplate = ({
    id,
    content,
    contentComponent,
    description,
    tags,
    title,
    image,
    helmet,
    date,
}) => {
    const PostContent = contentComponent || Content;
    const disqusShortname = 'antoniogazquez-me';
    const disqusConfig = {
        url: id,
        identifier: id,
        title: title,
    };

    return (
        <section>
            {helmet || ''}
            <article>
                <header>
                    <Parallax
                        bgImage={image}
                        strength={400}
                        className="h-halfscreen bg-black text-white p-0 m-0"
                        bgClassName="h-halfscreen"
                    >
                        <div className="h-halfscreen flex flex-col content-between justify-between items-end bg-gradient-img">
                            <div className="w-full py-3 flex content-between justify-between items-stretch">
                                <div className="pl-3">
                                    <Link
                                        to="/"
                                        className="text-white no-underline"
                                    >
                                        Antonio Gázquez
                                    </Link>
                                </div>
                                <div className="pr-3">
                                    <Link
                                        to="/blog"
                                        className="text-white no-underline"
                                    >
                                        Blog
                                    </Link>
                                </div>
                            </div>
                            <div className="leading-loose text-center w-full tracking-wide">
                                <h1 className="text-5xl w-full px-2 font-medium">
                                    {title}
                                </h1>
                            </div>
                        </div>
                    </Parallax>
                </header>
                <div className="w-screen m-auto max-w-lg px-2 py-6 text-lg leading-normal">
                    <p className="my-4 text-grey-dark">Publicado el {date}</p>
                    {tags && tags.length ? (
                        <div className="my-4">
                            {tags.map(tag => (
                                <Link
                                    key={tag}
                                    className="inline-block bg-blue-light p-1 no-underline text-blue-darkest rounded text-sm"
                                    to={`/tags/${kebabCase(tag)}/`}
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    ) : null}
                    <PostContent content={content} />
                    <div className="py-4">
                        <div className="text-center">
                            <h2 className="inline-block text-semibold side-borders side-borders-dark">
                                Comentarios
                            </h2>
                        </div>
                        <Disqus.DiscussionEmbed
                            shortname={disqusShortname}
                            config={disqusConfig}
                        />
                    </div>
                </div>
            </article>
        </section>
    );
};

const BlogPost = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <Layout>
            <BlogPostTemplate
                id={post.id}
                content={post.html}
                contentComponent={HTMLContent}
                description={post.frontmatter.description}
                helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
                tags={post.frontmatter.tags}
                image={post.frontmatter.image.publicURL}
                title={post.frontmatter.title}
                date={post.frontmatter.date}
            />
        </Layout>
    );
};

BlogPost.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
};

export default BlogPost;

export const pageQuery = graphql`
    query BlogPostByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                date(formatString: "LLLL", locale: "es-ES")
                title
                description
                tags
                image {
                    publicURL
                }
            }
        }
    }
`;
