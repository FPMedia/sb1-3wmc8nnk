const crypto = require('crypto');

export const handler = async (event, context) => {
    console.log('=== DEBUG: Incoming event ===');
    console.log('event:', JSON.stringify(event, null, 2));

    try {
        // 1) Parse the request body
        console.log('=== DEBUG: Parsing event.body ===');
        const parsedBody = JSON.parse(event.body);
        console.log('parsedBody:', parsedBody);

        const { data, passphrase } = parsedBody || {};

        // 2) Double-check if data is defined
        if (!data) {
            console.error('=== ERROR: "data" is missing or undefined ===');
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: '"data" is missing from the request body',
                    requestBody: parsedBody,
                }),
            };
        }

        // 3) Sort the data's keys and build the query string
        console.log('=== DEBUG: Building queryString from data ===');
        const sortedKeys = Object.keys(data).sort();
        console.log('sortedKeys:', sortedKeys);

        let queryString = sortedKeys
            .filter((key) => data[key] !== undefined && data[key] !== '')
            .map((key) => {
                const value = String(data[key]);
                // Log each key/value
                console.log(`Key "${key}" => "${value}"`);
                return `${key}=${encodeURIComponent(value).replace(/%20/g, '+')}`;
            })
            .join('&');

        console.log('Initial queryString:', queryString);

        // 4) If passphrase is provided
        if (passphrase) {
            const encodedPassphrase = encodeURIComponent(passphrase).replace(/%20/g, '+');
            queryString += `&passphrase=${encodedPassphrase}`;
            console.log('Appending passphrase =>', encodedPassphrase);
        }

        console.log('Final queryString for MD5:', queryString);

        // 5) Generate MD5
        const signature = crypto.createHash('md5').update(queryString).digest('hex');
        console.log('Generated MD5 signature:', signature);

        // 6) Return the signature
        return {
            statusCode: 200,
            body: JSON.stringify({ signature }),
        };
    } catch (error) {
        console.error('=== ERROR: Caught exception ===', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message,
                stack: error.stack,
            }),
        };
    }
};
