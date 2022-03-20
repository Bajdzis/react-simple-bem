import {Tag} from '../Tag';
import { BEMElementCreator } from '../../decorators/BEMElement';
import { BEMNodeProps } from '../../decorators/BEMNode';


export const Element: React.FC<BEMNodeProps> = BEMElementCreator(Tag);
