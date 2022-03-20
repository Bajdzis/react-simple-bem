import { createContext } from 'react';
import { BEMNodeContextI, BEMStyleContextI } from '../decorators/BEMNode';
import { BemSettingI } from '../domain';
import { DEFAULT_BEM_SETTING } from '../helpers';

export const BEMBlockNamesContext: React.Context<BEMNodeContextI> = createContext<BEMNodeContextI>([]);

export const BEMStyleContext: React.Context<BEMStyleContextI> = createContext<BEMStyleContextI>(null);

export const BEMSettingContext: React.Context<BemSettingI> = createContext<BemSettingI>(DEFAULT_BEM_SETTING);
