import mongoose from "mongoose";

const getMongoUrl = () => {
  const { MONGO_DB_NAME, MONGO_URI, MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_QUERY } =
    process.env;

  if (!MONGO_USER) {
    return `mongodb://${MONGO_URI}/${MONGO_DB_NAME}`;
  } else {
    return `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?${MONGO_QUERY}`;
  }
};

export const MongoConnect = async () => {
  await mongoose.connect(getMongoUrl());
  console.info("MongoDB connection established");
};
