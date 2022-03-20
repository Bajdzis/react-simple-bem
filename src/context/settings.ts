import { createContext } from 'react';
import { BEMNodeContextI, BEMStyleContextI } from '../decorators/BEMNode';
import { BemSettingI } from '../domain';
import { DEFAULT_BEM_SETTING } from '../helpers';

export const BEMNodeContext: React.Context<BEMNodeContextI> = createContext<BEMNodeContextI>({
    BEM_BlockNames: [],
});

export const BEMStyleContext: React.Context<BEMStyleContextI> = createContext<BEMStyleContextI>({
    BEM_StylesObject: null,
});

export const BEMSettingContext: React.Context<BemSettingI> = createContext<BemSettingI>(DEFAULT_BEM_SETTING);
