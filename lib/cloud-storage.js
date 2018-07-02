'use strict';

// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

class CloudStorage {
    constructor(config) {
        this.config = config || {};

        // Add validation for required fields

        // Your Google Cloud Platform project ID
        const projectId = this.config.projectId;

        // Creates a client
        this.storage = new Storage({
            projectId: projectId,
        });
    }

    uploadFile(filePath, options) {
        // Add validation for required fields

        return new Promise((resolve, reject) => {
            const bucketName = options.bucketName;

            this.storage
                .bucket(bucketName)
                .upload(filePath, { public: true })
                .then(() => {
                    console.log(`${filePath} uploaded to ${bucketName}.`);

                    resolve(filePath);
                })
                .catch(err => {
                    console.error('ERROR:', err);

                    reject(err);
                });
        });
    }
}

module.exports = CloudStorage;