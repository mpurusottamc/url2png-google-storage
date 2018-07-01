'use strict';

import fs from 'fs';
import path from 'path';
import got from 'got';
import url2png from '@mpurusottamc/url2png';

class URL2PNG {

    constructor(options) {
        this.options = options || {};

        this.url2png = url2png(this.options.url2png.auth.apiKey, this.options.url2png.auth.privateKey);
    }

    generateScreenshot(url) {
        return new Promise((resolve, reject) => {
            try {
                let currenttime = new Date().getTime();
                const fileName = `${currenttime}.png`;

                this.options.url2png.options.unique = currenttime;

                const filePath = path.join(__dirname, '..', this.options.tempPath, fileName);

                console.log(`init - received request to generate PNG from URL - ${JSON.stringify(url)}`);

                const webUrl = this.url2png.buildURL(url, this.options.url2png.options);

                console.log(`url2png URL: ${webUrl}`);

                got.stream(webUrl)
                    .on('uploadProgress', progress => {
                        // Report upload progress
                        console.log(`uploading file... ${JSON.stringify(progress)}`);
                    })
                    .on('response', response => {
                        resolve(filePath);
                    })
                    .on('error', (error, body, response) => {
                        reject(error);
                    })
                    .pipe(fs.createWriteStream(filePath));
            } catch (error) {
                console.log(`error - error while generating PNG from URL - ${error}`);

                reject(error);
            }
        });
    }
}

module.exports = URL2PNG;