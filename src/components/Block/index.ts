import {Tag} from '../Tag';
import { BEMNodeProps } from '../../decorators/BEMNode';
import { bemBlockDecorator } from '../../decorators';

export const Block: React.FC<BEMNodeProps> = bemBlockDecorator(Tag);
