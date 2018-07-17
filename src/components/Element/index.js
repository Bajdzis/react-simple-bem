import React from 'react';
import PropTypes from 'prop-types'; 
import {bemElementDecorator} from '../../decorators';

class Element extends React.Component {

    render() {
        const TagName = this.props.tagName;
        const props = {...this.props};
        delete props.tagName;
        return (
            <TagName {...props}>
                {this.props.children}
            </TagName>
        );
    }
}

Element.defaultProps = {
    tagName: 'div'
};

Element.propTypes = {
    tagName: PropTypes.string,
    children: PropTypes.any
};

export default bemElementDecorator(Element);
