import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Typography, Divider, Select, DatePicker, Button, Input, InputNumber } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceArea, LabelList, Label } from 'recharts';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import SocialLinks from './Sociallinks';
import html2canvas from 'html2canvas';
dayjs.extend(isBetween);

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Use HTTPS for production; switch to HTTP if needed for local dev
const BASE_URL = 'http://127.0.0.1:5000/api/epu';

const dotShapes = {
  none: false,  // No dots rendered
  circle: (props) => {
    const { cx, cy, stroke, fill, payload, dataKey } = props;
    const value = payload[dataKey];
    if (value === null || value === undefined) return null;
    return <circle cx={cx} cy={cy} r={2.5} stroke={stroke} fill={fill} />;
  },
  square: (props) => {
    const { cx, cy, stroke, fill, payload, dataKey } = props;
    const value = payload[dataKey];
    if (value === null || value === undefined) return null;
    return <rect x={cx - 3} y={cy - 3} width={6} height={6} stroke={stroke} fill={fill} />;
  },
  triangle: (props) => {
    const { cx, cy, stroke, fill, payload, dataKey } = props;
    const value = payload[dataKey];
    if (value === null || value === undefined) return null;
    const path = `M${cx} ${cy - 4} L${cx - 4} ${cy + 3} L${cx + 4} ${cy + 3} Z`;
    return <path d={path} stroke={stroke} fill={fill} />;
  },
  diamond: (props) => {
    const { cx, cy, stroke, fill, payload, dataKey } = props;
    const value = payload[dataKey];
    if (value === null || value === undefined) return null;
    const path = `M${cx} ${cy - 4} L${cx - 4} ${cy} L${cx} ${cy + 4} L${cx + 4} ${cy} Z`;
    return <path d={path} stroke={stroke} fill={fill} />;
  },
};



{/* Reusable horizontal field layout */}
const fieldStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12,
};


