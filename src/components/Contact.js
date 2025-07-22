import { Form, Input, Button, message } from 'antd';
import emailjs from 'emailjs-com';

const { TextArea } = Input;

const ContactUsPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    emailjs.send("service_xnhuuge","template_mv5hz1w")
      .then(
        () => {
          message.success('Your message has been sent!');
          form.resetFields();
        },
        (error) => {
          console.error(error);
          message.error('Failed to send message. Try again later.');
        }
      );
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Contact Us</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input placeholder="Your email" />
        </Form.Item>

        <Form.Item
          label="Comments"
          name="comments"
          rules={[{ required: true, message: 'Please enter your comments' }]}
        >
          <TextArea rows={4} placeholder="Your message" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactUsPage;
