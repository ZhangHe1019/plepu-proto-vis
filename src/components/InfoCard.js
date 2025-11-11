import { Typography, Image, Divider } from 'antd';
import PolandEPUIndexTimeline from './Methodology';
import InfoBoxes from './InfoBoxes';

const { Title, Paragraph, Text } = Typography;

const EPUInfoCreative = () => {
  return (
    <>
      {/* Hero Image Section */}
      {/* <section
        style={{
          position: 'relative',
          height: '40vh',
          minHeight: 250,
          width: '100%',
          overflow: 'hidden',
          borderRadius: '0 0 40px 40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          marginBottom: 48,
        }}
      >
        <Image
          src="/epuhero.jpg"
          alt="Economic Policy Uncertainty"
          preview={false}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            filter: 'brightness(0.7)',
            objectPosition: 'bottom',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '5%',
            color: 'white',
            maxWidth: '90%',
            fontWeight: 700,
            fontSize: 'clamp(20px, 4vw, 36px)',
            lineHeight: 1.2,
            textShadow: '0 3px 6px rgba(0,0,0,0.8)',
          }}
        >
          Polish Economic Policy Uncertainty Indicator
        </div>
      </section> */}

      {/* Main Content + Sidebar */}
      <div className="content-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <InfoBoxes />
        </aside>

        {/* Main Text Content */}
        <main className="main-content">
          <article style={{ maxWidth: 720 }}>
            {/* --- Section 1 --- */}
            <section style={{ marginBottom: 40 }}>
              <Title level={3} style={{ borderLeft: '6px solid #1890ff', paddingLeft: 16 }}>
                What is the Polish EPU Indicator?
              </Title>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.7, marginTop: 24 }}>
                Polish EPU Index (PL EPU Index) is a dynamic, high-frequency indicator that quantifies
                uncertainty related to economic policy decisions in Poland. It serves as a timely,
                transparent, and empirically validated tool for understanding how uncertainty evolves
                and impacts the Polish economy.
              </Paragraph>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.7 }}>
                Following the globally recognized methodology developed by{' '}
                <a
                  href="https://www.policyuncertainty.com/media/BakerBloomDavis.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'black', textDecoration: 'underline' }}
                >
                  Baker, Bloom, and Davis (2016)
                </a>
                , PL EPU Index (Landowska, Kłopotek, Zhang 2025) introduces key improvements over earlier
                national efforts:
              </Paragraph>
              <ul style={{ fontSize: 16, lineHeight: 1.7, marginLeft: 24, marginTop: 16 }}>
                <li>
                  <Text strong style={{ fontSize: 'inherit' }}>Expanded Text-Based Data:</Text> Built on a wide-ranging analysis of eleven Polish newspapers, capturing a broad spectrum of editorial viewpoints, regions, and topics. This rich textual dataset improves upon earlier indices based on only a few select sources, enabling greater precision and representativeness.
                </li>
                <li>
                  <Text strong style={{ fontSize: 'inherit' }}>Comprehensive Keyword Design:</Text> We use a carefully curated list of Polish-language keywords that reflect key dimensions of policy and economic uncertainty, adapted to the domestic context.
                </li>
                <li>
                  <Text strong style={{ fontSize: 'inherit' }}>High-frequency Updates:</Text> The index is updated on a daily, monthly, and quarterly basis, allowing for both short-term monitoring and long-run trend analysis. This multi-resolution approach supports immediate decision-making as well as strategic planning.
                </li>
                <li>
                  <Text strong style={{ fontSize: 'inherit' }}>Empirical Validation:</Text> EPUI Poland is strongly correlated with key financial variables such as the exchange rate (USD/PLN, EUR/PLN), gold price, and WIG20 index—demonstrating its practical relevance and alignment with international benchmarks.
                </li>
                <li>
                  <Text strong style={{ fontSize: 'inherit' }}>Open and Transparent Methodology:</Text> All data, methods, and visualizations are publicly accessible and designed to support use in academic research, market analysis, and economic policy evaluation.
                </li>
              </ul>
            </section>

            {/* --- Section 2 --- */}
            <section style={{ marginBottom: 40 }}>
              <Title level={3} style={{ borderLeft: '6px solid #52c41a', paddingLeft: 16 }}>
                How It Is Used
              </Title>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                 The PL EPU Index is continuously updated and available in daily, monthly, quarterly, and annual formats, enabling precise tracking
                  of uncertainty across both short- and long-term horizons. Businesses, investors, and market participants use it to:
              </Paragraph>
              <ul style={{ fontSize: 16, lineHeight: 1.7, marginLeft: 24, marginTop: 16 }}>
                  <li>Anticipate shifts in market conditions and adjust strategies in real time.</li>
                  <li>Manage risk and optimize investment timing during periods of policy change.</li>
                  <li>Support strategic planning across economic cycles and geopolitical events.</li>
              </ul>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                  Researchers, analysts, and policymakers apply it to:
              </Paragraph>
              <ul style={{ fontSize: 16, lineHeight: 1.7, marginLeft: 24, marginTop: 16 }}>
                  <li>Compare uncertainty levels across time and events.</li>
                  <li>Study the economic impact of policy changes.</li>
                  <li>Enhance macroeconomic models and forecasts.</li>
              </ul>
            </section>

            <Divider />

            {/* --- Section 3 --- */}
            <section style={{ marginBottom: 40 }}>
              <Title level={3} style={{ borderLeft: '6px solid #fa8c16', paddingLeft: 16 }}>
                Why it Matters
              </Title>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                Economic policy uncertainty is not just an abstract measure—it directly shapes real economic outcomes. Elevated uncertainty can cause businesses to postpone investments, slow recruitment, 
                and defer expansion plans. Households may cut spending, and markets may experience heightened volatility. By quantifying this uncertainty in a transparent and timely way, 
                the PL EPU Index provides an early-warning signal for shifts in economic sentiment, helping decision-makers respond proactively and effectively.
              </Paragraph>
            </section>
          </article>
        </main>
      </div>

      {/* Methodology Section */}
      <section
        id="epu-methodology"
        style={{
          backgroundColor: '#fefefe',
          padding: '56px 24px',
          boxShadow: 'inset 0 1px 0 #e8e8e8',
          marginTop: 48,
        }}
      >
        <div className="timeline-container" style={{ maxWidth: 1200, margin: '0 auto', }}>
          <PolandEPUIndexTimeline />
        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        .content-wrapper {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          gap: 48px;
          padding: 0 24px 72px;
          flex-wrap: wrap;
        }

        .sidebar {
          flex: 0 0 300px;
          position: sticky;
          top: 100px;
          align-self: flex-start;
          background-color: #f0f4f8;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          height: fit-content;
        }

        .main-content {
          flex: 1;
          min-width: 280px;
        }

        @media (max-width: 992px) {
          .content-wrapper {
            flex-direction: column;
            gap: 24px;
          }
          .sidebar {
            position: relative;
            top: auto;
            order: -1;
            width: 100%;
          }
          .timeline-container {
            min-width: 320px;
          }
        }

        @media (max-width: 576px) {
          .sidebar {
            padding: 16px;
          }
        }

        a:hover {
          color: #f0535a !important;
          text-decoration: none;
        }
        .hover-red-button:hover button {
          color: #f0535a !important;
          border-color: red !important;
        }
      `}</style>
    </>
  );
};

export default EPUInfoCreative;
