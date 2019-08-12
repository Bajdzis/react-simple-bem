import * as React from 'react';
import * as PropTypes from 'prop-types'; 

interface TagProps {
    tagName: string,
    forwardedRef?: React.RefObject<{}>,
    children?: React.ReactNode
}

export class Tag extends React.Component<TagProps> {
    
    static propTypes: {[key in keyof TagProps]: PropTypes.Requireable<any>} = {
        tagName: PropTypes.string,
        forwardedRef: PropTypes.func,
        children: PropTypes.any
    };

    render() {
        const {tagName = 'div', forwardedRef = undefined, children, ...props}: TagProps = this.props;
        return React.createElement(tagName, {...props, ref: forwardedRef }, children);
    }
}
