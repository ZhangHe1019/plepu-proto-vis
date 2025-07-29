import React from 'react';
import { Typography, Divider, Button } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

const NotesSection = () => {
  const tagButtonStyle = {
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    padding: '0 8px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

  return (
    <div
      style={{
        maxWidth: '1600px',
        margin: '2rem auto',
        padding: '0 1rem',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Title level={5} style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
        Notes
      </Title>

      <Divider style={{ borderTop: '2px solid #bbb', margin: '1rem 0' }} />

      {/* Horizontal Sources */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '1rem',
        }}
      >
        <div>
          <Text strong>Source:</Text>{' '}
          <Link href="https://example.com/baker" target="_blank" rel="noopener noreferrer" style={{color: 'black', textDecoration: 'underline'}}>
            Alina Landowska
          </Link>
        </div>
        <div>
          <Text strong>Source:</Text>{' '}
          <Link href="https://example.com/bloom" target="_blank" rel="noopener noreferrer" style={{color: 'black', textDecoration: 'underline'}}>
            Robert Kłopotek
          </Link>
        </div>
        <div>
          <Text strong>Source:</Text>{' '}
          <Link href="https://example.com/davis" target="_blank" rel="noopener noreferrer" style={{color: 'black', textDecoration: 'underline'}}>
            He Zhang
          </Link>
        </div>
      </div>

      <Paragraph>
        <Text strong>Release:</Text>{' '}
        <Link href="https://example.com/epu" target="_blank" rel="noopener noreferrer" style={{color: 'black', textDecoration: 'underline'}}>
          Economic Policy Uncertainty
        </Link>
      </Paragraph>
      <Paragraph>
        <Text strong>Units:</Text> Index, Not Seasonally Adjusted
      </Paragraph>
      <Paragraph>
        <Text strong>Frequency:</Text> Monthly
      </Paragraph>

      <div style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
        <Paragraph>
          EPUI PL is a daily national-level index of economic policy uncertainty for Poland. The Polish index is
          constructed by analyzing the frequency of specific keywords related to economic policy uncertainty appearing
          in major Polish media outlets. The <a href="https://www.policyuncertainty.com/" 
          target="_blank" rel="noopener noreferrer" style={{color: 'black', textDecoration: 'underline'}}>Baker, Bloom, and Davis (2012)</a> methodology has been adapted to reflect the
          characteristics of the Polish media landscape, language, and national economic and political context.
        </Paragraph>
        <Paragraph>
          EPUI PL is now a part of the original <a href="https://fred.stlouisfed.org/series/GEPUCURRENT" 
          target="_blank" rel="noopener noreferrer" style={{color: 'black', textDecoration: 'underline'}}>Global Economic Policy Uncertainty Index (GEPU)</a> — introduced by <a 
          href="https://www.policyuncertainty.com/media/EPU_BBD_Mar2016.pdf" target="_blank" rel="noopener noreferrer" style={{color: 'black', textDecoration: 'underline'}}>Baker, Bloom, and Davis (2016)</a>. It represents a GDP-weighted average of national EPU indices for 20 countries,
          including the United States, Germany, China, Japan, and the United Kingdom.
        </Paragraph>
      </div>

      <Divider style={{ borderTop: '2px solid #bbb', margin: '1rem 0' }} />

      <Title level={5} style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
        Other Format
      </Title>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <a href="https://example.com/economic-policy-uncertainty" target="_blank" rel="noopener noreferrer" className="hover-red-button">
          <Button size="small" style={tagButtonStyle}>
            Daily, Not Seasonally Adjusted
          </Button>
        </a>
      </div>
    

      <Title level={5} style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
        Related Categories
      </Title>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <a href="https://example.com/economic-policy-uncertainty" target="_blank" rel="noopener noreferrer" className="hover-red-button">
          <Button size="small" style={tagButtonStyle}>
            Economic Policy Uncertainty
          </Button>
        </a>
        <a href="https://example.com/academic-data" target="_blank" rel="noopener noreferrer" className="hover-red-button">
          <Button size="small" style={tagButtonStyle}>
            Academic Data
          </Button>
        </a>
      </div>

      <Title level={5} style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
        Releases
      </Title>
      <Paragraph>
        <a href="https://example.com/more-series" target="_blank" rel="noopener noreferrer" className="hover-red-button">
          <Button size="small" style={tagButtonStyle}>
            More Series from Economic Policy Uncertainty
          </Button>
        </a>
      </Paragraph>

      <Title level={5} style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
        Tags
      </Title>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Scott Baker, Nicholas Bloom and Steven J. Davis', url: 'https://example.com/baker-bloom-davis' },
          { label: 'Baker, Scott R.', url: 'https://example.com/baker' },
          { label: 'Davis, Stephen J.', url: 'https://example.com/davis' },
          { label: 'Economic Policy Uncertainty', url: 'https://example.com/epu' },
          { label: 'Bloom, Nick', url: 'https://example.com/bloom' },
          { label: 'Uncertainty', url: 'https://example.com/uncertainty' },
          { label: 'Academic Data', url: 'https://example.com/academic-data' },
          { label: 'Indexes', url: 'https://example.com/indexes' },
          { label: 'Monthly', url: 'https://example.com/monthly' },
          { label: 'Nation', url: 'https://example.com/nation' },
          { label: 'Public Domain: Citation Requested', url: 'https://example.com/public-domain' },
          { label: 'Not Seasonally Adjusted', url: 'https://example.com/not-seasonally-adjusted' },
          { label: 'United States of America', url: 'https://example.com/usa' },
        ].map(({ label, url }) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="hover-red-button">
            <Button size="small" style={tagButtonStyle}>
              {label}
            </Button>
          </a>
        ))}
      </div>
      <style>{`
        a:hover {
          color: #f0535a !important;
          text-decoration: none;
        }
        .hover-red-button:hover button {
          color: #f0535a !important;
          border-color: red !important;
      `}
      </style>
    </div>
  );
};

export default NotesSection;
