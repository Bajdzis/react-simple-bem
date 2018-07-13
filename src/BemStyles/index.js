import React from 'react';
import PropTypes from 'prop-types'; 

export default class BemStyles extends React.Component {
    render() {
        return this.props.children;
    }
}

BemStyles.defaultProps = {
    styles: {}
};

BemStyles.propTypes = {
    children: PropTypes.any,
    styles: PropTypes.object,
};
