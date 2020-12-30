import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const RiskEvaluationOfSoftwareChangesPage = () => (
  <Layout>
    <SEO title="Risk Evaluation Of Software Changes" />
    | <Link to="/">Home</Link> |
    <h1>Risk Evaluation Of Software Changes</h1>
    <p>Changes to medical device software can come from many different sources:</p>
    <p>
      <ul>
        <li>Customer complaints</li>
        <li>Customer feedback</li>
        <li>Marketting requests</li>
        <li>Engineering changes</li>
      </ul>
    </p>
    <p>But no matter the source, each request for a change to existing software needs to be evaluated for risk, in this article I shall describe some key points to consider when doing this evaluation.</p>
    <p>Any software change can be related to risk in any of the following ways:</p>
    <p>
      <ol>
        <li>Failure to make the change could result in risks, this is especially true for issues and security vulnerabilities.</li>
        <li>The change could invalidate an existing software risk control measure.</li>
        <li>The change could introduce new hazourous situations.</li>
        <li>The change could require a new external risk control measure.</li>
      </ol>
    </p>
    <p><h2>1. Risks associated with not implementing a change.</h2></p>
    <p>This is the first type of evaluation that can be done and will likely be used to identify if the change is considered a problem as requested by 62304.</p>
    <p>The actual criteria for what software changes are consider a problem is up to you, but a good starting point is any change that would lead to an unnaceptable safety risk or security vulnerability if the change is not implemented, when considering risk control measures which are already implemented in the medical device.</p>
    <p>Often, this evaluation will also be a contributing factor as to whether the change gains approval to be implemented.</p>
    <p><h2>2. Risk control measures impacted by the change.</h2></p>
    <p>This next type of evaluation should look at existing risk control measures in your risk management, to identify if the change is an issue related to a software risk control measure or if the change could impact an existing risk control measure.</p>
    <p>For example, a risk control measure which states "the software shall monitor the temperature and assert the shutdown signal if it exceeds 40°C" could be impacted by a change in the following ways:</p>
    <p>
      <ul>
        <li>Impacted by a bug which results in incorrectly measured temperatures.</li>
        <li>Directly impacted by a change to increase the operating temperature to 50°C.</li>
        <li>Indirecly impacted by a change to apply averaging to the measured temperature.</li>
      </ul>
    </p>
    <p>In all cases, the risk management file should be updated to capture the impact.</p>
    <p><h2>3. Hazardous situations which could arise from the change.</h2></p>
    <p>This evaluation should be performed to identify any aspects of the change which could result in a new hazardous situation and the harms which could come from the identified situations.</p>
    <p>When performing this evaluation, the following should be considered:</p>
    <ul>
      <li>The User interraction with the software.</li>
      <li>The functionality of the new software changes.</li>
      <li>The interractions between the modified software items, other software items and external hardware.</li>
    </ul>
    <p><h2>4. Changes that require new external risk control measures.</h2></p>
    <p>This evaluation follows on from the previous evaluation, the scoring of a Hazard which has been identified, may possibly be reduced further by the addition of a hardware change which either reduces the likelyhood of the hazardous situation ocurring or reduces the likelyhood of harm ocurring from the situation, if this risk control measure already exists within the system then we can simply add it as a risk control measure for the hazard when we generate it and re-score accordingly.</p>
    <p>If the control measure is not already in place then a new external risk control measure will need to be added.</p>
    <p>I have called out external risk control measures in this section, although the same software system can be used to mitigate specific software failures, these mitigations should not be used to reduce the risk scoring.</p>
    <p><h1>Summary</h1></p>
    <p>Any change to medical device software has the potential to add risk to the product, by evaluating the possible impact of a change as early as possible, any changes to external hardware or software systems required to reduce the risk an acceptable level can be incorporated with plenty of time for integration, therefore reducing one cause of project timelines slipping.</p>
    <p>Risk should be evaluated throughout the process of implemeting the change, including when requirements are added or modified, in order to minimise the risk of the change resulting in an unacceptable risk which could cause harm.</p>
  </Layout>
)

export default RiskEvaluationOfSoftwareChangesPage
