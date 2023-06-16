import React from 'react';
import { ReactDOM } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from '/src/components/App';
import '/src/index.css'

createRoot(document.getElementById('root')).render(<App />);
