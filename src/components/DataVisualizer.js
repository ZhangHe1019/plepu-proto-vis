import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Typography, Divider, Select, DatePicker, Button, Input, InputNumber } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceArea, LabelList, Label } from 'recharts';
import dayjs from 'dayjs';
import SocialLinks from './Sociallinks';
import html2canvas from 'html2canvas';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const dotShapes = {
  circle: (props) => {
    const { cx, cy, stroke, fill } = props;
    return <circle cx={cx} cy={cy} r={3} stroke={stroke} fill={fill} />;
  },
  square: (props) => {
    const { cx, cy, stroke, fill } = props;
    return <rect x={cx - 3} y={cy - 3} width={6} height={6} stroke={stroke} fill={fill} />;
  },
  triangle: (props) => {
    const { cx, cy, stroke, fill } = props;
    const path = `M${cx} ${cy - 4} L${cx - 4} ${cy + 3} L${cx + 4} ${cy + 3} Z`;
    return <path d={path} stroke={stroke} fill={fill} />;
  },
  diamond: (props) => {
    const { cx, cy, stroke, fill } = props;
    const path = `M${cx} ${cy - 4} L${cx - 4} ${cy} L${cx} ${cy + 4} L${cx + 4} ${cy} Z`;
    return <path d={path} stroke={stroke} fill={fill} />;
  },
};

