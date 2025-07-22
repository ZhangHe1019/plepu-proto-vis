import React from 'react';
import { Card, Row, Col } from 'antd';

const EpuInfoCard = () => (
  <Card
    title="What You Should Know About the Economic Policy Uncertainty (EPU) Indicator"
    style={{ marginTop: 40 }}
  >
    <Row gutter={[32, 16]}>
      {/* Left Column */}
      <Col xs={24} md={12}>
        <p>
          The Economic Policy Uncertainty (EPU) indicator measures the level of uncertainty in economic policy as reflected in news media, tax codes, and disagreement among economic forecasters. It helps researchers and policymakers assess how uncertainty surrounding government policies—such as fiscal rules, trade regulations, and monetary interventions—affects economic decision-making and performance.
        </p>
        <p>
          This indicator is available across multiple countries and time periods. It is often used alongside macroeconomic indicators like GDP and inflation to analyze business cycles, investment behavior, and risk assessment.
        </p>
        <h3>EPU Index Characteristics:</h3>
        <ul>
          <li>Based on the frequency of newspaper articles containing keywords related to the economy, policy, and uncertainty.</li>
          <li>Often normalized to have a mean of 100 in a specific reference year (e.g., U.S. EPU is normalized to 100 in 1985–2009).</li>
          <li>Monthly and annual averages are available, providing both short- and long-term views of uncertainty trends.</li>
          <li>Available for individual countries as well as global aggregates.</li>
        </ul>
      </Col>

      {/* Right Column */}
      <Col xs={24} md={12}>
        <h3>Why it matters:</h3>
        <p>
          High economic policy uncertainty can delay investment, reduce hiring, and lead to lower economic growth. Tracking EPU helps analysts interpret shifts in market confidence and the broader economic environment.
        </p>
        <h3>Sources & Methodology:</h3>
        <p>
          Developed by researchers at Stanford University, the University of Chicago, and Northwestern University. Methodology includes textual analysis of major national newspapers and adjustments for article volume and content drift.
        </p>
        <p><strong>Source</strong><br />
          Data compiled from multiple sources by World Bank (2025) – with minor processing by Our World in Data
        </p>
        <p><strong>Last updated</strong><br />
          January 24, 2025
        </p>
        <p><strong>Next expected update</strong><br />
          January 2026
        </p>
        <p><strong>Learn more</strong><br />
          <a href="https://www.policyuncertainty.com/" target="_blank" rel="noopener noreferrer">
            Visit the Economic Policy Uncertainty website
          </a> for detailed methodology, country-specific data, and historical trends.
        </p>
      </Col>
    </Row>
  </Card>
);

export default EpuInfoCard;

