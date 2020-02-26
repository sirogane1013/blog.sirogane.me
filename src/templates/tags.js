import React from 'react'
import Helmet from 'react-helmet'
import {Link, graphql} from 'gatsby'
import Layout from '../components/Layout'
import { BlogRoll } from "../components/BlogRoll";
import {kebabCase} from "lodash";

class TagRoute extends React.Component {
  render() {
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${tag}(${totalCount})`;

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`}/>
          <div className="post-head">
            <h1 className="post-head__title">
              {tagHeader}
            </h1>
          </div>
          <BlogRoll data={{
            allMarkdownRemark: this.props.data.allMarkdownRemark
          }} />
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 100)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "YYYY/MM/DD")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
