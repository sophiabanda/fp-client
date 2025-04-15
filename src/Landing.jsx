import './Landing.css';

export function Landing({ serverData }) {
  if (!serverData) {
    return <p>Loading...</p>;
  }

  const idData = serverData?.data?.products?.identification?.data;
  const identification = serverData?.data?.products?.identification;
  const visitorId = idData?.visitorId;
  const browserName = idData?.browserDetails?.browserName;
  const ip = idData?.ip;
  const request = idData?.requestId;
  const vpn = identification?.vpn?.data?.result;
  const highActivity = serverData?.data?.products?.highActivity?.data?.result;
  const devTools = serverData?.data?.products?.developerTools?.data?.result;
  const incognito = serverData?.data?.products?.incognito?.data?.result;

  return (
    <div id="container">
      <div className="welcome">
        Thank you for your participation in this <br /> mysterious and important
        work.
      </div>
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
          <span>
            Click here to <br />
            <a href="https://lumon-industries.com/" target="_blank">
              get to work.
            </a>
          </span>
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
    </div>
  );
}
