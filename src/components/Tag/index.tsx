import * as React from 'react';

interface TagProps {
    tagName: string,
    forwardedRef?: React.RefObject<{}>,
    children?: React.ReactNode
}

export const Tag: React.FC<TagProps> = ({tagName = 'div', forwardedRef = undefined, children, ...props}:TagProps) => {

    return React.createElement(tagName, {...props, ref: forwardedRef }, children);
};
