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
	}
}


connectDB()
server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
