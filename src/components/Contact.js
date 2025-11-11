import React from 'react';
import { Form, Input, Button, message, Card, Avatar } from 'antd';

const { TextArea } = Input;

const teamMembers = [
  {
    name: 'Dr. Alina M. Landowska',
    role: 'Kozminski University, Project Leader & Economic Policy Analyst',
    description:
      'Leads the PL EPU Index project. Provides strategic direction and economic interpretation, with expertise in international economic relations, policy negotiations, and NLP-based trend analysis. For over 15 years, she has been actively working towards economic development through international cooperation, European policy negotiations, and economic diplomacy (including within the BIAC OECD and ICSB). She combines academic experience with specialization in international economic relations and trend analysis using Text Mining techniques.',
    avatar: './ALavatar.jpg',
  },
  {
    name: 'Dr. Eng. Robert Klopotek',
    role: 'Cardinal Stefan Wyszynski University, Data Scientist & Methodology Expert',
    description:
      'Responsible for EPU modeling, scientific validation, and statistical architecture. Over 15 years of experience in scientific research and R&D in both academic and business sectors. Specializes in statistical modeling, cryptography, machine learning, and software engineering. Develops data analysis technologies such as reinforcement learning, neural networks, and GPU computing. In business, manages data science projects in the CX BPO industry.',
    avatar: './RKavatar.jpg',
  },
  {
    name: 'MSc Eng. He Zhang',
    role: 'PL EPU Index, Data Engineer & NLP Systems Developer',
    description:
      'Designs and maintains the technical infrastructure behind the PL EPU Index. Implements NLP pipelines, backend systems, and dashboard integrations. Specializes in xAI, NLP, and data analysis, designing backend infrastructure including data pipelines, NLP engines, and API integrations. Currently applies NLP in the financial sector.',
    avatar: './HZavatar.jpeg',
  },
];

const ContactAndPartnership = () => {
  const [form] = Form.useForm();

  const handleContactSubmit = async (values) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        message.success('Thank you for reaching out!');
        form.resetFields();
      } else {
        message.error(data.message || 'Oops! Something went wrong.');
      }
    } catch (error) {
      message.error('Oops! Something went wrong.');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>
      {/* Team Section */}
      <div style={{ marginBottom: 60 }}>
        <h2
          style={{
            fontWeight: '700',
            fontSize: '2.4rem',
            marginBottom: 40,
            color: '#001f3f',
            textAlign: 'center',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          PL EPU INDEX TEAM
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {teamMembers.map((member, idx) => (
            <Card key={idx} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', fontFamily: "'Poppins', sans-serif" }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
                <Avatar src={member.avatar} size={80} shape="circle" />
                <h3 style={{ fontSize: '1.4rem', marginBottom: 8, color: '#001f3f', fontWeight: 700 }}>{member.name}</h3>
                <p style={{ fontWeight: 500, marginBottom: 12, fontStyle: 'italic' }}>{member.role}</p>
                <p style={{ lineHeight: 1.7, fontSize: '0.95rem', color: '#444', textAlign: 'justify' }}>{member.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Us Section */}
      <div
        style={{
          background: '#fff',
          padding: '30px 40px',
          borderRadius: 12,
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
        }}
      >
        <h2
          style={{
            fontWeight: '700',
            fontSize: '2.4rem',
            marginBottom: 24,
            color: '#001f3f',
            textAlign: 'center',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Contact Us
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleContactSubmit}
          style={{ maxWidth: 600, margin: '0 auto', fontFamily: "'Poppins', sans-serif" }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Your name" size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Your email" size="large" />
          </Form.Item>

          <Form.Item
            label="Comments"
            name="comments"
            rules={[{ required: true, message: 'Please enter your comments' }]}
          >
            <TextArea rows={5} placeholder="Your comments or message" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{ fontWeight: '600', letterSpacing: 0.5 }}
            >
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ContactAndPartnership;
