import React from 'react'
import PropTypes from 'prop-types'
import {Link, graphql, StaticQuery} from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const {data} = this.props;
    const {edges: posts} = data.allMarkdownRemark;

    return (
      <div className="card-list">
        {posts &&
        posts.map(({node: post}) => (
          <Link to={post.fields.slug}>
            <div className="card card--is-clickable" key={post.id}>
              <article className="card__content">
                <header className="card__header">
                  <p className="card__date">
                    {post.frontmatter.date}
                  </p>
                  <div className="card__title-section">
                    {post.frontmatter.featuredimage ? (
                      <div className="card__image">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: post.frontmatter.featuredimage,
                            alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                          }}
                        />
                      </div>
                    ) : null}
                    <p className="card__title">
                      {post.frontmatter.title}
                    </p>
                  </div>
                </header>
                {post.frontmatter.description &&
                  <p className="card__excerpt">
                    {post.frontmatter.description}
                  </p>
                }
              </article>
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export { BlogRoll }
export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                description
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
    `}
    render={(data, count) => <BlogRoll data={data} count={count}/>}
  />
)
