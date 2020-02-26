import React from 'react'
import {graphql, Link, StaticQuery} from 'gatsby'
import logo from '../img/logo.svg'
import {kebabCase} from "lodash";
import PropTypes from "prop-types";

class NavbarPost extends React.Component {
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
    const { group } = data.markdownRemark;

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
        <div className="card card--sticky">
          <div className="card__title-section">
            <p className="card__title">目次</p>
          </div>
        </div>
      </nav>
    )
  }
}

NavbarPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      tableOfContents: PropTypes.array,
    }),
  }),
};


export default NavbarPost

export const NavbarPostQuery = graphql`
  query NavbarPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      tableOfContents
    }
  }
`;