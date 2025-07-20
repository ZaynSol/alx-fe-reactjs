function Footer() {
  return (
    <footer style={{
      padding: '15px',
      textAlign: 'center',
      backgroundColor: '#333',
      color: 'white',
      marginTop: '30px'
    }}>
      &copy; {new Date().getFullYear()} My Company. All rights reserved.
    </footer>
  );
}

export default Footer;
