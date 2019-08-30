import * as React from 'react';
import * as PropTypes from 'prop-types'; 

interface BemStylesProps {
    styles: {[key: string]: string};
    children?: React.ReactNode;
}

interface BemStylesContext {
    BEM_StylesObject: {[key: string]: string};
}

export default class BemStyles extends React.Component<BemStylesProps> {

    static defaultProps: Partial<BemStylesProps> = {
        styles: {}
    };
    
    static propTypes: {[key in keyof BemStylesProps]: PropTypes.Requireable<any>} = {
        children: PropTypes.any,
        styles: PropTypes.object,
    };
    
    static childContextTypes: {[key in keyof BemStylesContext]: PropTypes.Requireable<any>} = {
        BEM_StylesObject: PropTypes.object,
    };

    getChildContext() {
        return {
            BEM_StylesObject: this.props.styles,
        };
    }

    render() {
        return this.props.children;
    }
}
