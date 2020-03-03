import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import { BlogRoll } from "../components/BlogRoll";

class TagRoute extends React.Component {
  render() {
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`}/>
          <div className="post-head post-head--tags">
            <h1 className="post-head__title post-head__title--tags">
              { tag }
            </h1>
            <h2 className="post-head__subtitle">
              {totalCount}件の投稿
            </h2>
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
            description
            date(formatString: "YYYY/MM/DD")
            tags
          }
        }
      }
    }
  }
`;
