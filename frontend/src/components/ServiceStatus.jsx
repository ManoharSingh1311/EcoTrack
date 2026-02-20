import { useState, useEffect } from 'react';
import axios from 'axios';

function ServiceStatus() {
  const [services, setServices] = useState({
    gateway: { status: 'checking', name: 'API Gateway', url: 'http://localhost:8080' },
    eureka: { status: 'checking', name: 'Discovery Server', url: 'http://localhost:8761' },
  });
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    checkServices();
    const interval = setInterval(checkServices, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const checkServices = async () => {
    const newStatus = { ...services };

    // Check API Gateway
    try {
      await axios.get('http://localhost:8080/actuator/health', { timeout: 3000 });
      newStatus.gateway.status = 'online';
    } catch (error) {
      newStatus.gateway.status = 'offline';
    }

    // Check Eureka
    try {
      await axios.get('http://localhost:8761/actuator/health', { timeout: 3000 });
      newStatus.eureka.status = 'online';
    } catch (error) {
      newStatus.eureka.status = 'offline';
    }

    setServices(newStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return '✓ Online';
      case 'offline':
        return '✗ Offline';
      default:
        return '⟳ Checking...';
    }
  };

  const allOnline = Object.values(services).every(s => s.status === 'online');
  const anyOffline = Object.values(services).some(s => s.status === 'offline');

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Status Indicator Dot */}
      <button
        onClick={() => setShowStatus(!showStatus)}
        className={`${
          allOnline ? 'bg-green-500' : anyOffline ? 'bg-red-500' : 'bg-yellow-500'
        } text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all`}
        title="Service Status"
      >
        {allOnline ? '✓' : anyOffline ? '!' : '⟳'}
      </button>

      {/* Status Panel */}
      {showStatus && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Service Status</h3>
            <button
              onClick={() => setShowStatus(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            {Object.entries(services).map(([key, service]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{service.name}</span>
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`} />
                  <span className="text-xs font-medium">{getStatusText(service.status)}</span>
                </div>
              </div>
            ))}
          </div>

          {anyOffline && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-red-600 mb-2">
                ⚠️ Some services are offline!
              </p>
              <a
                href="/TROUBLESHOOTING.md"
                target="_blank"
                className="text-xs text-blue-600 hover:underline"
              >
                View Troubleshooting Guide →
              </a>
            </div>
          )}

          <button
            onClick={checkServices}
            className="mt-3 w-full text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded"
          >
            Refresh Status
          </button>
        </div>
      )}
    </div>
  );
}

export default ServiceStatus;
