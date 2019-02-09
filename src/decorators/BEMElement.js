import { convertBemValueToArray, getStringBemInfo, checkBemInfoCondition } from '../helpers';
import { BEMNode } from './BEMNode';

export class BEMElement extends BEMNode {

    getNames() {
        const setting = this.getBemSetting();
        const elementDelimiter = setting.elementDelimiter;
        const blockNames = this.props.bemBlock && convertBemValueToArray(this.props.bemBlock) || this.context.BEM_BlockNames;
        const result = [];
        blockNames.forEach(blockName => {
            const value = convertBemValueToArray(this.props.bemName)
                .map(name => getStringBemInfo(name, setting))
                .filter(info => checkBemInfoCondition(info, blockName, ''))
                .map(info => `${blockName}${elementDelimiter}${info.className}`);
            result.push(...value);
        });
        return result;
    }

}
