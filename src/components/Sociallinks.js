import { TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

const SocialLinks = () => {
  return (
    <div style={{ display: 'flex', gap: '20px', fontSize: '28px' }}>
      <a
        href="https://twitter.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
        style={{ color: '#1DA1F2' }}
      >
        <TwitterOutlined />
      </a>
      <a
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        style={{ color: '#0077B5' }}
      >
        <LinkedinOutlined />
      </a>
    </div>
  );
};

export default SocialLinks;
