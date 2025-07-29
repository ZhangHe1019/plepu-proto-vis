import React from 'react';
import { Typography, Card, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

const cardStyle = {
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  padding: 24,
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  fontFamily: 'Times New Roman',
};

const PartnershipPage = () => {
  return (
    <div style={{ padding: 40, background: '#f9f9f9', minHeight: '80vh', maxWidth: 1600, margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 40, fontFamily: 'Times New Roman' }}>
        Collaborations & Partnerships
      </Title>

      {/* First Row: Mediaboard card full width on small screens, centered with fixed max width */}
      <Row justify="center" style={{ marginBottom: 40 }}>
        <Col xs={24} sm={20} md={16} lg={12} style={{ display: 'flex' }}>
          <Card style={cardStyle}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
              Our Trusted Partner
            </Title>
            <img
              src="/mediaboardlogo.png"
              alt="Mediaboard Logo"
              style={{
                width: '60%',
                maxWidth: 180,
                marginBottom: 24,
                filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
            <Paragraph style={{ fontSize: 16, lineHeight: 1.6, color: '#555', fontWeight: 500 }}>
              We proudly collaborate with Mediaboard to deliver exceptional media monitoring and analytics
              services, ensuring you receive the best insights for your data-driven decisions.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Second Row: Two cards side by side */}
      <Row justify="center" gutter={[48, 24]}>
        <Col xs={24} sm={20} md={12} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={cardStyle}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                Why Partner With Us?
            </Title>
            <ul
                style={{
                paddingLeft: 20,
                lineHeight: 1.6,
                fontFamily: 'Arial, Helvetica, sans-serif',
                color: '#333',
                fontWeight: 500,
                }}
            >
                <li>Contribute to impactful research on economic policy uncertainty.</li>
                <li>Collaborate on innovative data-driven tools and dashboards.</li>
                <li>Enhance your organization’s visibility within academic and public sectors.</li>
            </ul>
            </Card>
        </Col>

        <Col xs={24} sm={20} md={12} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={cardStyle}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                Interested in Partnering?
            </Title>
            <Paragraph>
                Please reach out via the <strong>Contact Us</strong> page or send an email to{' '}
                <a href="mailto:contact@epu-poland.org">contact@epu-poland.org</a>. We’re open to all forms of collaboration.
            </Paragraph>
            </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PartnershipPage;
