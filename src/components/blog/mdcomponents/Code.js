import React from 'react';

const Code = ({ children, className }) => (
    <code
        className={`${className} text-sm font-mono bg-black text-grey-lighter p-1`}
    >
        {children}
    </code>
);

export default Code;
