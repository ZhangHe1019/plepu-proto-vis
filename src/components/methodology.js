import React, { useState } from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const steps = [
  {
    label: '1',
    title: 'News Articles Collected',
    content: 'We scan top Polish newspapers for articles with key terms on the economy, policy, and uncertainty.',
    icon: '📰',
  },
  {
    label: '2',
    title: 'Keyword Match',
    content: 'Only articles that include words from all three categories are counted.',
    icon: '🧠',
  },
  {
    label: '3',
    title: 'Standardized per Newspaper',
    content: "Each paper's article count is adjusted to account for how often it typically publishes.",
    icon: '⚖️',
  },
  {
    label: '4',
    title: 'Monthly Average',
    content: 'We combine all newspapers into one monthly score reflecting national policy uncertainty.',
    icon: '📅',
  },
  {
    label: '5',
    title: 'Normalized for Comparison',
    content: 'The index is scaled so 100 = average uncertainty during a base period.',
    icon: '🎯',
  },
];

const TimelineWithLine = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div style={{margin: 'auto', padding: 12 }}>
      <Title level={4}>How We Built the Poland EPU Index</Title>
      <p>We follow a standard international method—customized for Poland—to measure policy-related uncertainty in the media.</p>

      {/* Timeline container */}
      <div style={{ position: 'relative', marginBottom: 30 }}>
        {/* The horizontal line */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            right: 24,
            height: 4,
            backgroundColor: '#ddd',
            zIndex: 0,
          }}
        />

        {/* Steps */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.label}
              style={{ textAlign: 'center', cursor: 'pointer', flex: 1 }}
              onClick={() => setActiveStep(i)}
            >
              {/* Round button */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: activeStep === i ? '#1890ff' : '#eee',
                  color: activeStep === i ? 'white' : '#555',
                  lineHeight: '48px',
                  fontWeight: 'bold',
                  margin: '0 auto 8px',
                  fontSize: 18,
                  userSelect: 'none',
                }}
              >
                {step.label}
              </div>

              {/* Small box below button */}
              <div
                style={{
                  padding: 10,
                  borderRadius: 6,
                  backgroundColor: activeStep === i ? '#e6f7ff' : '#fafafa',
                  color: activeStep === i ? '#1890ff' : '#999',
                  fontSize: 12,
                  minHeight: 80,
                  transition: 'all 0.3s ease',
                  boxShadow: activeStep === i ? '0 0 8px rgba(24,144,255,0.3)' : 'none',
                  pointerEvents: activeStep === i ? 'auto' : 'none',
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
                  {step.icon} {step.title}
                </div>
                <div>{step.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineWithLine;
