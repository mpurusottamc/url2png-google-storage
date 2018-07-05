'use strict';

import fs from 'fs';
import config from 'config';
import URL2PNG from './lib/url-png.js';
import CloudStorage from './lib/cloud-storage.js';

console.log(`Configuration: ${JSON.stringify(config)}`);

function main() {
    const url = 'www.cloudanix.com';
    const url2png = new URL2PNG(config);

    const cloudStorage = new CloudStorage(config.storage.auth);

    const url = url2png.generateScreenshot(url)
        .then(result => {
            console.log(`url2png success: ${result}`);

            return cloudStorage.uploadFile(result, config.storage.options);
        })
        .then(filePath => {
            console.log(`upload file success: ${filePath}`);

            fs.unlink(filePath, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`file deleted: ${filePath}`);
                }
            })
        })
        .catch(error => {
            console.log(`failed to generate screenshot from url2png and upload to google storage for ${url} : ${error}`);
        });
}

main();