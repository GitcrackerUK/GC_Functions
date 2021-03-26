const request = require('request-promise');

const fulfillment = async (req, res) => {
    const intent = req.body; // will contain a webview, like the example above...

    try {
        let URL = intent.url + '?';
        // add in the query parameters...
        let first = true;
        for (let key in intent.query) {
            if (key == 'primaryPestId') {
                URL += `${!first ? '&' : ''}${key}=${intent.query[key].split('!')[1] || ''}`;
            } else {
                URL += `${!first ? '&' : ''}${key}=${intent.query[key] || ''}`;
            }
            first = false;
        }
        console.log('URL = ', URL);
        const response = await request({
            headers: intent.headers || {},
            uri: URL,
            json: true,
            method: intent.method || 'GET',
        });
        let ebmResponse = {
            format: 'ebm-api-response',
            version: 1,
            responses: [],
            userVariables: [
                {
                    name: 'pest_service_available',
                    value: '' + response.serviceAvailability,
                },
            ],
        };

        if (response.serviceAvailability) {
            ebmResponse.userVariables.push({
                name: 'pest_sold_by',
                value: response.soldBy,
            });
            ebmResponse.userVariables.push({
                name: 'customer_district',
                value: response.district,
            });
        }
        return res.send(ebmResponse);
    } catch (error) {
        console.log('error = ', error);
        return res.status(500).send({
            error,
        });
    }
};

exports.fulfillment = fulfillment;
