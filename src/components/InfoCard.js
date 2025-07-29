import { Row, Col, Typography, Image, Divider } from 'antd';
import PolandEPUIndexTimeline from './Methodology';
import InfoBoxes from './InfoBoxes'; // adjust path if needed

const { Title, Paragraph, Text } = Typography;

const EPUInfoWithImages = () => {
  return (
    <>
      {/* Section with Images and Description */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '48px 24px',
          backgroundColor: '#f4f6f9',
          fontFamily: `'Inter', 'Segoe UI', sans-serif`,
        }}
      >
        <Row gutter={[32, 32]} align="middle">
          {/* Images Column */}
          <Col xs={24} md={10}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 16,
              }}
            >
              {[
                { src: '/epu.jpg', alt: 'Global EPU' },
                { src: 'newspaper.jpg', alt: 'EPU Growth' },
                { src: 'polishzloty.jpg', alt: 'Polish Zloty' },
                { src: 'uncertainty.jpg', alt: 'Economic Uncertainty' },
              ].map(({ src, alt }) => (
                <Image
                  key={alt}
                  src={src}
                  alt={alt}
                  preview={false}
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    objectFit: 'cover',
                    borderRadius: 12,
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.04)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.08)';
                  }}
                />
              ))}
            </div>
          </Col>

          {/* Text Column */}
          <Col xs={24} md={14}>
            <div
              style={{
                background: '#ffffff',
                padding: '32px 24px',
                borderRadius: 12,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              }}
            >
              <Typography
                style={{
                  lineHeight: 1.7,
                  fontSize: 16,
                  color: '#2a2a2a',
                }}
              >
                <Title level={2} style={{ fontWeight: 600, fontSize: 28 }}>
                  What You Should Know About the Polish Economic Policy Uncertainty Indicator
                </Title>

                <Paragraph>
                  The Polish Economic Policy Uncertainty (EPU) indicator measures the level of uncertainty
                  related to economic policy in Poland, as reflected in national news media. It helps
                  researchers and policymakers understand how uncertainty around government actions—such as
                  fiscal policy, trade regulations, and monetary measures—impacts economic decisions and
                  overall economic performance in Poland.
                </Paragraph>

                <Paragraph>
                  This indicator is updated regularly and available over multiple time periods, allowing
                  comparisons across different economic cycles. It is commonly used alongside other
                  macroeconomic indicators such as GDP growth and inflation to analyze investment trends,
                  business cycles, and economic risks specific to Poland.
                </Paragraph>

                <Divider />

                <Title level={4} style={{ fontWeight: 600, marginTop: 32 }}>
                  Why it matters
                </Title>
                <Paragraph>
                  High economic policy uncertainty can delay investment, reduce hiring, and lead to lower
                  economic growth. Tracking EPU helps analysts interpret shifts in market confidence and the
                  broader economic environment.
                </Paragraph>

              </Typography>
            </div>
          </Col>
        </Row>
      </div>

      {/* Full-Width Responsive Methodology Section */}
      <section
        id="epu-methodology"
        style={{
          width: '100%',
          padding: '48px 16px',
          background: '#ffffff',
          fontFamily: `'Inter', 'Segoe UI', sans-serif`,
        }}
      >
      
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <PolandEPUIndexTimeline />
        </div>
      </section>
    </>
  );
};

export default EPUInfoWithImages;
