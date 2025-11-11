import React from 'react';
import { Typography, Card, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

const accentColor = '#4a90e2';  // subtle blue accent color

const cardStyle = {
  background: 'linear-gradient(145deg, #ffffff, #f0f4ff)', // soft gradient
  borderRadius: 14,
  boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
  padding: 30,
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'default',
};
const cardHoverStyle = {
  transform: 'translateY(-6px)',
  boxShadow: '0 12px 30px rgba(74, 144, 226, 0.3)',
};

const PartnershipPage = () => {
  // Use React useState/useEffect or inline style for hover effect (simplified here)
  
  return (
    <div style={{ padding: 48, background: '#f9f9f9', minHeight: '80vh', maxWidth: 1600, margin: '0 auto' }}>
      <Title
        level={2}
        style={{
          textAlign: 'center',
          marginBottom: 48,
          // fontFamily: "'Georgia', serif",
          color: 'black',
          fontWeight: 'bold',
        }}
      >
        Collaborations & Partnerships
      </Title>

      <Row justify="center" style={{ marginBottom: 48 }}>
        <Col xs={24} sm={20} md={16} lg={12} style={{ display: 'flex' }}>
          <Card
            style={cardStyle}
            hoverable
            onMouseEnter={e => {
              e.currentTarget.style.transform = cardHoverStyle.transform;
              e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
            }}
          >
            <Title
              level={3}
              style={{ textAlign: 'center', marginBottom: 28, color: 'black', fontWeight: 600 }}
            >
              Hosted by
            </Title>
            <img
              src="/ALKlogo.png"
              alt="ALK Logo"
              style={{
                width: '60%',
                maxWidth: 180,
                marginBottom: 28,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 8,
              }}
            />
            <Paragraph
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: '#444',
                fontWeight: 500,
                textAlign: 'justify',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              }}
            >
              We are a research-driven spinoff from Kozminski University (Akademia Leona Koźmińskiego), focused on building innovative tools for economic policy analysis.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Row justify="center" style={{ marginBottom: 48 }}>
        <Col xs={24} sm={20} md={16} lg={12} style={{ display: 'flex' }}>
          <Card
            style={cardStyle}
            hoverable
            onMouseEnter={e => {
              e.currentTarget.style.transform = cardHoverStyle.transform;
              e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
            }}
          >
            <Title
              level={3}
              style={{ textAlign: 'center', marginBottom: 28, color: 'black', fontWeight: 600 }}
            >
              Our Trusted Partner
            </Title>
            <img
              src="/mediaboardlogo.png"
              alt="Mediaboard Logo"
              style={{
                width: '60%',
                maxWidth: 180,
                marginBottom: 28,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 8,
              }}
            />
            <Paragraph
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: '#444',
                fontWeight: 500,
                textAlign: 'justify',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              }}
            >
              The partnership with Mediaboard, which provides high-frequency access to Polish news content through its media monitoring and analytics platform—ensuring a reliable data foundation for the construction and continuous updating of the EPU index.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Row justify="center" gutter={[48, 32]}>
        <Col xs={24} sm={20} md={12} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            style={cardStyle}
            hoverable
            onMouseEnter={e => {
              e.currentTarget.style.transform = cardHoverStyle.transform;
              e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
            }}
          >
            <Title
              level={3}
              style={{ textAlign: 'center', marginBottom: 28, color: 'black', fontWeight: 600 }}
            >
              Why Partner With Us?
            </Title>
            <ul
              style={{
                paddingLeft: 24,
                lineHeight: 1.8,
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                color: '#333',
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              <li>Contribute to impactful research on economic policy uncertainty.</li>
              <li>Collaborate on innovative data-driven tools and dashboards.</li>
              <li>Enhance your organization’s visibility within academic and public sectors.</li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} sm={20} md={12} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            style={cardStyle}
            hoverable
            onMouseEnter={e => {
              e.currentTarget.style.transform = cardHoverStyle.transform;
              e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
            }}
          >
            <Title
              level={3}
              style={{ textAlign: 'center', marginBottom: 28, color: 'black', fontWeight: 600 }}
            >
              Interested in Partnering?
            </Title>
            <Paragraph
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: '#444',
                fontWeight: 500,
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              }}
            >
              Please reach out via the <strong>Contact Us</strong> page or send an email to{' '}
              <a href="mailto:contact@epu-poland.org" style={{ color: accentColor }}>
                ******@********
              </a>. We’re open to all forms of collaboration.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PartnershipPage;
