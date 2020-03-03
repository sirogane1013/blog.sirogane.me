import React from 'react'
import {graphql, Link, StaticQuery} from 'gatsby'
import logo from '../img/logo.svg'
import avatar from '../img/avatar.svg'
import {kebabCase} from "lodash";
import PropTypes from "prop-types";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
            navBarActiveClass: 'is-active',
          })
          : this.setState({
            navBarActiveClass: '',
          })
      }
    )
  };

  render() {
    const { data } = this.props;
    const { group } = data.allMarkdownRemark;

    return (
      <nav
        className="navbar"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="navbar__brand">
          <Link to="/" title="Logo" className="navbar__logo">
            <img src={ logo } alt="Sirogane's Blog" style={{ width: '100%' }} />
          </Link>
        </div>
        <div className="card card--profile">
          <div className="card__title-section">
            <p className="card__title">About</p>
          </div>
          <div className="card__row">
            <div className="card__image card__image--profile">
              <img src={ avatar } alt="Sirogane" style={{ width: '100%' }} />
            </div>
            <div className="card__column">
              <p className="card__main card__main--profile">
                私(わたくし)的ブログ
              </p>
              <ul className="card__list">
                <li>
                  <a href="https://github.com/sirogane1013" className="card__ext-link">github</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card__title-section">
            <p className="card__title">Tags</p>
          </div>
          <div className="card__main">
            <ul className="tag-list">
              {group.map(tag => (
                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  <li key={tag.fieldValue} className="tag">
                      {tag.fieldValue} ({tag.totalCount})
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query NavbarQuery {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark(limit: 1000) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={(data, count) => <Navbar data={data} count={count}/>}
  />
)