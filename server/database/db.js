import mongoose from 'mongoose'

const Connection = async (username,password) => {
    const URL = `mongodb://${username}:${password}@ac-dhtpimn-shard-00-00.csrkw9z.mongodb.net:27017,ac-dhtpimn-shard-00-01.csrkw9z.mongodb.net:27017,ac-dhtpimn-shard-00-02.csrkw9z.mongodb.net:27017/?ssl=true&replicaSet=atlas-t8ixda-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log("Database conneceted successfully")

    } catch (error) {
        console.log("error while connectiong database", error);
    }
}
export default Connection;