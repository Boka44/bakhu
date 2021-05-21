const hubspot = require('@hubspot/api-client');
const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const hubspotClient = new hubspot.Client({ apiKey: HUBSPOT_API_KEY });

const hubspotController = () => {};

hubspotController.generateContactLead = async (req, res, next) => {
    
    try {

        leadObj = req.body;

        let email = leadObj.email;
        let phone = leadObj.phone;
        let name = leadObj.name;
        let message = leadObj.message;
        let jobTitle = leadObj.jobTitle;
        let company = leadObj.company;
        let liquidity = leadObj.liquidity;

        const contactObj = {
            properties: {
                firstname: name, 
                lifecyclestage: "lead",
                email: email,
                phone: phone

            },
        }




        const filter = { propertyName: 'email', operator: "EQ",  value: email }
        const filterGroup = { filters: [filter] }
        const sort = JSON.stringify({ propertyName: 'email', direction: 'DESCENDING' })
        const properties = ['id', 'email']
        const limit = 100
        const after = 0

        const publicObjectSearchRequest = {
            filterGroups: [filterGroup],
            sorts: [sort],
            properties,
            limit,
            after,
        }

        const searchContactResponse = await hubspotClient.crm.contacts.searchApi.doSearch(publicObjectSearchRequest);
        
        if(searchContactResponse.body.total > 0) {
            let id = searchContactResponse.body.results[0].id;
            const createContactResponse = await hubspotClient.crm.contacts.basicApi.update(id, contactObj)

            hubspotController.createNote(id, leadObj.formattedMessage);
        } else {
            const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(contactObj)
            let id = createContactResponse.body.id;

            hubspotController.createNote(id, leadObj.formattedMessage);
        }

    } catch(error) {
        console.log(error);
        res.json({
            success: false,
            response: error
        });
    }
}

hubspotController.generateContactSubscriber = async (req, res, next) => {
    
    try {
        let email = req.body.email;

        const contactObj = {
            properties: {
                email: email,
                lifecyclestage: "subscriber"
            },
        }

        const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(contactObj)

        res.json({
            success: true,
            response: createContactResponse.response
        });
    } catch(error) {
        console.log(error);
        res.json({
            success: false,
            response: error
        });
    }
    
}

hubspotController.createNote = (id, note) => {
    var request = require("request");

    var options = { method: 'POST',
    url: 'https://api.hubapi.com/engagements/v1/engagements',
    qs: { hapikey: HUBSPOT_API_KEY },
    headers: 
    {'Content-Type': 'application/json' },
    body: 
    { engagement: 
        { active: true,
            ownerId: 1,
            type: 'NOTE',
            timestamp: Date.now() },
        associations: 
        { contactIds: [ id ],
            companyIds: [],
            dealIds: [],
            ownerIds: [] },
        metadata: { body: note } },
    json: true };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    });

}

module.exports = hubspotController;