import { author, version } from '../../package.json';

/**
 * Log a header to the console.
 */
const logHeader = () => {
    console.log(`\x1b[34m`, `--------------------------------------------------`);
};

/**
 * Log the splash screen.
 */
const logSplash = () => {
    console.log(`\x1b[34m`, `
    
    ███████╗██████╗       ██████╗  ██████╗ ████████╗
    ╚══███╔╝██╔══██╗      ██╔══██╗██╔═══██╗╚══██╔══╝
      ███╔╝ ██████╔╝█████╗██████╔╝██║   ██║   ██║   
     ███╔╝  ██╔═══╝ ╚════╝██╔══██╗██║   ██║   ██║   
    ███████╗██║           ██████╔╝╚██████╔╝   ██║   
    ╚══════╝╚═╝           ╚═════╝  ╚═════╝    ╚═╝   

        Created by ${author} | v${version}
    `);
};

export {
    logHeader,
    logSplash
};
