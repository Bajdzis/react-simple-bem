import React from 'react';
import PropTypes from 'prop-types'; 

export class Tag extends React.Component {

    render() {
        const {tagName, forwardedRef, ...props} = this.props;
        const TagName = tagName;
        return (
            <TagName {...props} ref={forwardedRef}>
                {this.props.children}
            </TagName>
        );
    }
}

Tag.defaultProps = {
    tagName: 'div',
    forwardedRef: undefined
};

Tag.propTypes = {
    tagName: PropTypes.string,
    forwardedRef: PropTypes.func,
    children: PropTypes.any
};
