import {Tag} from '../Tag';
import { BEMBlockCreator } from '../../decorators/BEMBlock';
import { BEMNodeProps } from '../../decorators/BEMNode';

export const Block: React.FC<BEMNodeProps> = BEMBlockCreator(Tag);
