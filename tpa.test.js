const axios = require('axios');
require('dotenv').config();
var configjson = JSON.parse(process.env.apikeys)


Object.keys(configjson).forEach(function (key) {
    const url = key.split("+")
    // console.log(url[0]);
    
    var config = {          //SQL injection
        method: 'Post',
        url: `${process.env.testenvurl}${url[0]}`,
        headers: {
            'x-api-key': `l7xxac117ccf8a494eb9a7ebee2c6cff3a8d'`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "testdata": "testdata"
        })
    };

    var config1 = {         //Code injecton
        method: 'Post',
        url: `${process.env.testenvurl}${url[0]}`,
        headers: {
            'x-api-key': `l7xxac117ccf8a494eb9a7ebee2c6cff3a8d<name></name>`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "testdata": "testdata"
        })
    };

    var config2 = {           //API key not provided
        method: 'Post',
        url: `${process.env.testenvurl}${url[0]}`,
        headers: {
            
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "testdata": "testdata"
        })
    };

    var config3 = {             //Invalid API key
        method: 'Post',
        url: `${process.env.testenvurl}${url[0]}`,
        headers: {
            'x-api-key': '123',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "testdata": "testdata"
        })
    };

    var config4 = {             //for backend reachability,context switching,Token not provided
        method: 'Post',
        url: `${process.env.testenvurl}${url[0]}`,
        headers: {
            'x-api-key': 'l7xxac117ccf8a494eb9a7ebee2c6cff3a8d',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "testdata": "testdata"
        })
    };

    // var config5 = {              //IP White listing
    //     method: 'Post',
    //     url: `${process.env.testenvurl}${url[0]}`,
    //     headers: {
    //         'x-api-key': 'l7xxac117ccf8a494eb9a7ebee2c6cff3a8d',
    //         'x-forwarded-for': '13123',
    //         'Content-Type': 'application/json'
    //     },
    //     data: JSON.stringify({
    //         "testdata": "testdata"
    //     })
    // };

    var config6 = {             // Invalid Token
        method: 'Post',
        url: `${process.env.testenvurl}${url[0]}`,
        headers: {
            'x-api-key': 'l7xxac117ccf8a494eb9a7ebee2c6cff3a8d',
            'Authorization': 'Bearer 1234',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "testdata": "testdata"
        })
    };

    // var config7 = {
    //     method: 'Post',
    //     url: `${process.env.testenvurl}${url[0]}`,
    //     headers: {
    //         'x-api-key': 'l7xxac117ccf8a494eb9a7ebee2c6cff3a8d',
    //        // 'Authorization': ' ',
    //         'Content-Type': 'application/json'
    //     },
    //     data: JSON.stringify({
    //         "testdata": "testdata"
    //     })
    // };


    // test(`IP Whitelisting Check for URL ${process.env.testenvurl}${url[0]}`, async () => {
    //     try {
    //         const r = await axios(config5)
    //     } catch (error) {
    //         expect(error.response.data.errors[0].reason).toBe('Access Restricted')
    //     }
    // });

    test(`SQL Injection Check for URL ${process.env.testenvurl}${url[0]}`, async () => {
        try {
            const r = await axios(config)
        } catch (error) {
            expect(error.response.data.errors[0].reason).toBe('SQL injection')
        }
    });

    test(`Code Injection Check for URL ${process.env.testenvurl}${url[0]}`, async () => {
        try {
            const r = await axios(config1)
        } catch (error) {
            expect(error.response.data.errors[0].reason).toBe('Code injection')
        }
    });

    test(`API Key Not Provided Check for URL ${process.env.testenvurl}${url[0]}`, async () => {
        try {
            const r = await axios(config2)
        } catch (error) {
            expect(error.response.data.reason).toBe('API Key not provided')
        }
    });

    test(`Invalid API Key Check for URL ${process.env.testenvurl}${url[0]}`, async () => {
        try {
            const r = await axios(config3)
        } catch (error) {
            expect(error.response.data.errors[0].reason).toBe('Invalid API Key')
        }
    });

    test(`Backend Reachability Check for URL ${process.env.testenvurl}${url[0]}`, async () => {
        try {
            const r = await axios(config4)
        } catch (error) {

            if (error.response.data.errors == undefined) {
                // console.log(error.response.data);
                expect(error.response.data).not.toBe('Connection refused')
                expect(error.response.data).not.toBe('Connection Reset')
            } else {
                expect(error.response.data.errors[0].reason).not.toBe('Connection refused')
                expect(error.response.data.errors[0].reason).not.toBe('Connection Reset')
            }
            // expect(error.response.data.errors[0].reason).toBe('Connection refused')
        }
    });

    test(`Context Switched to Node.js for URL ${process.env.testenvurl}${url[0]}`, async () => {
        try {
            const r = await axios(config4)
        } catch (error) {
            expect(error.response.headers['x-powered-by']).toBe('Express')

        }
    });

    test(`Invalid Token ${process.env.testenvurl}${url[0]}`, async () => {
        try {
            const r = await axios(config6)
        } catch (error) {
            expect(error.response.data.errors[0].reason).toBe('invalid_request')
        }
    });

    test(`Token Not Provided ${process.env.testenvurl}${url[0]}`, async () => {
        try {
            const r = await axios(config4)
        } catch (error) {
            expect(error.response.data.errors[0].reason).toBe('Bad Request')
        }
    });
});
