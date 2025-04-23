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
          'https://sophiabanda.work/9m9M8557TfmVm4uZ/sN476M9TIiuVVhN3',
          FingerprintJSPro.defaultEndpoint,
        ],
        scriptUrlPattern: [
          'https://sophiabanda.work/9m9M8557TfmVm4uZ/hkXCizJfrDYfctbV?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
          FingerprintJSPro.defaultScriptUrlPattern,
        ],
      }}
    >
      <App />
    </FpjsProvider>
  </React.StrictMode>
);
