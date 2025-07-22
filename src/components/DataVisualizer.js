import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Typography, Select, DatePicker, Button, Modal, InputNumber } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import dayjs from 'dayjs';
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
  const [backgroundColor, setBackgroundColor] = useState('#f0f2f5');
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

  // State for line color, line pattern, and dot shape for each currency
  const [currencyStyles, setCurrencyStyles] = useState({
    USD: { color: '#ff4500', pattern: 'solid', dotShape: 'circle' },
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

        // Merge data points by date
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
        Data Dashboard
      </Title>

      <Row gutter={24} align="stretch" wrap={false}>
        <Col flex="360px" style={{ backgroundColor: '#f0f2f5', padding: 24, borderRadius: 8 }}>
          <div style={{ marginBottom: 16 }}>
            <label>Financial Indicators</label>
            <Select value={selectedDataType} onChange={setSelectedDataType} style={{ width: '100%' }}>
              <Option value="exchange">Exchange Rate</Option>
              <Option value="gold" disabled>Gold Price (Coming Soon)</Option>
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

        <Col flex="auto" style={{ backgroundColor, padding: 24, borderRadius: 8 }}>
          <div
            ref={chartRef}
            style={{
              width: autoFitMode === 'autoFit' ? '100%' : chartWidth,
              height: autoFitMode === 'autoFit' ? 300 : chartHeight,
              backgroundColor,
              padding: 16,
              borderRadius: 8,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" tick={{ fontSize }} />
                <YAxis tick={{ fontSize }} domain={['dataMin - 0.1', 'dataMax + 0.1']} />
                <Tooltip />
                <Legend />
                {selectedCurrencies.map(currency => (
                  <Line
                    key={currency}
                    type="linear"
                    dataKey={currency}
                    stroke={currencyStyles[currency]?.color}
                    strokeDasharray={linePatterns[currencyStyles[currency]?.pattern]}
                    strokeWidth={3}
                    dot={dotShapes[currencyStyles[currency]?.dotShape]}
                  >
                    {showAnnotation && (
                      <LabelList dataKey={currency} position="top" style={{ fill: annotationFontColor, fontSize }} />
                    )}
                  </Line>
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Col>

        {isEditPanelVisible && (
          <Col flex="360px" style={{ backgroundColor: '#f0f2f5', padding: 24, borderRadius: 8, overflowY: 'auto', maxHeight: '90vh' }}>
            <Title level={4}>Edit Graph Settings</Title>

            <div style={{ border: '1px solid #d9d9d9', padding: 12, marginBottom: 16, borderRadius: 4 }}>
                <Title level={5} style={{ marginBottom: 8 }}>Figure & Axis Appearance</Title>

              <div style={{ marginBottom: 16 }}>
                <label>Figure Size Mode</label>
                <Select value={autoFitMode} onChange={setAutoFitMode} style={{ width: '100%' }}>
                  <Option value="autoFit">Auto Fit</Option>
                  <Option value="fixed">Fixed Size</Option>
                </Select>
              </div>

              {autoFitMode === 'fixed' && (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <label>Chart Width (px)</label>
                    <InputNumber min={200} max={2000} value={chartWidth} onChange={setChartWidth} style={{ width: '100%' }} />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label>Chart Height (px)</label>
                    <InputNumber min={100} max={1000} value={chartHeight} onChange={setChartHeight} style={{ width: '100%' }} />
                  </div>
                </>
              )}

              <div style={{ marginBottom: 16 }}>
                <label>Background Color</label>
                <Select
                  value={backgroundColor}
                  onChange={setBackgroundColor}
                  style={{ width: '100%' }}
                >
                  <Option value="#f0f2f5">Light Gray</Option>
                  <Option value="#ffffff">White</Option>
                  <Option value="#000000">Black</Option>
                </Select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label>Axis Font Size</label>
                <InputNumber
                  min={8}
                  max={32}
                  value={fontSize}
                  onChange={setFontSize}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ border: '1px solid #d9d9d9', padding: 12, marginBottom: 16, borderRadius: 4 }}>
                <Title level={5} style={{ marginBottom: 8 }}>Annotation Settings</Title>

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

              <div style={{ marginBottom: 16 }}>
                <label>Annotation Font Color</label>
                <Select
                  value={annotationFontColor}
                  onChange={setAnnotationFontColor}
                  style={{ width: '100%' }}
                >
                  <Option value="#003366">Dark Blue</Option>
                  <Option value="#ff4500">Orange Red</Option>
                  <Option value="#008000">Green</Option>
                  <Option value="#000000">Black</Option>
                </Select>
              </div>
            </div>

            {selectedCurrencies.map(currency => (
              <div key={currency} style={{ border: '1px solid #d9d9d9', padding: 12, marginBottom: 16, borderRadius: 4 }}>
                <Title level={5} style={{ marginBottom: 8 }}>Line Style ({currency})</Title>

                <div style={{ marginBottom: 12 }}>
                  <label>Line Color</label>
                  <Select
                    value={currencyStyles[currency]?.color}
                    onChange={color => handleCurrencyStyleChange(currency, 'color', color)}
                    style={{ width: '100%' }}
                  >
                    <Option value="#ff4500">Orange Red</Option>
                    <Option value="#00bfff">Deep Sky Blue</Option>
                    <Option value="#32cd32">Lime Green</Option>
                    <Option value="#ff69b4">Hot Pink</Option>
                    <Option value="#000000">Black</Option>
                    <Option value="#800080">Purple</Option>
                    <Option value="#ffa500">Orange</Option>
                  </Select>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label>Line Pattern</label>
                  <Select
                    value={currencyStyles[currency]?.pattern}
                    onChange={pattern => handleCurrencyStyleChange(currency, 'pattern', pattern)}
                    style={{ width: '100%' }}
                  >
                    <Option value="solid">Solid</Option>
                    <Option value="dashed">Dashed</Option>
                    <Option value="dotted">Dotted</Option>
                    <Option value="dashdot">Dash Dot</Option>
                  </Select>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label>Dot Shape</label>
                  <Select
                    value={currencyStyles[currency]?.dotShape}
                    onChange={dotShape => handleCurrencyStyleChange(currency, 'dotShape', dotShape)}
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
          </Col>
        )}
      </Row>

      <Modal
        title="Download Options"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="download" type="primary" onClick={() => { handleDownload(); setIsModalVisible(false); }}>
            Download
          </Button>,
        ]}
      >
        <Select
          value={downloadOption}
          onChange={setDownloadOption}
          style={{ width: '100%' }}
        >
          <Option value="visual">Visual Download (PNG)</Option>
          <Option value="data">Data Download (CSV)</Option>
        </Select>
      </Modal>
    </>
  );
};

export default DataVisualizer;
