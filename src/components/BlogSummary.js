import React from 'react';
import PostPreview from './blog/PostPreview';
import { Link } from 'gatsby';
import { Book } from 'react-feather';

const BlogSummary = ({ posts }) => {
    return (
        <section>
            <div className="mx-auto mt-4 md:mt-8 max-w-lg w-full pt-6 pb-8 px-8">
                <div className="text-center">
                    <h2 className="inline-block text-2xl md:text-3xl font-semibold mw-full mx-auto side-borders side-borders-dark mb-4 md:mb-8">
                        Cosas que he dicho
                    </h2>
                </div>
                {posts.map(({ node: post }) => (
                    <PostPreview key={post.id} post={post} />
                ))}
                <div>
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
                </div>
            </div>
        </section>
    );
};

export default BlogSummary;
