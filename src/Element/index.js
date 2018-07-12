import React from 'react';
import PropTypes from 'prop-types'; 
import {addModifiersToClassName, convertBemValueToArray, PropTypesBemValue, cleanUpProps} from '../helpers';

export default class Element extends React.Component {

    getMods() {
        return convertBemValueToArray(this.props.bemMod);
    }

    getNames() {
        return convertBemValueToArray(this.props.bemName)
            .map(name => `${this.context.BEM_BlockNames}__${name}`);
    }

    getClassName() {
        const names = this.getNames();
        const mods = this.getMods();
        return names.map(name => addModifiersToClassName(name, mods)).join(' ');
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

Element.defaultProps = {
    bemName: [],
    bemMod: [],
    tagName: 'div'
};

Element.propTypes = {
    bemName: PropTypesBemValue,
    bemMod: PropTypesBemValue,
    tagName: PropTypes.string,
    children: PropTypes.any
};

Element.contextTypes = {
    BEM_BlockNames: PropTypes.arrayOf(PropTypes.string),
};
