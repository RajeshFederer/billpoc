'use strict';

let action = {};

action.bookTicket = (req, res) => {

    let policyNo, policyInfo;
    let parameters = req.body.queryResult.parameters;
    let reqParams = parameters;
    console.log('PARAMS', parameters);

    if (!parameters.awayTeam || !parameters.homeTeam || !parameters.noOfTickets || !parameters.matchDate || !parameters.matchTime) {
        if(parameters.homeTeam === parameters.awayTeam) {
            reqParams.homeTeam = '';
            reqParams.awayTeam = '';
            return res.json({
                // "fulfillmentText": "Enter the Away Team Name",
                // "fulfillmentMessages": [{
                //     "text": {
                //         "text": [
                //             "Enter the Away Team",
                //         ]
                //     }
                // }],
                followupEventInput: {
                    name: "bookTicket",
                    parameters: reqParams,
                    language_code: "en"
                }
            });
        } else{
            return res.json({
                // "fulfillmentText": "Enter the Away Team Name",
                // "fulfillmentMessages": [{
                //     "text": {
                //         "text": [
                //             "Enter the Away Team",
                //         ]
                //     }
                // }],
                followupEventInput: {
                    name: "bookTicket",
                    parameters: reqParams,
                    language_code: "en"
                }
            });
        }
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