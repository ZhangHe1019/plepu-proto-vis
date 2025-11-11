import React, { useState } from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const steps = [
  {
    label: '1',
    title: 'Collect News Coverage',
    content:
      'We review leading Polish newspapers—sourced via Mediaboard—selecting articles that discuss the economy, public policy, and uncertainty.',
    icon: '📰',
  },
  {
    label: '2',
    title: 'Identify Relevant Articles',
    content: 'Only pieces containing terms from all three categories—economy, policy, and uncertainty—are included, ensuring relevance. The keyword lists are carefully adapted to the Polish language and domestic policy context, ensuring precision and relevance.',
    icon: '🧠',
  },
  {
    label: '3',
    title: 'Adjust for Newspaper Size',
    content:
      "Each newspaper’s contribution is weighted to account for its typical publication volume, avoiding bias from larger outlets.",
    icon: '⚖️',
  },
  {
    label: '4',
    title: 'Calculate Time-Series Scores',
    content:
      'We combine results into daily, monthly, quarterly, and annual averages, capturing both short-term shifts and long-run trends.',
    icon: '📅',
  },
  {
    label: '5',
    title: 'Normalize for Easy Comparison',
    content:
      'The index is scaled so that a value of 100 represents the average uncertainty in a defined baseline period, making historical and cross-country comparisons straightforward.',
    icon: '🎯',
  },
];

const TimelineWithBoxes = () => {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <>
      <style>{`
        .container {
          max-width: 1000px;
          margin: 2rem auto;
          padding: 1rem 1.5rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #222;
          user-select: none;
        }
        .steps-wrapper {
          position: relative;
          margin-left: 30px;
          border-left: 3px solid #1890ff;
          padding-left: 30px;
        }
        .step {
          position: relative;
          padding: 20px 20px 20px 40px;
          margin-bottom: 2rem;
          border-radius: 12px;
          background: linear-gradient(135deg, #f0f5ff, #ffffff);
          box-shadow: 0 3px 10px rgba(0,0,0,0.07);
          cursor: pointer;
          transition: 
            box-shadow 0.4s ease, 
            background-color 0.4s ease,
            transform 0.3s ease;
          user-select: text;
        }
        .step:hover {
          background: linear-gradient(135deg, #cce4ff, #e6f7ff);
          box-shadow: 0 6px 18px rgba(24, 144, 255, 0.4);
          transform: translateX(6px);
        }
        .step.active {
          background: linear-gradient(135deg, #1890ff, #40a9ff);
          color: white;
          box-shadow: 0 8px 30px rgba(24, 144, 255, 0.8);
          transform: translateX(8px);
          z-index: 10;
        }
        .step-button {
          position: absolute;
          left: -55px;
          top: 20px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #d6e4ff;
          color: #096dd9;
          font-weight: 700;
          font-size: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          user-select: none;
          transition: background-color 0.4s, color 0.4s, box-shadow 0.4s;
          border: 3px solid #1890ff;
        }
        .step.active .step-button {
          background-color: #0050b3;
          color: #fff;
          box-shadow: 0 0 12px rgba(24,144,255,0.9);
          border-color: #0050b3;
        }
        .content-title {
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.1));
        }
        .content-title span.icon {
          font-size: 24px;
          display: inline-block;
          animation: pulse 2.5s infinite ease-in-out;
          transform-origin: center center;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        /* Responsive */
        @media (max-width: 700px) {
          .container {
            padding: 1rem;
          }
          .steps-wrapper {
            margin-left: 20px;
            padding-left: 20px;
            border-left-width: 2px;
          }
          .step-button {
            left: -45px;
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
          .step {
            padding-left: 35px;
            margin-bottom: 1.5rem;
          }
          .content-title {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="container" role="region" aria-label="Poland EPU Index construction steps">
        <Title level={3} style={{ textAlign: 'center', marginBottom: '0.25em', color: '#096dd9' }}>
          How We Built the Poland EPU Index
        </Title>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#444', fontSize: '16px' }}>
          We follow a standard international method—customized for Poland—to measure policy-related uncertainty in the media.
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
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveStep(i === activeStep ? null : i);
                }
              }}
              aria-pressed={activeStep === i}
              aria-label={`Step ${step.label}: ${step.title}`}
            >
              <div className="step-button" aria-hidden="true">{step.label}</div>
              <div>
                <div className="content-title">
                  <span className="icon" aria-hidden="true">{step.icon}</span>
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
