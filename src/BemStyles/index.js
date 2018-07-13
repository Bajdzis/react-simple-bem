import React from 'react';
import PropTypes from 'prop-types'; 

export default class BemStyles extends React.Component {

    getChildContext() {
        return {
            BEM_StylesObject: this.props.styles,
        };
    }

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

BemStyles.childContextTypes = {
    BEM_StylesObject: PropTypes.object,
};
