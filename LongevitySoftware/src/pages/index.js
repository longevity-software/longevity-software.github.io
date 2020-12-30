import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h2>About Me:</h2>
    <p>Name: Graham Long</p>
    <p>About: I am a Software / Firmware engineer with over 15 years experience in the medical device industry, the last 5+ of those years has been as a software engineer on class A, B and C software systems.</p>
    <p>Purpose: My aim with this website is to share some of the knowledge which I have gained in my career with others and to strengthen my knowledge in the process.</p>
    | <Link to="/RiskEvaluationOfSoftwareChanges/">Risk Evaluation Of Software Changes</Link> | <br />
  </Layout>
)

export default IndexPage
