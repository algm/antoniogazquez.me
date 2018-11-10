import React from 'react';
import PostPreview from './blog/PostPreview';

const BlogSummary = ({ posts }) => {
    return (
        <section>
            <div className="mx-auto mt-8 max-w-lg w-full pt-6 pb-16">
                <div className="text-center">
                    <h2 className="inline-block text-3xl font-semibold mw-full mx-auto side-borders side-borders-dark">
                        Cosas que he dicho
                    </h2>
                </div>
                {posts.map(({ node: post }) => (
                    <PostPreview key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
};

export default BlogSummary;
