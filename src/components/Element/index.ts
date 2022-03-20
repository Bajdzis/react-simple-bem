import {Tag} from '../Tag';
import { BEMNodeProps } from '../../decorators/BEMNode';
import { bemElementDecorator } from '../../decorators';

export const Element: React.FC<BEMNodeProps> = bemElementDecorator(Tag);
