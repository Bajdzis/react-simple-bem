import React from 'react';
import PropTypes from 'prop-types'; 
import { DEFAULT_BEM_SETTING, PropTypesBemSetting } from '../helpers';
export default class BemSetting extends React.Component {

    getChildContext() {
        const setting = {
            ...DEFAULT_BEM_SETTING,
            ...(this.context.BEM_Setting || {}),
            ...this.props.bemSetting
        };
        return {
            BEM_Setting: setting,
        };
    }

    render() {
        return this.props.children;
    }
}

BemSetting.propTypes = {
    children: PropTypes.any,
    bemSetting: PropTypesBemSetting
};

BemSetting.childContextTypes = {
    BEM_Setting: PropTypesBemSetting,
};

BemSetting.contextTypes = {
    BEM_Setting: PropTypesBemSetting,
};
