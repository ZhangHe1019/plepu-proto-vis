import React from 'react';

const infoData = [
  {
    label: 'Source',
    content: 'View Media Source Table',
    link: '/media-sources',
  },
  {
    label: 'Keywords',
    content: 'View EPU Keywords Table',
    link: '/epu-keywords',
  },
  {
    label: 'Country-specific Data',
    content: 'View Economic Policy Uncertainty Website',
    link: 'https://www.policyuncertainty.com',
  },
];

const InfoBoxes = () => {
  return (
    <>
      <style>{`
        .info-container {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 24px;
          padding: 0 12px;
        }

        .info-box {
          flex: 1 1 250px;
          max-width: 280px;
          aspect-ratio: 1 / 1;
          border-radius: 12px;
          background-color: #002766; /* Dark blue */
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          padding: 20px;
          cursor: pointer;
          transition: transform 0.2s ease, background-color 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          text-decoration: none;
          color: white;
        }

        .info-box:hover {
          transform: translateY(-6px);
          background-color: #1890ff; /* Lighter blue on hover */
        }

        .info-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .info-description {
          font-size: 15px;
          line-height: 1.4;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .info-box {
            flex: 1 1 100%;
            max-width: 100%;
          }
        }
      `}</style>

      <div className="info-container">
        {infoData.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="info-box"
            target={item.link.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
          >
            <div className="info-title">{item.label}</div>
            <div className="info-description">{item.content}</div>
          </a>
        ))}
      </div>
    </>
  );
};

export default InfoBoxes;