const DataVisualizer = () => {
  const chartRef = useRef(null);

  const [frequency, setFrequency] = useState('daily');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [downloadOption, setDownloadOption] = useState('visual');
  const [isEditPanelVisible, setIsEditPanelVisible] = useState(false);
  const [fontSize, setFontSize] = useState(12);
  const [annotationFontColor, setAnnotationFontColor] = useState('#003366');
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [autoFitMode, setAutoFitMode] = useState('autoFit');
  const [chartWidth, setChartWidth] = useState(1100);
  const [chartHeight, setChartHeight] = useState(300);
  const [selectedSource, setSelectedSource] = useState(['poland']);
  const [data, setData] = useState([]);
  // Default date range: last 1 year from today, for daily data
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(2, 'year'),
    dayjs(),
  ]);

  const linePatterns = {
    solid: '',
    dashed: '5 5',
    dotted: '2 6',
    dashdot: '10 5 2 5',
  };

  const [lineStyles, setLineStyles] = useState({
    'PL EPU Index': { color: '#02273b', pattern: 'solid', dotShape: 'none' },
    'US EPU Index': { color: '#8B0000', pattern: 'solid', dotShape: 'none' },
    'Europe EPU Index': { color: '#006400', pattern: 'solid', dotShape: 'none' },
    'Global EPU Index': { color: '#00008B', pattern: 'solid', dotShape: 'none' },
    'UK EPU Index': { color: '#FF8C00', pattern: 'solid', dotShape: 'none' },
    'Canada EPU Index': { color: '#8A2BE2', pattern: 'solid', dotShape: 'none' },
    'India EPU Index': { color: '#DC143C', pattern: 'solid', dotShape: 'none' },
    'China EPU Index': { color: '#20B2AA', pattern: 'solid', dotShape: 'none' },
  });
  
  const dataSources = {
    poland: {
      monthly: { label: "PL EPU Index", apiParam: "poland", dataKey: "PLEPUINDXM" },
      daily: { label: "PL EPU Index", apiParam: "poland", dataKey: "PLEPUINDXD" },
    },
    us: {
      monthly: { label: "US EPU Index", apiParam: "us", dataKey: "USEPUINDXM" },
      daily: { label: "US EPU Index", apiParam: "us", dataKey: "USEPUINDXD" },
    },
    europe: {
      monthly: { label: "Europe EPU Index", apiParam: "europe", dataKey: "EUEPUINDXM" },
    },
    global: {
      monthly: { label: "Global EPU Index", apiParam: "global", dataKey: "GEPUCURRENT" },
    },
    uk: {
      monthly: { label: "UK EPU Index", apiParam: "uk", dataKey: "UKEPUINDXM" },
    },
    ca: {
      monthly: { label: "Canada EPU Index", apiParam: "ca", dataKey: "CANEPUINDXM" },
    },
    india: {
      monthly: { label: "India EPU Index", apiParam: "india", dataKey: "INDEPUINDXM" },
    },
    china: {
      monthly: { label: "China EPU Index", apiParam: "china", dataKey: "CHIEPUINDXM" },
    },
  };
  

  const handleLineStyleChange = (currency, key, value) => {
    setLineStyles(prev => ({
      ...prev,
      [currency]: { ...prev[currency], [key]: value },
    }));
  };

  // prune unsupported sources when frequency changes
  useEffect(() => {
    setSelectedSource(prev => prev.filter(s => !!dataSources[s]?.[frequency]));
  }, [frequency]);

  useEffect(() => {
    const fetchData = async () => {
      if (!frequency || !selectedSource.length) {
        setData([]);
        return;
      }

      try {
        const startDate = dateRange?.[0]?.format('YYYY-MM-DD') ?? '';
        const endDate = dateRange?.[1]?.format('YYYY-MM-DD') ?? '';

        const allSeries = await Promise.all(
          selectedSource.map(async source => {
            const cfg = dataSources[source]?.[frequency];
            if (!cfg) return [];

            const url = `${BASE_URL}?source=${cfg.apiParam}&frequency=${frequency}&start_date=${startDate}&end_date=${endDate}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch data');
            const jsonData = await res.json();

            return jsonData
              .filter(item => {
                const d = dayjs(item.date);
                return d.isBetween(startDate, endDate, 'day', '[]');
              })
              .map(item => ({
                date: item.date,
                [cfg.dataKey]: item[cfg.dataKey] ?? item.value ?? item.EPU_t,
              }));
          })
        );

        // merge by date
        const mergedByDate = {};
        allSeries.flat().forEach(row => {
          const { date, ...rest } = row;
          if (!mergedByDate[date]) mergedByDate[date] = { date };
          Object.assign(mergedByDate[date], rest);
        });

        const mergedData = Object.values(mergedByDate).sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setData(mergedData);
      } catch (error) {
        console.error('Fetch error:', error);
        setData([]);
      }
    };

    fetchData();
  }, [selectedSource, frequency, dateRange]);


  const handleDownload = () => {
    if (downloadOption === 'visual') {
      if (chartRef.current) {
        html2canvas(chartRef.current).then(canvas => {
          const link = document.createElement('a');
          link.download = 'chart.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
        });
      }
    } else {
      const csvContent = [
        ['Date', 'Exchange Rate'],
        ...data.map(item => [item.date, item['exchange-rate']]),
      ]
        .map(e => e.join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'data.csv';
      link.click();
    }
  };

  const dailyDisabled = selectedSource.some(s => !dataSources[s]?.daily);

  return (
    <>
      <Title level={2} style={{ color: '#02273b', fontFamily: 'Times New Roman' }}>
        <span style={{ fontSize: '25px' }}>
          Economic Policy Uncertainty Index for Poland
        </span>{' '}
        <span style={{ fontSize: '16px' }}>
          (PLEPUINDXD)
        </span>
      </Title>
      <Divider style={{ borderColor: 'black' }}/>
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: 24}}>
      <Row gutter={[24, 24]} wrap>
          {/* Controls on first row */}
          <Col span={24} style={{ backgroundColor: '#e6f0fa', padding: 24, borderRadius: 8 }}>
            <Title level={5} style={{ color: '#2c3e50', marginBottom: 20}}> Data Visualizer Controls 📊 
            </Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <div style={{ marginBottom: 16 }}>
                  <label>Financial Indicators</label>
                  <Select 
                    mode="multiple" // enable multiple selections
                    value={selectedSource} 
                    onChange={setSelectedSource} 
                    style={{ width: '100%' }}
                  >
                    {Object.entries(dataSources).map(([key, src]) => (
                      <Option 
                        key={key} 
                        value={key} 
                        disabled={!dataSources[key][frequency]} // disable if frequency doesn't exist
                      >
                        {src[frequency]?.label || src['monthly']?.label} {/* always show label if exists */}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Col>
              
              <Col xs={24} sm={12} md={6}>
              {/* <div style={{ marginBottom: 16 }}> */}
                <label>Frequency</label>
                <Select value={frequency} onChange={setFrequency} style={{ width: '100%' }}>
                  <Option value="daily" disabled={dailyDisabled}>Daily</Option>
                  <Option value="monthly">Monthly</Option>
                </Select>
              {/* </div> */}
              </Col>

              <Col xs={24} sm={12} md={6}>
              {/* <div style={{ marginBottom: 16 }}> */}
                <label>Date Range</label>
                <RangePicker
                  value={dateRange}
                  onChange={setDateRange}
                  allowClear
                  style={{ width: '100%' }}
                  disabledDate={current => current && current > dayjs().endOf('day')}
                />
              {/* </div> */}
              </Col>

              <Col xs={24} sm={12} md={6} style={{ display: 'flex', alignItems: 'center' }}>
                <div  style={{
                  display: 'flex',
                  flexWrap: 'wrap',       // allow buttons to wrap on small screens
                  gap: 8,                 // spacing between buttons
                  marginTop: 8,
                }}>
                  <Button type="primary" style={{ marginRight: 12 }} onClick={() => setIsEditPanelVisible(!isEditPanelVisible)}>
                    {isEditPanelVisible ? 'Close Edit Panel' : 'Edit Graph'}
                  </Button>
                  <Button onClick={() => setIsModalVisible(true)}>Download</Button>
                </div>
              </Col>
            </Row>
          </Col>

          {/* Chart on second row */}
          <Col span={24} style={{ backgroundColor: '#e6f0fa', padding: 24, borderRadius: 8 }}>
            <div
              ref={chartRef}
              style={{
                width: autoFitMode === 'autoFit' ? '100%' : chartWidth,
                height: autoFitMode === 'autoFit' ? 350 : chartHeight,
                fontSize,
                fontFamily: 'Times New Roman',
                position: 'relative',
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" fill="#ffffff" />
                  <XAxis dataKey="date" tick={{ fill: 'black' }} />
                  <YAxis domain={['auto', 'auto']} tick={{ fill: 'black' }}>
                    <Label value="EPU Index" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#000', fontSize }} />
                  </YAxis>
                  <Tooltip contentStyle={{ fontSize, fontFamily: 'Times New Roman' }} />
                  <Legend verticalAlign="top" align="left" wrapperStyle={{ paddingBottom: 50, fontSize: fontSize+1, fontFamily: 'Times New Roman' }} />

                  {selectedSource.map(source => {
                    const cfg = dataSources[source]?.[frequency];
                    if (!cfg) return null;
                    const style = lineStyles[cfg.label] || { color: '#02273b', pattern: 'solid', dotShape: 'none' };

                    return (
                      <Line
                        key={`${source}-${frequency}`}
                        type="linear"
                        name={cfg.label}
                        dataKey={cfg.dataKey}
                        stroke={style.color}
                        strokeDasharray={linePatterns[style.pattern] || ''}
                        dot={dotShapes[style.dotShape] || false}
                        activeDot={{ r: 6 }}
                        isAnimationActive={false}
                        connectNulls={true} 
                      >
                        {/* {showAnnotation && (
                          <LabelList dataKey={cfg.dataKey} position="top" style={{ fill: annotationFontColor, fontSize }} />
                        )} */}
                      </Line>
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div
              style={{
                marginTop: 3,
                fontSize: 15,
                fontStyle: 'italic',
                color: 'black',
                fontFamily: 'Times New Roman',
                textAlign: 'center',
                marginBottom: '10px',
              }}
              >
                🗂️ Source: Alina Landowska, Robert Kłopotek, He Zhang via PL EPUI
            </div>
          </Col>
        </Row>

        {/* Edit Panel */}              
        {isEditPanelVisible && (
          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            <Col span={24}>
              <div
                style={{
                  maxWidth: 1600,
                  margin: '0 auto',
                  backgroundColor: '#fafafa',
                  border: '1px solid #d9d9d9',
                  borderRadius: 12,
                  padding: 32,
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Title level={4} style={{ marginBottom: 20, color: '#2c3e50' }}>
                  ⚙️ Edit Graph Settings
                </Title>
                <Divider style={{ marginBottom: 24 }} />

                <Row gutter={32}>
                  {/* Layout & Annotation Settings */}
                  <Col xs={24} md={12}>
                    {/* Layout Configuration */}
                    <div style={{ marginBottom: 32 }}>
                      <Title level={5} style={{ fontSize: 17, marginBottom: 16 }}>🧩 Layout & Display</Title>
                      <div
                        style={{
                          marginBottom: 24,
                          padding: 16,
                          backgroundColor: '#ffffff',
                          border: '1px solid #e0e0e0',
                          borderRadius: 10,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                        }}
                      >
                      
                        <div style={fieldStyle}>
                          <label style={{ width: '48%' }}>Auto Fit Mode:</label>
                          <Select value={autoFitMode} onChange={setAutoFitMode} style={{ width: '48%' }}>
                            <Option value="autoFit">Auto Fit</Option>
                            <Option value="manual">Manual</Option>
                          </Select>
                        </div>

                        {autoFitMode === 'manual' && (
                          <>
                            <div style={fieldStyle}>
                              <label style={{ width: '48%' }}>Chart Width (px):</label>
                              <InputNumber
                                min={300}
                                max={1100}
                                value={chartWidth}
                                onChange={setChartWidth}
                                style={{ width: '48%' }}
                              />
                            </div>
                            <div style={fieldStyle}>
                              <label style={{ width: '48%' }}>Chart Height (px):</label>
                              <InputNumber
                                min={150}
                                max={700}
                                value={chartHeight}
                                onChange={setChartHeight}
                                style={{ width: '48%' }}
                              />
                            </div>
                          </>
                        )}


                        <div style={fieldStyle}>
                          <label style={{ width: '48%' }}>Font Size (px):</label>
                          <InputNumber
                            min={8}
                            max={20}
                            value={fontSize}
                            onChange={setFontSize}
                            style={{ width: '48%' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Annotation Settings */}
                    {/* <div>
                      <Title level={5} style={{ fontSize: 17, marginBottom: 16 }}>✏️ Annotations</Title>

                      <div
                        style={{
                          marginBottom: 24,
                          padding: 16,
                          backgroundColor: '#ffffff',
                          border: '1px solid #e0e0e0',
                          borderRadius: 10,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                        }}
                      >
                        <div style={fieldStyle}>
                          <label>Show Annotations</label>
                          <Select
                            value={showAnnotation}
                            onChange={value => setShowAnnotation(value)}
                            style={{ width: '48%'}}
                          >
                            <Option value={true}>True</Option>
                            <Option value={false}>False</Option>
                          </Select>

                        </div>

                        <div style={fieldStyle}>
                          <label style={{ width: '48%' }}>Font Color:</label>
                          <Input
                            type="color"
                            value={annotationFontColor}
                            onChange={e => setAnnotationFontColor(e.target.value)}
                            style={{ width: '48%' }}
                          />
                        </div>
                      </div>
                    </div> */}
                  </Col>

                  {/* Currency Line Styling */}
                  <Col xs={24} md={12}>
                    <Title level={5} style={{ fontSize: 17, marginBottom: 16 }}>🎨 Line Styles</Title>
                    {selectedSource.map(source => {
                      const cfg = dataSources[source]?.[frequency];
                      if (!cfg) return null;

                      const style = lineStyles[cfg.label] || { color: '#000000', pattern: 'solid', dotShape: 'circle' };

                      return (
                        <div
                          key={cfg.label}
                          style={{
                            marginBottom: 24,
                            padding: 16,
                            backgroundColor: '#ffffff',
                            border: '1px solid #e0e0e0',
                            borderRadius: 10,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                          }}
                        >
                          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 12 }}>
                            {cfg.label}
                          </div>

                          <div style={fieldStyle}>
                            <label style={{ width: '48%' }}>Line Color:</label>
                            <input
                              type="color"
                              value={style.color}
                              onChange={e => handleLineStyleChange(cfg.label, 'color', e.target.value)}
                              style={{ width: '48%' }}
                            />
                          </div>

                          <div style={fieldStyle}>
                            <label style={{ width: '48%' }}>Line Pattern:</label>
                            <Select
                              size="small"
                              value={style.pattern}
                              onChange={value => handleLineStyleChange(cfg.label, 'pattern', value)}
                              style={{ width: '48%' }}
                            >
                              <Option value="solid">Solid</Option>
                              <Option value="dashed">Dashed</Option>
                              <Option value="dotted">Dotted</Option>
                              <Option value="dashdot">DashDot</Option>
                            </Select>
                          </div>

                          <div style={fieldStyle}>
                            <label style={{ width: '48%' }}>Dot Shape:</label>
                            <Select
                              size="small"
                              value={style.dotShape}
                              onChange={value => handleLineStyleChange(cfg.label, 'dotShape', value)}
                              style={{ width: '48%' }}
                            >
                              <Option value="none">None</Option>
                              <Option value="circle">Circle</Option>
                              <Option value="square">Square</Option>
                              <Option value="triangle">Triangle</Option>
                              <Option value="diamond">Diamond</Option>
                            </Select>
                          </div>
                        </div>
                      );
                    })}

                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        )}



        <Row gutter={[24, 24]} wrap>
          <Col span={24}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <SocialLinks />
            </div>
          </Col>
        </Row>
      </div>



      {/* Download Modal */}
      {isModalVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1500,
          }}
          onClick={() => setIsModalVisible(false)}
        >
          <div
            style={{ backgroundColor: 'white', padding: 24, borderRadius: 8, minWidth: 320 }}
            onClick={e => e.stopPropagation()}
          >
            <Title level={4}>Download Chart or Data</Title>
            <Select
              value={downloadOption}
              onChange={setDownloadOption}
              style={{ width: '100%', marginBottom: 24 }}
            >
              <Option value="visual">Visual (PNG)</Option>
              <Option value="data">Data (CSV)</Option>
            </Select>
            <Button type="primary" onClick={() => { handleDownload(); setIsModalVisible(false); }} block>
              Download
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DataVisualizer;

