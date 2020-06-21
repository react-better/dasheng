/*
 * File: index.tsx
 * Desc: 描述
 * File Created: 2020-05-19 13:27:33
 * Author: chenghao
 * ------
 * Copyright 2020 - present, chenghao
 */
import React, { useEffect, useState } from 'react';
import { loadManifest } from './utils';

interface DaShengProps {
    url?: string;
    compName: any;
}
let baseOrigin = '';
const DaSheng = (props: DaShengProps) => {
    const { url, compName, ...restProps } = props;
    const [Comp, setComp] = useState<any>();

    useEffect(() => {
        loadManifest(getUrl(), () => {
            // 需要实时刷新组件，故而不需要做已存在校验
            const C = (window[compName] as any).default;
            setComp(() => C);
        });

        function getUrl() {
            return url || `${baseOrigin}/${compName}`;
        }
    }, [url, compName]);
    return Comp ? <Comp {...restProps} /> : null;
};

DaSheng.origin = (origin: string) => (baseOrigin = origin);

export default DaSheng;
