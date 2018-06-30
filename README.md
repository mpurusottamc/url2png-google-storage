# url2png-google-storage
Generate Screenshot (url2png) and save in google storage


Configuration File format (config/default.json)
```{
    "url2png": {
        "auth": {
            "apiKey": "<url2png api key>",
            "privateKey": "<url2png private key>"
        },
        "options": {
            "thumbnail_max_width": 1000,
            "viewport": "1480x1037",
            "fullpage": false
        }
    },
    "tempPath": "tmp",
    "storage": {
        "auth": {
            "projectId": "<google project id>"
        },
        "options": {
            "bucketName": "<google storage bucket name>"
        }
    }
}```
