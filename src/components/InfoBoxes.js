import React from 'react';

const infoData = [
  {
    label: 'Media Sources',
    content: 'See the newspapers and outlets we analyze',
    link: 'https://example.com/',
    image: '/newspaper.jpg',
  },
  {
    label: 'Keyword List ',
    content: 'Explore the terms used to measure uncertainty',
    link: 'https://example.com/',
    image: '/laptop data dashboard.jpg',
  },
  {
    label: 'Global Comparisons',
    content: 'Access country-level EPU data worldwide',
    link: 'https://example.com/',
    image: '/compass.jpg',
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
          position: relative;
          flex: 1 1 250px;
          max-width: 280px;
          aspect-ratio: 1 / 1;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          transition: transform 0.2s ease, background-color 0.3s ease;
          text-decoration: none;
          color: white;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0; /* Remove padding so image fills whole box */
        }

        .info-box:hover {
          transform: translateY(-6px);
          background-color: #1890ff; /* fallback background color on hover */
        }

        .info-image {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100%;
          height: 100%;
          object-fit: cover; /* cover entire box */
          filter: brightness(0.6); /* darken image so text is readable */
          transition: filter 0.3s ease;
          z-index: 0;
        }

        .info-box:hover .info-image {
          filter: brightness(0.8);
        }

        .info-text {
          position: relative;
          z-index: 1;
          padding: 20px;
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
            // href={item.link}
            className="info-box"
            // target={item.link.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
          >
            {item.image && (
              <img
                src={item.image}
                alt={`${item.label} icon`}
                className="info-image"
              />
            )}
            <div className="info-text">
              <div className="info-title">{item.label}</div>
              <div className="info-description">{item.content}</div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default InfoBoxes;
