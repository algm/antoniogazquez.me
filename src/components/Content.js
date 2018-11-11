import React from 'react';
import rehypeReact from 'rehype-react';
import Paragraph from './blog/mdcomponents/Paragraph';
import SectionTitle from './blog/mdcomponents/SectionTitle';
import Code from './blog/mdcomponents/Code';
import Quote from './blog/mdcomponents/Quote';
import Anchor from './blog/mdcomponents/Anchor';
import Image from './blog/mdcomponents/Image';

const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
        p: Paragraph,
        h2: SectionTitle,
        code: Code,
        blockquote: Quote,
        a: Anchor,
        img: Image
    },
}).Compiler;

export const HTMLContent = ({ content, className }) => (
    <div className={className}>{renderAst(content)}</div>
);

const Content = ({ content, className }) => (
    <div className={className}>{content}</div>
);

export default Content;
