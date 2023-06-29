const { gql } = require("@apollo/client");
const { default: client } = require("client");

const handler = async (req, res) => {
    try {
      const filter = JSON.parse(req.body);
      
        const {data} = await client.query({
            query: gql`
            query AllPropertiesQuery {
              properties(where: {offsetPagination: {offset: ${((filter.page || 1) - 1) * 3 }, size: 3}}) {
                nodes {
                  title
                  uri
                  featuredImage {
                    node {
                      uri
                      sourceUrl
                    }
                  }
                  propertyFeatures {
                    bathrooms
                    bedrooms
                    hasParking
                    petFriendly
                    price
                  }
                  databaseId
                }
                pageInfo {
                  offsetPagination {
                    total
                  }
                }
              }
            }
            `
        })
        return res.status(200).json({
            total: data.properties.pageInfo.offsetPagination.total,
            properties: data.properties.nodes
        })
    } catch(e) {
        console.log("ERROR", e);
    }
}

export default handler; 