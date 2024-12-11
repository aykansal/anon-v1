import { useEffect, useState } from "react";
import { WebContainer } from '@webcontainer/api';

import { auth } from "@webcontainer/api";
export function useWebContainer() {

    const webContainerAuth = auth.init({
        clientId: 'wc_api_raj034_869f9496339c173bb80b713358a16e51',
        scope: '',
    });
    console.log("auth: ",webContainerAuth);
    
    const [webcontainer, setWebcontainer] = useState<WebContainer>();

    async function main() {
        const webcontainerInstance = await WebContainer.boot();
        setWebcontainer(webcontainerInstance)
    }
    useEffect(() => {
        main();
    }, [])

    return webcontainer;
}