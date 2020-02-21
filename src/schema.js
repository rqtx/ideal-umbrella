const graphql = require('graphql');
const { PointObject, MultiPolygonObject } = require('graphql-geojson');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql
const pdvsModel = require('models/pdvs');

const pdvsType = new GraphQLObjectType({
  name: "pdvs",
  fields: {
      id: { type: GraphQLID },
      tradingName: { type: GraphQLString },
      ownerName: { type: GraphQLString },
      document: { type: GraphQLString },
      coverageArea: { type: MultiPolygonObject },
      address: { type: PointObject }
  }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        findById: {
          type: pdvsType,
          args: {
            id: { type: GraphQLNonNull(GraphQLID) }
          },
          resolve: (root, args, context, info) => {
            return pdvsModel.findById(args.id).exec();
          }
        },
        findByLocation: {
          type: pdvsType,
          args: {
            long: { type: GraphQLNonNull(GraphQLID) }
          },
          resolve: (root, args, context, info) => {
            return pdvsModel.find({
              location: {
               $near: {
                $maxDistance: 1000,
                $geometry: {
                 type: "Point",
                 coordinates: [args.lng, args.lat]
                }
               }
              }
             })
          }
        }
      }
    })
  })
  
  module.exports = schema