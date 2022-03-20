import * as React from 'react';
import { BEMSettingContext } from '../../context/settings';
import { BemSettingI } from '../../domain';

interface BemSettingProps {
    bemSetting: Partial<BemSettingI>;
    children?: React.ReactNode;
}

const BemSettingProvider: React.FC<BemSettingProps> = ({children, bemSetting}: BemSettingProps) => {
    const parentBemSetting: BemSettingI = React.useContext(BEMSettingContext);

    return <BEMSettingContext.Provider value={{
        ...parentBemSetting,
        ...bemSetting
    }}>
        {children}
    </BEMSettingContext.Provider>;

};

export default BemSettingProvider;
