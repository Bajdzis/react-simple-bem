import React from 'react';
import PropTypes from 'prop-types'; 
import {addModifiersToClassName, convertBemValueToArray, PropTypesBemValue, cleanUpProps} from '../helpers';

export default class Block extends React.Component {

    getMods() {
        return convertBemValueToArray(this.props.bemMod);
    }

    getNames() {
        return convertBemValueToArray(this.props.bemName);
    }

    getClassName() {
        const names = this.getNames();
        const mods = this.getMods();
        return names.map(name => addModifiersToClassName(name, mods)).join(' ');
    }

    getChildContext() {
        return {
            BEM_BlockNames: this.getNames(),
        };
    }

    render() {
        const TagName = this.props.tagName;
        const className = this.getClassName();
        return (
            <TagName className={className} {...cleanUpProps(this.props)}>
                {this.props.children}
            </TagName>
        );
    }
}

Block.defaultProps = {
    bemName: [],
    bemMod: [],
    tagName: 'div'
};

Block.propTypes = {
    bemName: PropTypesBemValue,
    bemMod: PropTypesBemValue,
    tagName: PropTypes.string,
    children: PropTypes.any
};

Block.childContextTypes = {
    BEM_BlockNames: PropTypes.arrayOf(PropTypes.string),
};
