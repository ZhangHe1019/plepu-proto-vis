import React, { useState } from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const steps = [
  {
    label: '1',
    title: 'News Articles Collected',
    content:
      'We scan top Polish newspapers for articles with key terms on the economy, policy, and uncertainty.',
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
    content:
      "Each paper's article count is adjusted to account for how often it typically publishes.",
    icon: '⚖️',
  },
  {
    label: '4',
    title: 'Monthly Average',
    content:
      'We combine all newspapers into one monthly score reflecting national policy uncertainty.',
    icon: '📅',
  },
  {
    label: '5',
    title: 'Normalized for Comparison',
    content:
      'The index is scaled so 100 = average uncertainty during a base period.',
    icon: '🎯',
  },
];

const TimelineWithBoxes = () => {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <>
      <style>{`
        .container {
          max-width: 900px;
          margin: auto;
          padding: 12px;
        }
        .steps-wrapper {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .step {
          flex: 1 1 160px;
          border-radius: 8px;
          background-color: #fafafa;
          box-shadow: 0 0 8px rgba(0,0,0,0.05);
          padding: 12px;
          cursor: pointer;
          transition: box-shadow 0.3s ease, background-color 0.3s ease;
          user-select: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 160px;
        }
        .step:hover {
          box-shadow: 0 0 12px rgba(24,144,255,0.3);
          background-color: #e6f7ff;
        }
        .step.active {
          box-shadow: 0 0 14px rgba(24,144,255,0.8);
          background-color: #bae7ff;
        }
        .step-button {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #eee;
          color: #555;
          font-weight: bold;
          font-size: 18px;
          line-height: 48px;
          text-align: center;
          margin-bottom: 12px;
          user-select: none;
          transition: background-color 0.3s, color 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .step.active .step-button {
          background-color: #1890ff;
          color: white;
          box-shadow: 0 0 8px rgba(24,144,255,0.6);
        }
        .content-box {
          text-align: center;
          color: #1890ff;
          font-size: 14px;
          line-height: 1.4;
        }
        .content-title {
          font-weight: bold;
          margin-bottom: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          font-size: 16px;
        }

        /* Responsive */
        @media (max-width: 700px) {
          .steps-wrapper {
            flex-direction: column;
            gap: 20px;
          }
          .step {
            flex: 1 1 auto;
            max-width: 100%;
          }
        }
      `}</style>

      <div className="container">
        <Title level={4}>How We Built the Poland EPU Index</Title>
        <p>
          We follow a standard international method—customized for Poland—to
          measure policy-related uncertainty in the media.
        </p>

        <div className="steps-wrapper">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className={`step ${activeStep === i ? 'active' : ''}`}
              onClick={() => setActiveStep(i === activeStep ? null : i)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setActiveStep(i === activeStep ? null : i);
                }
              }}
              aria-pressed={activeStep === i}
              aria-label={`Step ${step.label}: ${step.title}`}
            >
              <div className="step-button">{step.label}</div>
              <div className="content-box">
                <div className="content-title">
                  <span>{step.icon}</span>
                  <span>{step.title}</span>
                </div>
                <div>{step.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TimelineWithBoxes;
