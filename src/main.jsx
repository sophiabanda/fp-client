import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {
  FpjsProvider,
  FingerprintJSPro,
} from '@fingerprintjs/fingerprintjs-pro-react';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FpjsProvider
      loadOptions={{
        apiKey: '6mtUaNcPcmQORr5lg6wm',
        endpoint: [
          // 'https://metrics.sophiabanda.work',
          FingerprintJSPro.defaultEndpoint,
        ],
        scriptUrlPattern: [
          'https://metrics.sophiabanda.work/web/v<version>/<apiKey>/loader_v<loaderVersion>.js',
          FingerprintJSPro.defaultScriptUrlPattern,
        ],
      }}
    >
      <App />
    </FpjsProvider>
  </React.StrictMode>
);
