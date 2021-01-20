import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
// import { Helmet } from 'react-helmet';
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { FirebaseAuthProvider } from "@react-firebase/auth"
import firebase from "gatsby-plugin-firebase"

import Toolbar from "@material-ui/core/Toolbar"
import StickyFooter from "../StickyFooter"

import theme from "../theme"
import Viewport from "./viewport"
import Header from "../Header"
// import Fab from "@material-ui/core/Fab"
// import Icon from "@material-ui/core/Icon"
// import ScrollTop from "../ScrollTop"
//import MenuAppBar from "../MenuAppBar"
// import ButtonAppBar from '../ButtonAppBar';
// Global styles and component-specific styles.

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <FirebaseAuthProvider firebase={firebase}>
        <Viewport />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: `0 1.0875rem 1.45rem`,
            }}
          >
            <Toolbar id="scrollTopTarget" />
            <main>{children}</main>
            <StickyFooter />
          </div>
        </ThemeProvider>
      </FirebaseAuthProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
