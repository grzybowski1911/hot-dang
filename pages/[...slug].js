import { gql } from "@apollo/client";
import client from "client";
import { getPageStaticProps } from "utils/getPageStaticProps";
import { Page } from "components/Page/Page";

export default Page;

export const getStaticProps = getPageStaticProps;

export const getStaticPaths = async () => {
    const {data} = await client.query({
        query: gql`
        query AllPagesQuery {
            pages {
              nodes {
                title
                uri
              }
            },
            properties {
              nodes {
                title
                uri
              }
            }
          }`
    });

    return {
        paths: [...data.pages.nodes.filter(page => page.uri !== "/"), ...data.properties.nodes].map( page => ({
            params: {
                slug: page.uri.substring(1, page.uri.length - 1).split("/")
            }
        })),
        fallback: false
    }
}