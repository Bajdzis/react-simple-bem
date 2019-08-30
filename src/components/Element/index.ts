import {bemElementDecorator} from '../../decorators';
import {Tag} from '../Tag';
import { BEMElement } from '../../decorators/BEMElement';

export const Element: typeof BEMElement = bemElementDecorator(Tag);
