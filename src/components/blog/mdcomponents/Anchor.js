import React from 'react';

const Anchor = ({ href, children }) => (
    <a
        href={href}
        className="text-blue hover:text-blue-darker"
        title={children}
    >
        {children}
    </a>
);

export default Anchor;
