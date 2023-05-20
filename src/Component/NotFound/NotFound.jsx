import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.text}>Oops! Page not found.</p>
      <Link to="/" style={styles.link}>
        Trở về trang chủ
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: '5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.5rem',
    color: '#666',
    textAlign: 'center',
  },
  link: {
    fontSize: '1.2rem',
    color: '#007bff',
    marginTop: '1rem',
  },
};

export default NotFound;