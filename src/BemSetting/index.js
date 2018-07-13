import React from 'react';
import PropTypes from 'prop-types'; 

export default class BemSetting extends React.Component {
    render() {
        return this.props.children;
    }
}

BemSetting.propTypes = {
    children: PropTypes.any
};

