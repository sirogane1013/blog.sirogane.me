import React from 'react'
import PropTypes from 'prop-types'
import {kebabCase} from 'lodash'
import Helmet from 'react-helmet'
import {graphql, Link} from 'gatsby'
import Layout from '../components/Layout'
import Content, {HTMLContent} from '../components/Content'

export const BlogPostTemplate = ({
                                   content,
                                   contentComponent,
                                   description,
                                   date,
                                   tags,
                                   title,
                                   helmet,
                                 }) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ''}
      <div className="post-head">
        <span className="post-head__date">
          {date}
        </span>
        <h1 className="post-head__title">
          {title}
        </h1>
        {tags && tags.length ? (
          <div>
            <ul className="tag-list">
              {tags.map(tag => (
                <Link to={`/tags/${kebabCase(tag)}/`}>
                  <li key={tag + `tag`} className="tag">
                    {tag}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="post-content">
        <p className="post-content__description">{description}</p>
        <PostContent content={content}/>
      </div>
    </section>
  )
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const BlogPost = ({data}) => {
  const {markdownRemark: post} = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        date={post.frontmatter.date}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY/MM/DD")
        title
        description
        tags
      }
    }
  }
`;
