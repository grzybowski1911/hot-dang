import client from "client";
import { gql } from "@apollo/client";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageStaticProps = async (context) => {

const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";

    const {data} = await client.query({
      query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            blocks
          }
          ... on Property {
            id
            blocks
          }
        }
        acfOptionsMainMenu {
          mainMenu {
            ctaButton {
              destination {
                ... on Page {
                  id
                  uri
                }
              }
              label
            }
            menuItems {
              menuItem {
                destination {
                  ... on Page {
                    id
                    uri
                  }
                }
                label
              }
              items {
                destination {
                  ... on Page {
                    id
                    uri
                  }
                }
                label
              }
            }
          }
        }
      }
    `,variables: {
        uri,
    }
    });
    const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);
    return {
      props: {
        mainMenuItems: mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
        ctaDestination: data.acfOptionsMainMenu.mainMenu.ctaButton.destination.uri,
        ctaLabel: data.acfOptionsMainMenu.mainMenu.ctaButton.label,
        blocks
      }
    }
  }