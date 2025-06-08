import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 text-gray-600 p-4 text-center text-sm border-t border-gray-300">
      <p>&copy; {currentYear} Barnet FC Business Analysis Workshop. For educational purposes only.</p>
    </footer>
  );
}

export default Footer;
