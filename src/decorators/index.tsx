import * as React from 'react';
import { BEMBlockNamesContext, BEMSettingContext } from '../context/settings';
import { checkBemInfoCondition, convertBemValueToArray, getStringBemInfo } from '../helpers';
import { BEMNodeProps, BEMNodeCreator, BEMNodeContextI } from './BEMNode';
import { BemInfo, BemSettingI } from '../domain';

export function bemBlockDecorator (Component: React.ElementType) {
    const BEMNode:React.FC<BEMNodeProps> = BEMNodeCreator(Component);

    const BEMBlock: React.FC<BEMNodeProps> = (props: BEMNodeProps) => {

        return <BEMBlockNamesContext.Provider value={convertBemValueToArray(props.bemName)}>
            <BEMNode getNames={() => convertBemValueToArray(props.bemName)} {...props}></BEMNode>
        </BEMBlockNamesContext.Provider>;
    };

    return BEMBlock;
}

export function bemElementDecorator (Component: React.ElementType) {
    const BEMNode:React.FC<BEMNodeProps> = BEMNodeCreator(Component);

    const BEMElement: React.FC<BEMNodeProps> = (props: BEMNodeProps) => {
        const setting:BemSettingI = React.useContext(BEMSettingContext);
        const blockNamesContext:BEMNodeContextI = React.useContext(BEMBlockNamesContext);
        function getNames(): string[]  {
            const { bemBlock }: BEMNodeProps = props;
            const elementDelimiter: string = setting.elementDelimiter;
            const blockNames: string[] = bemBlock ? convertBemValueToArray(bemBlock) : blockNamesContext;
            const result: string[] = [];
            blockNames.forEach((blockName: string) => {
                const value: string[] = convertBemValueToArray(props.bemName)
                    .map((name: string) => getStringBemInfo(name, setting))
                    .filter((info: BemInfo) => checkBemInfoCondition(info, blockName, ''))
                    .map((info: BemInfo) => `${blockName}${elementDelimiter}${info.className}`);
                result.push(...value);
            });
            return result;
        }
        return  <BEMNode getNames={getNames} {...props}></BEMNode>
        ;
    };

    return BEMElement;
}
