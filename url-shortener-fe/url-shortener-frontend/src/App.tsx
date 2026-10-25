import { useState } from 'react';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Replace this with your actual Vercel backend production URL when deployed
  const API_BASE_URL = 'https://tiny-url-gamma.vercel.app'; 

  // Client-Side Validation: Ensure the user actually typed a legitimate URL format
  const isValidUrl = (string:string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setCopied(false);

    // 1. Validation check
    if (!longUrl.trim()) {
      setError('Please enter a URL.');
      return;
    }

    if (!isValidUrl(longUrl)) {
      setError('Please enter a valid URL (including http:// or https://).');
      return;
    }

    setIsLoading(true);

    // 2. API Communication with your Node/Express Backend
    try {
      const response = await fetch(`${API_BASE_URL}/api/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      // Backend returns the full shortened URL string
      setShortUrl(data.shortUrl);
      setLongUrl(''); // Clear input box on success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to the backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  // User Experience (UX): Simple one-click copy functionality
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copy button text after 2 seconds
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>⚡ Instant URL Shortener</h1>
        <p style={styles.subtitle}>Paste your long, messy link below to get a neat, high-speed redirect link.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="https://example.com"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            disabled={isLoading}
            style={styles.input}
          />
          <button type="submit" disabled={isLoading} style={styles.button}>
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {/* Error Feedback Display */}
        {error && <div style={styles.error}>{error}</div>}

        {/* Success Output Display */}
        {shortUrl && (
          <div style={styles.resultContainer}>
            <p style={styles.resultLabel}>Your Shortened Link:</p>
            <div style={styles.resultBox}>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
                {shortUrl}
              </a>
              <button onClick={handleCopy} style={styles.copyButton}>
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple embedded styles to ensure it looks beautiful right out of the box
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    fontFamily: 'system-ui, sans-serif',
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '14px',
    fontSize: '16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  },
  error: {
    marginTop: '15px',
    color: '#ef4444',
    fontSize: '14px',
    textAlign: 'left',
    backgroundColor: '#fee2e2',
    padding: '10px',
    borderRadius: '6px',
  },
  resultContainer: {
    marginTop: '30px',
    textAlign: 'left',
    backgroundColor: '#f0fdf4',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #bbf7d0',
  },
  resultLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#166534',
    margin: '0 0 8px 0',
  },
  resultBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
  },
  link: {
    color: '#15803d',
    fontWeight: '700',
    textDecoration: 'none',
    wordBreak: 'break-all',
  },
  copyButton: {
    padding: '8px 12px',
    fontSize: '14px',
    backgroundColor: '#16a34a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
};

export default App;