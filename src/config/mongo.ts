import 'dotenv/config';
import { connect } from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

async function dbConnect(): Promise<void> {
  const DB_URI = process.env.DB_URI ?? 'mongodb://localhost:27017/iadopt';
  await connect(DB_URI, options);
  if (DB_URI.includes('srv')) {
    const client = new MongoClient(DB_URI, {
      serverApi: ServerApiVersion.v1,
    });

    await client
      .connect()
      .then(() => {
        console.log('Connected to MongoDB Atlas');
      })
      .catch((err) => {
        console.log('Connection error: ', err);
      });
  }
}
export default dbConnect;
