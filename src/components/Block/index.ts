import {bemBlockDecorator} from '../../decorators';
import {Tag} from '../Tag';
import { BEMBlock } from '../../decorators/BEMBlock';

export const Block: typeof BEMBlock = bemBlockDecorator(Tag); 
