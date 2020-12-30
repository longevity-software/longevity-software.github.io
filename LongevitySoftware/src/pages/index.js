import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>About Me:</h1>
    <p>Name: Graham Long</p>
    <p></p>
    <Link to="/page-2/">Risk Evaluation Of Software Changes</Link> <br />
  </Layout>
)

export default IndexPage
