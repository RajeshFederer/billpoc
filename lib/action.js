'use strict';

let action = {};

action.bookTicket = (req, res) => {

    let policyNo, policyInfo;
    let parameters = req.body.queryResult.parameters;
    let reqParams = parameters;
    console.log('PARAMS', parameters);

    if (!parameters.awayTeam || !parameters.homeTeam || !parameters.noOfTickets || !parameters.matchDate || !parameters.matchTime) {
        if(parameters.homeTeam == parameters.awayTeam) {
            delete reqParams.homeTeam ;
            delete reqParams.awayTeam;
            console.log('DELETED ', reqParams);
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
                    name: "bookTicket"
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
                    name: "bookTicket"
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