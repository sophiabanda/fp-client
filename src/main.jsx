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
          'https://sophiabanda.work/kl74xUQUAFJJ4Sxw/30Bhs4rb8HIAVhJp',
          FingerprintJSPro.defaultEndpoint,
        ],
        scriptUrlPattern: [
          'https://sophiabanda.work/kl74xUQUAFJJ4Sxw/RR840wdo8s0n3rEg?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
          FingerprintJSPro.defaultScriptUrlPattern,
        ],
      }}
    >
      <App />
    </FpjsProvider>
  </React.StrictMode>
);
