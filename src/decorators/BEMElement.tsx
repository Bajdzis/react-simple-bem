import { convertBemValueToArray, getStringBemInfo, checkBemInfoCondition } from '../helpers';
import { BEMNode, BEMNodeProps, BEMNodeContext } from './BEMNode';
import { BemSetting } from '../..';
import { BemInfo } from '../domain';

export class BEMElement extends BEMNode {

    getNames(): string[]  {
        const { bemBlock }: BEMNodeProps = this.props;
        const { BEM_BlockNames }: BEMNodeContext = this.context;
        const setting: BemSetting = this.getBemSetting();
        const elementDelimiter: string = setting.elementDelimiter;
        const blockNames: string[] = bemBlock ? convertBemValueToArray(bemBlock) : BEM_BlockNames;
        const result: string[] = [];
        blockNames.forEach((blockName: string) => {
            const value: string[] = convertBemValueToArray(this.props.bemName)
                .map((name: string) => getStringBemInfo(name, setting))
                .filter((info: BemInfo) => checkBemInfoCondition(info, blockName, ''))
                .map((info: BemInfo) => `${blockName}${elementDelimiter}${info.className}`);
            result.push(...value);
        });
        return result;
    }

}
