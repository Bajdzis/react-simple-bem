import * as React from 'react';
import { convertBemValueToArray, getStringBemInfo, checkBemInfoCondition } from '../helpers';
import { BEMNodeCreator, BEMNodeProps, BEMNodeContextI } from './BEMNode';
import { BemInfo, BemSettingI } from '../domain';
import { BEMSettingContext, BEMNodeContext } from '../context/settings';

export const BEMElementCreator: (Component: React.ElementType) => React.FC<BEMNodeProps> = (Component: React.ElementType) =>  {
    const BEMNode:React.FC<BEMNodeProps> = BEMNodeCreator(Component);



    const BEMElement: React.FC<BEMNodeProps> = (props: BEMNodeProps) => {
        const setting:BemSettingI = React.useContext(BEMSettingContext);
        const { BEM_BlockNames }:BEMNodeContextI = React.useContext(BEMNodeContext);
        function getNames(): string[]  {
            const { bemBlock }: BEMNodeProps = props;
            const elementDelimiter: string = setting.elementDelimiter;
            const blockNames: string[] = bemBlock ? convertBemValueToArray(bemBlock) : BEM_BlockNames;
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
};
