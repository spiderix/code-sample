import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import graphqlHTTP from 'express-graphql';


import schema from './Graphql/RequestSchema'

const app:express.Application = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser());


// serve static files (bundled react, angular app)
app.use('/', express.static(path.resolve('./public')));
// default route
app.get('/', (req,res)=>{
  res.sendFile(path.resolve('./public/index.html'))
})

app.use('/api', graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.use((req, res, next)=>{
  res.status(404)
  if(req.accepts('html')) return res.send('<h1>404 Not found</h1>')
  if(req.accepts('json')) return res.json({status: 404, payload: "Not Found"})
})

export default app;