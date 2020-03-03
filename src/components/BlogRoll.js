import React from 'react'
import PropTypes from 'prop-types'
import {Link, graphql, StaticQuery} from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import {kebabCase} from "lodash";

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
                    <p className="card__title">
                      {post.frontmatter.title}
                    </p>
                  </div>
                  {post.frontmatter.tags && post.frontmatter.tags.length ? (
                    <ul className="tag-list tag-list--card">
                      {post.frontmatter.tags.map(tag => (
                        <Link to={`/tags/${kebabCase(tag)}/`}>
                          <li key={tag + `tag`} className="tag">
                            {tag}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  ) : null}
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
                tags
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count}/>}
  />
)
