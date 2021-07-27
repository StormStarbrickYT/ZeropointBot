import { version } from '../package.json';

import colors from './colors';

import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    developerID: `386940319666667521`,
    prefix: `z!`,

    colors,

    staffRoles: [
        `757079571903545444`,
        `757129188195958835`,
        `803350600355151923`,
        `803348603833679923`,
        `815381270845587458`,
        `794357547611193365`,
        `794361795980558348`,
        `757137579849154630`,
        `757137548530286613`
    ],

    logChannel: `826956913290903592`,

    serverStats: {
        enabled: false,
        members: ``,
        memberGoal: ``
    },

    db: {
        uri: process.env.MONGO_URI,
        uriParams: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },

    version,
    footer: `Created by DamienVesper#0001 | v${version}`
};

export default config;
