import PropTypes from 'prop-types'; 
import { convertBemValueToArray} from '../helpers';
import { BEMNode } from './BEMNode';

export class BEMBlock extends BEMNode {

    getChildContext() {
        return {
            BEM_BlockNames: this.getNames(),
        };
    }

    getNames() {
        return convertBemValueToArray(this.props.bemName);
    }

}

BEMBlock.childContextTypes = {
    BEM_BlockNames: PropTypes.arrayOf(PropTypes.string),
};
