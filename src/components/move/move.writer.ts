import * as path from 'path';
import * as fs from 'fs';
import { Promise } from 'es6-shim';

import APP_SETTINGS from '@settings/app';
import { Writer } from '@core/writer';
import { MoveParser } from './';

export class MoveWriter implements Writer {
    private PATH = path.join(
        APP_SETTINGS.OUTPUT_PATH,
        APP_SETTINGS.MOVE_FILE
    );
    public Write(): Promise<any> {
        let promise = new Promise<any>((resolve, reject) => {
            const gameMaster = require('../../data/GAME_MASTER.json');
            fs.writeFile(this.PATH, JSON.stringify(new MoveParser(gameMaster).Parse(), null, 4), function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        return promise;
    }
}