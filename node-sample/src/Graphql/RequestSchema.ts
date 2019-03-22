import { GraphQLSchema, GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLList } from 'graphql';
import stack from '../controllers/QueryData'


const QuestionType = new GraphQLObjectType({
  name: 'question',
  fields: ()=>({
    question_id: {type: GraphQLString},
    title: {type: GraphQLString},
    is_answered: {type: GraphQLBoolean},
    body: {type: GraphQLString},
    answers: {
      type: new GraphQLList(AnswerType),
      resolve: async (parent, args)=>{
        return await stack.getAnswers({ question_id: parent.question_id, is_accepted: parent.is_answered})
      }
    },
  })
});

const AnswerType = new GraphQLObjectType({
  name: 'Answer',
  fields: ()=>({
    answer_id: {type: GraphQLString},
    body: {type: GraphQLString}
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuestion',
  fields: {
    question: {
      type: QuestionType,
      args: { question_id: {type: GraphQLString}, body: {type: GraphQLBoolean}},
      resolve: async(parent, args)=>{
        return await stack.getQuestionById(args)
      }
    },
    search: {
      type: new GraphQLList(QuestionType),
      args: {intitle: {type: GraphQLString}},
      resolve: async (parent, args)=>{
        return await stack.search(args);
      }
    }
  },
});



export default new GraphQLSchema({
  query: RootQuery
});