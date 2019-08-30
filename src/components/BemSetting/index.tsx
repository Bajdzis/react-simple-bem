import * as React from 'react';
import * as PropTypes from 'prop-types'; 
import { DEFAULT_BEM_SETTING, PropTypesBemSetting } from '../../helpers';

interface BemSettingProps {
    bemSetting: BemSetting;
    children?: React.ReactNode;
}

interface BemSettingContext {
    BEM_Setting: BemSetting;
}

export default class BemSetting extends React.Component<BemSettingProps, {}, BemSettingContext> {

    static propTypes: {[key in keyof BemSettingProps]: PropTypes.Requireable<any>} = {
        children: PropTypes.any,
        bemSetting: PropTypesBemSetting
    };
    
    static childContextTypes: {[key in keyof BemSettingContext]: PropTypes.Requireable<any>} = {
        BEM_Setting: PropTypesBemSetting,
    };
    
    static contextTypes: {[key in keyof BemSettingContext]: PropTypes.Requireable<any>} = {
        BEM_Setting: PropTypesBemSetting,
    };

    getChildContext() {
        const setting: BemSetting= {
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
