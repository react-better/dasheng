/*
 * File: utils.tsx
 * Desc: utils
 * File Created: 2020-05-29 00:27:10
 * Author: chenghao
 * ------
 * Copyright 2020 - present, chenghao
 */
export function addScript(url: string, cb?: Function) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = url;
        document.body.appendChild(script);
        script.onload = () => {
            cb && cb();
            resolve();
        };
    });
}

export function addCss(url: string, cb?: Function) {
    return new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = () => {
            cb && cb();
            resolve();
        };
    });
}

export async function loadManifest(url: string, cb?: Function) {
    const res = await fetch(`${url}/manifest.json`);
    const manifest = await res.json();
    loadCode(url, manifest, cb);
}

function loadCode(url: string, manifest: any, afterAll?: Function) {
    let promises: any[] = [];
    Object.keys(manifest).forEach((key) => {
        const addUrl = `${url}/${manifest[key]}`;
        const extension = key.split('.').pop() || '';
        if (extension.includes('js')) {
            promises.push(addScript(addUrl));
        }
        if (extension.includes('css')) {
            promises.push(addCss(addUrl));
        }
    });

    Promise.all(promises).then((res) => {
        afterAll && afterAll();
        console.log('加载完成');
    });
}
