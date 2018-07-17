import React from 'react';
import PropTypes from 'prop-types'; 
import {bemBlockDecorator} from '../../decorators';

class Block extends React.Component {


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

Block.defaultProps = {
    tagName: 'div'
};

Block.propTypes = {
    tagName: PropTypes.string,
    children: PropTypes.any
};

export default bemBlockDecorator(Block); 
