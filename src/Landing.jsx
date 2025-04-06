import './Landing.css';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { useEffect, useState } from 'react';

export function Landing() {
  const [serverData, setServerData] = useState(null);
  const { isLoading, error } = useVisitorData(
    { extendedResult: true },
    { immediate: true }
  );

  useEffect(() => {
    const fetchSealedResult = async () => {
      try {
        const fp = await FingerprintJS.load({
          apiKey: '6mtUaNcPcmQORr5lg6wm',
        });

        const identification = await fp.get({ cache: true });
        const sealed = identification.sealedResult;

        const response = await fetch('http://localhost:5001/sealed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sealed }),
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        const responseData = await response.json();
        setServerData(responseData);
      } catch (err) {
        console.error('Failed to complete Sealed Client Results flow:', err);
      }
    };
    fetchSealedResult();
  }, []);

  const iddata = serverData?.data?.products?.identification?.data;
  const identification = serverData?.data?.products?.identification;
  const visitorId = iddata?.visitorId;
  const browserName = iddata?.browserDetails?.browserName;
  const ip = iddata?.ip;
  const request = iddata?.requestId;
  const vpn = identification?.vpn?.data?.result;
  const highActivity = serverData?.data?.products?.highActivity?.data?.result;
  const devTools = serverData?.data?.products?.developerTools?.data?.result;
  const incognito = serverData?.data?.products?.incognito?.data?.result;

  return (
    <>
      <div id="container">
        <div className="welcome">
          Thank you for your participation in this <br /> mysterious and
          important work.
        </div>
        {error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : serverData ? (
          <div className="data-container">
            <div>
              <span>Visitor ID:</span>
              <br /> {visitorId}
            </div>
            <div>
              <span>Request ID:</span>
              <br /> {request}
            </div>
            <div>
              <span>IP:</span>
              <br /> {ip}
            </div>
            <div>
              <span>Browser Name:</span>
              <br /> {browserName}
            </div>
            <div style={{ backgroundColor: vpn ? 'lightcoral' : 'aquamarine' }}>
              <span>VPN:</span>
              <br /> {vpn ? 'True' : 'False'}
            </div>
            <div
              style={{
                backgroundColor: incognito ? 'lightcoral' : 'aquamarine',
              }}
            >
              <span>Incognito:</span>
              <br /> {incognito ? 'True' : 'False'}
            </div>
            <div
              style={{
                backgroundColor: highActivity ? 'lightcoral' : 'aquamarine',
              }}
            >
              <span>High Activity:</span>
              <br /> {highActivity ? 'True' : 'False'}
            </div>
            <div
              style={{
                backgroundColor: devTools ? 'lightcoral' : 'aquamarine',
              }}
            >
              <span>Developer Tools:</span>
              <br /> {devTools ? 'True' : 'False'}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
