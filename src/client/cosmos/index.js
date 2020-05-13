const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
// const dbContext = require("./data/databaseContext");
//  </ImportConfiguration>

//  <DefineNewItem>
const newItem = {
    id: "3",
    category: "fun",
    name: "Cosmos DB",
    description: "Complete Cosmos DB Node.js Quickstart ⚡",
    isComplete: false
};
//  </DefineNewItem>

// function createDatabase(){
//     const { endpoint, key, databaseId, containerId } = config;
//     const client = new CosmosClient({ endpoint, key });
//
//     return new Promise(()=>dbContext.create(client, databaseId, containerId));
// }


/*
// This script ensures that the database is setup and populated correctly
*/
async function create(client, databaseId, containerId) {
    const partitionKey = config.partitionKey;

    /**
     * Create the database if it does not exist
     */
    const { database } = await client.databases.createIfNotExists({
        id: databaseId
    });
    console.log(`Created database:\n${database.id}\n`);

    /**
     * Create the container if it does not exist
     */
    const { container } = await client
        .database(databaseId)
        .containers.createIfNotExists(
            { id: containerId, partitionKey },
            { offerThroughput: 400 }
        );

    console.log(`Created container:\n${container.id}\n`);
}

// module.exports = { create };

function getContainer(){
    const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);
    console.log("Connected to cosmos db");
    return container;
}
// async function main() {

    // <CreateClientObjectDatabaseContainer>
    // const { endpoint, key, databaseId, containerId } = config;
    //
    // const client = new CosmosClient({ endpoint, key });
    //
    // const database = client.database(databaseId);
    // const container = database.container(containerId);

    // Make sure Tasks database is already setup. If not, create it.
    // </CreateClientObjectDatabaseContainer>


    // try {
    //     // <QueryItems>
    //     console.log(`Querying container: Items`);
    //
    //     // query to return all items
    //     const querySpec = {
    //         query: "SELECT * from c"
    //     };
    //
    //     // read all items in the Items container
    //     const { resources: items } = await container.items
    //         .query(querySpec)
    //         .fetchAll();
    //
    //     items.forEach(item => {
    //         console.log(`${item.id} - ${item.description}`);
    //     });
    //     // </QueryItems>
    //
    //     // <CreateItem>
    //     /** Create new item
    //      * newItem is defined at the top of this file
    //      */
    //     const { resource: createdItem } = await container.items.create(newItem);
    //
    //     console.log(`\r\nCreated new item: ${createdItem.id} - ${createdItem.description}\r\n`);
    //     // </CreateItem>
    //
    //     // <UpdateItem>
    //     /** Update item
    //      * Pull the id and partition key value from the newly created item.
    //      * Update the isComplete field to true.
    //      */
    //     const { id, category } = createdItem;
    //
    //     createdItem.isComplete = true;
    //
    //     const { resource: updatedItem } = await container
    //         .item(id, category)
    //         .replace(createdItem);
    //
    //     console.log(`Updated item: ${updatedItem.id} - ${updatedItem.description}`);
    //     console.log(`Updated isComplete to ${updatedItem.isComplete}\r\n`);
    //     // </UpdateItem>
    //
    //     // <DeleteItem>
    //     /**
    //      * Delete item
    //      * Pass the id and partition key value to delete the item
    //      */
    //     const { resource: result } = await container.item(id, category).delete();
    //     console.log(`Deleted item with id: ${id}`);
    //     // </DeleteItem>
    //
    // } catch (err) {
    //     console.log(err.message);
    // }
// }

module.exports = {
    getContainer,
    // createDatabase
};
