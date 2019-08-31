import * as React from 'react';
import * as PropTypes from 'prop-types'; 
import { addModifiersToClassName, convertBemValueToArray, PropTypesBemValue, PropTypesBemSetting, DEFAULT_BEM_SETTING, cleanUpProps} from '../helpers';
import { BemValue, BemSetting } from '../domain';

export interface BEMNodeProps {
    bemName: BemValue,
    bemMod?: BemValue,
    bemBlock?: BemValue,
    className?: string,
    children?: React.ReactNode,
    forwardedRef?: () => HTMLElement | null;
    [key: string]: any
}

export interface BEMNodeContext {
    BEM_BlockNames: string[],
    BEM_StylesObject: {[key:string]: string},
    BEM_Setting: BemSetting,
}

export class BEMNode extends React.Component<BEMNodeProps, {}, BEMNodeContext>{

    static defaultProps: Partial<BEMNodeProps> = {
        bemName: [],
        bemMod: [],
        className: '',
        bemBlock: null
    };
    
    static propTypes: {[key in keyof BEMNodeProps]: PropTypes.Requireable<any>} = {
        bemName: PropTypesBemValue,
        bemMod: PropTypesBemValue,
        bemBlock: PropTypesBemValue,
        className: PropTypes.string,
        children: PropTypes.any,
        forwardedRef: PropTypes.func,
    };
    
    static contextTypes: {[key in keyof BEMNodeContext]: PropTypes.Requireable<any>} = {
        BEM_BlockNames: PropTypes.arrayOf(PropTypes.string),
        BEM_StylesObject: PropTypes.object,
        BEM_Setting: PropTypesBemSetting,
    };

    getMods(): string[] {
        return convertBemValueToArray(this.props.bemMod);
    }

    getNames(): string[] {
        throw new Error('getNames not implement');
    }

    getClassName(): string[] {
        const names: string[] = this.getNames();
        const mods: string[] = this.getMods();
        const setting: BemSetting = this.getBemSetting();
        const classNames: string[] = [];
        names.forEach((name: string) => classNames.push(...addModifiersToClassName(name, mods, setting)));
        if(this.props.className){
            classNames.push(this.props.className);
        }
        return classNames;
    }

    getBemSetting(): BemSetting{
        if(!this.context.BEM_Setting){
            return DEFAULT_BEM_SETTING;
        }
        return {
            ...DEFAULT_BEM_SETTING,
            ...this.context.BEM_Setting
        };
    }

    replaceModulesStyles(classNames: string[]): string[]{
        if(!this.context.BEM_StylesObject){
            return classNames;
        }
        return classNames.map((className: string) => this.context.BEM_StylesObject[className] || className);
    }
    
    render(): React.ReactNode {
        // @ts-ignore
        const Component: typeof React.Component = arguments[0] as typeof React.Component;
        const className: string = this.replaceModulesStyles(this.getClassName()).join(' ');
        const {forwardedRef, ...props}: BEMNodeProps =  this.props;
        return (
            <Component className={className} forwardedRef={forwardedRef} {...cleanUpProps(props)}>
                {this.props.children}
            </Component>
        );
    }

}


