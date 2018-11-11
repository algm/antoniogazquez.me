import React from 'react';

const Quote = ({ children }) => (
    <blockquote className="my-4 border-grey-light border-solid border-l-4 p-4 italic text-grey-dark">
        {children}
    </blockquote>
);

export default Quote;
