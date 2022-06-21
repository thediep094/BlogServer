const express = require('express');
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver/resolvers');
const mongoDataMethods = require('./data/data')


const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ mongoDataMethods })
});

const connectDB = async () => {
	try {
		await mongoose.connect(`mongodb+srv://thediep094:diep0904@blog2.5g09o.mongodb.net/?retryWrites=true&w=majority`)
		console.log('MongoDB connected sucessfully')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}


connectDB()
port = process.env.PORT || 80
server.listen({port}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
