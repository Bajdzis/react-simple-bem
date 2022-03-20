import * as React from 'react';
import { BEMNodeContext } from '../context/settings';
import { convertBemValueToArray} from '../helpers';
import { BEMNodeCreator, BEMNodeContextI, BEMNodeProps } from './BEMNode';

export interface BEMBlockContext {
    BEM_BlockNames: string[];
}

export const BEMBlockCreator: (Component: React.ElementType) => React.FC<BEMNodeProps> = (Component: React.ElementType) =>  {

    const BEMNode:React.FC<BEMNodeProps> = BEMNodeCreator(Component);

    const BEMBlock: React.FC<BEMNodeProps> = (props: BEMNodeProps) => {
        const oldContext:BEMNodeContextI = React.useContext(BEMNodeContext);

        return <BEMNodeContext.Provider value={{
            ...oldContext,
            BEM_BlockNames:convertBemValueToArray(props.bemName)
        }}>
            <BEMNode getNames={() => convertBemValueToArray(props.bemName)} {...props}></BEMNode>
        </BEMNodeContext.Provider>;
    };

    return BEMBlock;
};
