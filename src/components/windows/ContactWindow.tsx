import { site } from '@/config/site';

export function ContactWindow() {
  return (
    <div className="contact-compose">
      <div className="contact-toolbar">
        <span style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px', fontWeight: 'bold', color: '#000080' }}>
          {'\uD83D\uDCE7'} New Message
        </span>
      </div>
      <div className="contact-fields">
        <div className="contact-field-row">
          <label className="contact-label">To:</label>
          <div className="contact-field-value">
            <a href={site.links.email} style={{ color: '#0000FF', fontSize: '12px' }}>
              hello@eonlex.com
            </a>
          </div>
        </div>
        <div className="contact-field-row">
          <label className="contact-label">Subject:</label>
          <div className="contact-field-value" style={{ color: '#000', fontSize: '12px' }}>
            Hey Sparsh! Saw your rad homepage {'\uD83D\uDE0E'}
          </div>
        </div>
      </div>
      <div className="contact-body">
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '12px', color: '#666', margin: 0 }}>
          Type your message here... or just click one of the buttons below!
        </p>
      </div>
      <div className="contact-actions">
        <a
          href={site.links.email}
          className="win95-button"
          style={{ fontSize: '11px', padding: '4px 16px' }}
        >
          {'\uD83D\uDCE8'} Send Email
        </a>
        <a
          href={site.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="win95-button"
          style={{ fontSize: '11px', padding: '4px 16px' }}
        >
          {'\uD83D\uDC64'} LinkedIn
        </a>
        <a
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="win95-button"
          style={{ fontSize: '11px', padding: '4px 16px' }}
        >
          {'\uD83D\uDCBB'} GitHub
        </a>
      </div>
    </div>
  );
}
