import React from 'react';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { TEMP_DIR } from './config';

export interface decodeBase64ReturnType {
    type: string,
    data: Buffer
}

export function convertBase64ImageToFile(dataString: string) {
    // Regular expression for image type:
    // This regular image extracts the "jpeg" from "image/jpeg"
    const imageTypeRegularExpression = /\/(.*?)$/;
    // Generate random string
    const seed = crypto.randomBytes(20);
    const uniqueSHA1String = crypto.createHash('sha1').update(seed).digest('hex');
    const imageBuffer = decodeBase64Image(dataString);

    const uniqueRandomImageName = 'image-' + uniqueSHA1String;
    // This variable is actually an array which has 5 values,
    // The [1] value is the real image extension
    const imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);
    const userUploadedImageFile = uniqueRandomImageName + '.' + (imageTypeDetected ? imageTypeDetected[1] : "jpg");

    // Save decoded binary image to disk
    try {
        fs.writeFile(TEMP_DIR + '/' + userUploadedImageFile, imageBuffer.data, () => {
            console.log('DEBUG - feed:message: Saved to disk image attached by user:', userUploadedImageFile);
        });
    }
    catch (error) {
        throw new Error(JSON.stringify(error));
    }    
    return userUploadedImageFile;
}

// Decoding base-64 image
// Source: http://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
export function decodeBase64Image(dataString: string): decodeBase64ReturnType {
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid input string');
    }

    const response: decodeBase64ReturnType = {
        type: matches[1],
        data: Buffer.from(matches[2], 'base64')
    };
    return response;
}