const DataVisualizer = () => {
  const chartRef = useRef(null);

  const [frequency, setFrequency] = useState('daily');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [downloadOption, setDownloadOption] = useState('visual');
  const [isEditPanelVisible, setIsEditPanelVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#e6f3ff');
  const [fontSize, setFontSize] = useState(12);
  const [annotationFontColor, setAnnotationFontColor] = useState('#003366');
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [autoFitMode, setAutoFitMode] = useState('autoFit');
  const [chartWidth, setChartWidth] = useState(600);
  const [chartHeight, setChartHeight] = useState(300);
  const [selectedDataType, setSelectedDataType] = useState('exchange');
  const [selectedCurrencies, setSelectedCurrencies] = useState(['USD']);
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState(null);

  const currencyOptions = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' },
    { label: 'CHF', value: 'CHF' },
  ];

  const linePatterns = {
    solid: '',
    dashed: '5 5',
    dotted: '2 6',
    dashdot: '10 5 2 5',
  };

  const [currencyStyles, setCurrencyStyles] = useState({
    USD: { color: '#0011ffff', pattern: 'solid', dotShape: 'circle' },
    EUR: { color: '#00bfff', pattern: 'solid', dotShape: 'circle' },
    GBP: { color: '#32cd32', pattern: 'solid', dotShape: 'circle' },
    CHF: { color: '#ff69b4', pattern: 'solid', dotShape: 'circle' },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (selectedDataType !== 'exchange' || selectedCurrencies.length === 0) {
        setData([]);
        return;
      }

      try {
        const startDate = dateRange?.[0]?.format('YYYY-MM-DD') || dayjs().subtract(1, 'year').format('YYYY-MM-DD');
        const endDate = dateRange?.[1]?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD');

        const allData = [];

        for (const currency of selectedCurrencies) {
          const url = `https://api.nbp.pl/api/exchangerates/rates/A/${currency}/${startDate}/${endDate}/?format=json`;
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to fetch ${currency}`);
          const json = await response.json();
          const chartData = json.rates.map(rate => ({
            date: rate.effectiveDate,
            [currency]: rate.mid,
          }));
          allData.push(...chartData);
        }

        const mergedData = {};
        allData.forEach(point => {
          const date = point.date;
          if (!mergedData[date]) mergedData[date] = { date };
          Object.keys(point).forEach(key => {
            if (key !== 'date') mergedData[date][key] = point[key];
          });
        });

        setData(Object.values(mergedData).sort((a, b) => a.date.localeCompare(b.date)));
      } catch (error) {
        console.error('Data fetch error:', error);
        setData([]);
      }
    };

    fetchData();
  }, [selectedCurrencies, dateRange, selectedDataType]);

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
      const csvRows = [];
      const headers = ['Date', ...selectedCurrencies];
      csvRows.push(headers.join(','));
      data.forEach(row => {
        const rowData = [row.date, ...selectedCurrencies.map(currency => row[currency] ?? '')];
        csvRows.push(rowData.join(','));
      });

      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCurrencyStyleChange = (currency, key, value) => {
    setCurrencyStyles(prev => ({
      ...prev,
      [currency]: { ...prev[currency], [key]: value },
    }));
  };

  return (
    <>
      <Title level={2} style={{ color: '#003366', fontFamily: 'Times New Roman' }}>
        Global Economic Policy Uncertainty Index: Current Price Adjusted GDP (GEPUCURRENT)
      </Title>
      <Divider style={{ borderColor: 'black' }}/>
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: 24}}>
        <Row gutter={[24, 24]} wrap>
          {/* Left Controls */}
          <Col xs={24} sm={24} md={8} lg={6} xl={5} style={{ backgroundColor: '#e6f3ff', padding: 24, borderRadius: 8 }}>
            <div style={{ marginBottom: 16 }}>
              <label>Financial Indicators</label>
              <Select value={selectedDataType} onChange={setSelectedDataType} style={{ width: '100%' }}>
                <Option value="exchange">Exchange Rate</Option>
                <Option value="gold" disabled>EPU Poland (Coming Soon)</Option>
              </Select>
            </div>

            {selectedDataType === 'exchange' && (
              <div style={{ marginBottom: 16 }}>
                <label>Select Currencies</label>
                <Select
                  mode="multiple"
                  placeholder="Select currencies"
                  value={selectedCurrencies}
                  onChange={setSelectedCurrencies}
                  style={{ width: '100%' }}
                >
                  {currencyOptions.map(c => (
                    <Option key={c.value} value={c.value}>{c.label}</Option>
                  ))}
                </Select>
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <label>Frequency</label>
              <Select value={frequency} onChange={setFrequency} style={{ width: '100%' }}>
                <Option value="daily">Daily</Option>
              </Select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Date Range</label>
              <RangePicker
                value={dateRange}
                onChange={setDateRange}
                allowClear
                style={{ width: '100%' }}
                disabledDate={current => current && current > dayjs().endOf('day')}
              />
            </div>

            <div style={{ marginTop: 24 }}>
              <Button type="primary" style={{ marginRight: 12 }} onClick={() => setIsEditPanelVisible(!isEditPanelVisible)}>
                {isEditPanelVisible ? 'Close Edit Panel' : 'Edit Graph'}
              </Button>
              <Button onClick={() => setIsModalVisible(true)}>Download</Button>
            </div>
          </Col>

          {/* Chart Display */}
          <Col xs={24} sm={24} md={16} lg={18} xl={19} style={{ backgroundColor: backgroundColor, padding: 24, borderRadius: 8 }}>
            <div
              ref={chartRef}
              style={{
                width: autoFitMode === 'autoFit' ? '100%' : chartWidth,
                height: autoFitMode === 'autoFit' ? 300 : chartHeight,
                fontSize,
                fontFamily: 'Times New Roman',
                position: 'relative',
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" fill="#ffffff" fillOpacity={1}/>
                  <XAxis dataKey="date" tick={{ fill: 'black' }}/>
                  <YAxis domain={['auto', 'auto']} tick={{ fill: 'black' }}>
                    <Label
                      value="Exchange Rate"
                      angle={-90}
                      position="insideLeft"
                      style={{ textAnchor: 'middle', fill: '#000', fontSize }}
                    />
                  </YAxis>
                  <Tooltip
                    contentStyle={{ fontSize, fontFamily: 'Times New Roman' }}
                    cursor={{ stroke: '#000000', strokeWidth: 1 }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="left"
                    wrapperStyle={{
                      paddingBottom: 10,
                      fontSize: fontSize + 2,
                      fontFamily: 'Times New Roman',
                    }}
                  />
                  {selectedCurrencies.map(currency => (
                    <Line
                      key={currency}
                      type="monotone"
                      dataKey={currency}
                      stroke={currencyStyles[currency].color}
                      strokeDasharray={linePatterns[currencyStyles[currency].pattern]}
                      dot={dotShapes[currencyStyles[currency].dotShape]}
                      activeDot={{ r: 8 }}
                      isAnimationActive={false}
                    >
                      {showAnnotation && (
                        <LabelList
                          dataKey={currency}
                          position="top"
                          style={{ fill: annotationFontColor, fontSize }}
                        />
                      )}
                    </Line>
                  ))}
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
                🗂️ Source: Landowska, Alina; Kłopotek, Robert; Zhang, He via EPUI PL
            </div>
          </Col>
        </Row>
        <Row gutter={[24, 24]} wrap>
          <Col span={24}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <SocialLinks />
            </div>
          </Col>
        </Row>
      </div>

      {/* Edit Graph Settings Panel */}
      {isEditPanelVisible && (
        <div
          style={{
            position: 'fixed',
            top: 80,
            right: 20,
            width: 320,
            maxHeight: '80vh',
            overflowY: 'auto',
            backgroundColor: '#fff',
            border: '1px solid #d9d9d9',
            borderRadius: 8,
            padding: 16,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
          }}
        >
          <Title level={4} style={{ marginBottom: 16 }}>
            Edit Graph Settings
          </Title>

          {/* Background Color */}
          <div style={{ marginBottom: 16 }}>
            <label>Background Color:</label>
            <Input
              type="color"
              value={backgroundColor}
              onChange={e => setBackgroundColor(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* Font Size */}
          <div style={{ marginBottom: 16 }}>
            <label>Font Size (px):</label>
            <InputNumber
              min={8}
              max={24}
              value={fontSize}
              onChange={setFontSize}
              style={{ width: '100%' }}
            />
          </div>

          {/* Annotation Font Color */}
          <div style={{ marginBottom: 16 }}>
            <label>Annotation Font Color:</label>
            <Input
              type="color"
              value={annotationFontColor}
              onChange={e => setAnnotationFontColor(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* Show Annotations */}
          <div style={{ marginBottom: 16 }}>
            <label>
              <input
                type="checkbox"
                checked={showAnnotation}
                onChange={e => setShowAnnotation(e.target.checked)}
                style={{ marginRight: 8 }}
              />
              Show Annotations
            </label>
          </div>

          {/* Auto Fit Mode */}
          <div style={{ marginBottom: 16 }}>
            <label>Auto Fit Mode:</label>
            <Select value={autoFitMode} onChange={setAutoFitMode} style={{ width: '100%' }}>
              <Option value="autoFit">Auto Fit</Option>
              <Option value="manual">Manual</Option>
            </Select>
          </div>

          {/* Chart Width & Height (Manual mode only) */}
          {autoFitMode === 'manual' && (
            <>
              <div style={{ marginBottom: 16 }}>
                <label>Chart Width (px):</label>
                <InputNumber
                  min={300}
                  max={1200}
                  value={chartWidth}
                  onChange={setChartWidth}
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Chart Height (px):</label>
                <InputNumber
                  min={150}
                  max={800}
                  value={chartHeight}
                  onChange={setChartHeight}
                  style={{ width: '100%' }}
                />
              </div>
            </>
          )}

          {/* Currency Line Styles */}
          <div>
            <Title level={5}>Currency Line Styles</Title>
            {selectedCurrencies.map(currency => (
              <div key={currency} style={{ marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
                <div><b>{currency}</b></div>
                <div style={{ marginTop: 4 }}>
                  <label>Color:</label>
                  <input
                    type="color"
                    value={currencyStyles[currency]?.color || '#000000'}
                    onChange={e => handleCurrencyStyleChange(currency, 'color', e.target.value)}
                    style={{ marginLeft: 8 }}
                  />
                </div>
                <div style={{ marginTop: 4 }}>
                  <label>Line Pattern:</label>
                  <Select
                    size="small"
                    value={currencyStyles[currency]?.pattern || 'solid'}
                    onChange={value => handleCurrencyStyleChange(currency, 'pattern', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="solid">Solid</Option>
                    <Option value="dashed">Dashed</Option>
                    <Option value="dotted">Dotted</Option>
                    <Option value="dashdot">DashDot</Option>
                  </Select>
                </div>
                <div style={{ marginTop: 4 }}>
                  <label>Dot Shape:</label>
                  <Select
                    size="small"
                    value={currencyStyles[currency]?.dotShape || 'circle'}
                    onChange={value => handleCurrencyStyleChange(currency, 'dotShape', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="circle">Circle</Option>
                    <Option value="square">Square</Option>
                    <Option value="triangle">Triangle</Option>
                    <Option value="diamond">Diamond</Option>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
