import * as PropTypes from 'prop-types'; 
import { convertBemValueToArray} from '../helpers';
import { BEMNode } from './BEMNode';

export interface BEMBlockContext {
    BEM_BlockNames: string[];
}

export class BEMBlock extends BEMNode {

    static childContextTypes: {[key in keyof BEMBlockContext]: PropTypes.Requireable<any>} = {
        BEM_BlockNames: PropTypes.arrayOf(PropTypes.string),
    };

    getChildContext(): BEMBlockContext {
        return {
            BEM_BlockNames: this.getNames(),
        };
    }

    getNames(): string[] {
        return convertBemValueToArray(this.props.bemName);
    }

}
