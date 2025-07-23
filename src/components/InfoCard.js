import { Row, Col, Typography, Image, Divider } from 'antd';
import PolandEPUIndexTimeline from './methodology';
const { Title, Paragraph, Text } = Typography;


const EPUInfoWithImages = () => {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* Left Column: Images */}
        <Col xs={24} md={10}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Image
              src="/epu.jpg"
              alt="Global EPU"
              style={{ width: '100%', height: 'auto', aspectRatio: 1, objectFit: 'cover', borderRadius: 8 }}
            />
            <Image
              src="newspaper.jpg"
              alt="EPU growth"
              style={{ width: '100%', height: 'auto', aspectRatio: 1, objectFit: 'cover', borderRadius: 8 }}
            />
            <Image
              src="polishzloty.jpg"
              alt="US EPU"
              style={{ width: '100%', height: 'auto', aspectRatio: 1, objectFit: 'cover', borderRadius: 8 }}
            />
            <Image
              src="uncertainty.jpg"
              alt="China EPU"
              style={{ width: '100%', height: 'auto', aspectRatio: 1, objectFit: 'cover', borderRadius: 8 }}
            />
          </div>
        </Col>

        {/* Right Column: Text Description */}
        <Col xs={24} md={14}>
          <Typography>
            <Title level={2}>
              What You Should Know About the Polish Economic Policy Uncertainty Indicator
            </Title>

            <Paragraph>
              The Polish Economic Policy Uncertainty (EPU) indicator measures the level of uncertainty related to economic policy 
              in Poland, as reflected in national news media. It helps researchers and policymakers understand how uncertainty 
              around government actions—such as fiscal policy, trade regulations, and monetary measures—impacts economic decisions and overall 
              economic performance in Poland.
            </Paragraph>

            <Paragraph>
              This indicator is updated regularly and available over multiple time periods, allowing comparisons across different 
              economic cycles. It is commonly used alongside other macroeconomic indicators such as GDP growth and inflation 
              to analyze investment trends, business cycles, and economic risks specific to Poland.
            </Paragraph>

            <Divider />

            <Title level={4}>Why it matters</Title>
            <Paragraph>
              High economic policy uncertainty can delay investment, reduce hiring, and lead to lower economic growth.
              Tracking EPU helps analysts interpret shifts in market confidence and the broader economic environment.
            </Paragraph>
            <Divider />

          </Typography>
        </Col>
            <section id="epu-methodology">
              <PolandEPUIndexTimeline />
              <Text strong>Source:</Text> <a href="/mediasource.html" target="_blank" rel="noopener noreferrer">View Media Source
              Table</a> <br />
              <Text strong>Keywords:</Text> <a href="/keywords.html" target="_blank" rel="noopener noreferrer">View EPU Keywords
              Table</a> <br />
              <Text strong>Country-specific Data:</Text>{' '}
              <a href="https://www.policyuncertainty.com" target="_blank" rel="noopener noreferrer">View Economic Policy Uncertainty Website
              </a><br />
            </section>
      </Row>
    </div>
  );
};

export default EPUInfoWithImages;
