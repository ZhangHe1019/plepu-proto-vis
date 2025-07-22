// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import DataVisualizer from './components/DataVisualizer';
import 'antd/dist/reset.css';

function App() {
  React.useEffect(() => {
    document.title = "Economic Policy Uncertainty Index for Poland";
  }, []);

  return (
    <Provider store={store}>
      <div style={{ padding: 50 }}>
        <DataVisualizer />
      </div>
    </Provider>
  );
}

export default App;

