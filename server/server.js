const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer()

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

// NEED TO IMPLEMENT APOLLO SERVER