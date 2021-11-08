const { find } = require('lodash');
const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://HQ:D9Y4waNEiMK807bk@cluster0.mioeg.mongodb.net/Cluster0?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await createMultipleListings(client, [{
            name:"HQ",
            summary:"summary"
        },
        {
            name:"zihao",
            summary:"summary"
        }])
    } catch (e) {
        console.error(e);
    } finally{
        await client.close();
    }
}

main().catch(console.error);

async function deletelistingScrapedBeforeDate(client, date) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteMany({"last_scraped": {$lt: date}});

    console.log(`${result.deleteCount} documents was/were deleted`);
}

async function deleteListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteOne({name: nameOfListing});

    console.log(`${result.deletedCount} document was/were deleted`);
}

async function updateAllListing(client){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateMany({property_type: {$exists: false}}, {$set: {property_type: "Unknown"}});

    console.log(`${result.matchedCount} document(s) matched the query criteria`);
    console.log(`${result.modifiedCount} documents was/were updated`);
}

async function upsertListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({name: nameOfListing},{$set:updatedListing},{upsert: true});

    console.log(`${result.matchedCount} document(s) matched the query criteria`);
    
    if(result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId}`);
    }else{
        console.log(`${result.modifiedCount} documents was/were updated`);
    }
}

async function updateListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({name: nameOfListing},{$set:updatedListing});

    console.log(`${result.matchedCount} document(s) matched the query criteria`);
    console.log(`${result.modifiedCount} documents was/were updated`);
}

async function findListingsWithMinimumBBAMRR
(client, {
    minNumberOfBedroomds = 0,
    minNumberOfBathrooms = 0,
    maxNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find(
        {
            bedrooms: { $gte: minNumberOfBedroomds},
            bathrooms: { $gte: minNumberOfBathrooms}
        }).sort({last_review: -1})
        .limit(maxNumberOfResults);

    const results = await cursor.toArray();
}

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name: nameOfListing});

    if(result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    }else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function createMultipleListings(client, newListings) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
    console.log(`${result.insertedCount} new listings created with the following ids:`);
    console.log(result.insertedIds);
}

async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(`New listing created with the following id: - ${result.insertedId}`);
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("databases: ");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}