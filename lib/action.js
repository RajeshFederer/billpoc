'use strict';

let action = {};

action.bookTicket = (req, res) => {

    let policyNo, policyInfo;
    let parameters = req.body.queryResult.parameters;
    let reqParams = parameters;
    console.log('PARAMS', parameters);

    if (!parameters.matchDate) {
        return res.json({
            "fulfillmentText": "Hey Fill up the required details",
            "fulfillmentMessages": [{
                "text": {
                    "text": [
                        "Hey Fill up the required details",
                    ]
                }
            }],
            followupEventInput: {
                name: "bookTicket",
                parameters: reqParams,
                language_code: "en"
            }
        });
    } else {
        let homeTeam = parameters.homeTeam || "Home";
        let awayTeam = parameters.awayTeam || "Team";

        let resMsg = {
            "fulfillmentText": "Your Tickets has been booked for " + homeTeam + "vs" + awayTeam,
            "fulfillmentMessages": [{
                "text": {
                    "text": [
                        "Your Tickets has been booked for " + homeTeam + "vs" + awayTeam,
                        "Have a good match !"
                    ]
                }
            }]
        };
        return res.json(resMsg);
    }
};

module.exports = action;