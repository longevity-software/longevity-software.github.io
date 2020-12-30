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
    <p>About: I am a Software / Firmware engineer with over 15 years experience in the medical device industry.</p>
    <Link to="/RiskEvaluationOfSoftwareChanges/">Risk Evaluation Of Software Changes</Link> <br />
  </Layout>
)

export default IndexPage
