// ContactAndPartnership.js
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import emailjs from 'emailjs-com';

const { TextArea } = Input;

const ContactAndPartnership = () => {
  const [form] = Form.useForm();

  const handleContactSubmit = (values) => {
    // Prepare your emailjs params
    const templateParams = {
      from_name: values.name,
      from_email: values.email,
      message: values.comments,
    };

    emailjs
      .send(
        'service_xnhuuge', // replace with your EmailJS service ID
        'template_mv5hz1w', // replace with your EmailJS template ID
        templateParams,
        '702vbdWHqNjNspsCG' // replace with your EmailJS user ID (public key)
      )
      .then(
        (result) => {
          message.success('Thank you for reaching out!');
          form.resetFields();
        },
        (error) => {
          message.error('Oops! Something went wrong, please try again later.');
          console.error('EmailJS error:', error.text);
        }
      );
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: '0 20px' }}>
      {/* Contact Us Section */}
      <div
        style={{
          background: '#fff',
          padding: '30px 40px',
          borderRadius: 12,
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
          marginBottom: 60,
        }}
      >
        <h2
          style={{
            fontWeight: '700',
            fontSize: '2.4rem',
            marginBottom: 24,
            color: '#001f3f',
            textAlign: 'center',
          }}
        >
          Contact Us
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleContactSubmit}
          style={{ maxWidth: 600, margin: '0 auto' }}
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
