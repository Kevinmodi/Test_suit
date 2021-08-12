const axios = require('axios');
require('dotenv').config();
var configjson = JSON.parse(process.env.apikeys)

Object.keys(configjson).forEach(function (key) {
    const url = key.split("+")
    // console.log(url[0]);

    var Certificate_not_provide = {          
        method: 'Post',
        url: `${process.env.testenvurl}${url[0]}`,
        headers: {
            'x-api-key': `l7xxac117ccf8a494eb9a7ebee2c6cff3a8d`,
            'Authorization': 'Bearer 55fe3ca8-9b02-40c9-899b-a8e822546e5d',

            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "testdata": "testdata"
        })
    };

    test(`Certificate Not Provide ${process.env.testenvurl}${url[0]}`, async () => {
        try {
            const r = await axios(Certificate_not_provide)
        } catch (error) {
            expect(error.response.data.errors[0].details).toBe('Missing client certificate')
        }
    });
});


// var Invalid_Certificate = {          
//     method: 'Post',
//     url: `${process.env.testenvurl}${url[0]}`,
//     headers: {
//         'x-api-key': `l7xxac117ccf8a494eb9a7ebee2c6cff3a8d`,
//         'x-cert':`abcd`,
//        'Content-Type': 'application/json'
//     },
//     data: JSON.stringify({
//         "testdata": "testdata"
//     })
// };

// test(`Invalid Certificate ${process.env.testenvurl}${url[0]}`, async () => {
//     try {
//         const r = await axios(Invalid_Certificate)
//     } catch (error) {
//         expect(error.response.data.errors[0].details).toBe('Invalid Certificate')
//     }
// });
