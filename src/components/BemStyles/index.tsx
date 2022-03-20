import * as React from 'react';
import { BEMStyleContext } from '../../context/settings';

interface BemStylesProps {
    styles: {[key: string]: string};
    children?: React.ReactNode;
}

const BemStyles: React.FC<BemStylesProps> = ({ styles, children }:BemStylesProps) =>{

    return <BEMStyleContext.Provider value={styles}>
        {children}
    </BEMStyleContext.Provider>;
};

export default BemStyles;
