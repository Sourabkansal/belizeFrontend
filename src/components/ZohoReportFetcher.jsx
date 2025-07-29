import { useEffect, useState, useRef } from 'react';

// Environment-based API configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://belizebackend.onrender.com/api'  // Production
  : '/api';  // Development (uses Vite proxy)

const ZohoReportFetcher = () => {
  const [status, setStatus] = useState('idle');
  const hasFetched = useRef(false); // Track if we've already fetched
  const apiCallCount = useRef(0); // Track API calls

  useEffect(() => {
    // Only fetch once when component mounts
    if (hasFetched.current) {
      console.log('🔄 ZohoReportFetcher: Already fetched, skipping duplicate call');
      return;
    }

    const fetchZohoReport = async () => {
      try {
        hasFetched.current = true;
        apiCallCount.current++;
        setStatus('loading');
        console.log(`📞 ZohoReportFetcher API Call #${apiCallCount.current} - Fetching Zoho report data...`);
        
        // Dispatch API call event for counter
        window.dispatchEvent(new CustomEvent('apiCall'));
        
        const response = await fetch(`${API_BASE_URL}/zoho/reports/gap-concept-papers`);
        
        if (!response.ok) {
          console.error('❌ HTTP Error:', response.status, response.statusText);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          setStatus('success');
          console.log('✅ Zoho Report Data fetched successfully!');
          console.log('📊 Total Records:', result.data.length);
          
        } else {
          setStatus('error');
          console.error('❌ Failed to fetch Zoho report:', result.message);
        }
      } catch (error) {
        setStatus('error');
        console.error('💥 Error fetching Zoho report:', error);
      }
    };

    // Fetch data immediately when component mounts
    fetchZohoReport();
  }, []); // Empty dependency array means this runs once on mount

  // Show a small status indicator in the top-right corner
  return (
    <div className="fixed top-4 right-4 z-50">
      {status === 'loading' && (
        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
          🔄 Loading Zoho Data...
        </div>
      )}
      {/* {status === 'success' && (
        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
          ✅ Zoho Data Loaded (Check Console)
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">
          ❌ Zoho Data Error (Check Console)
        </div>
      )} */}
    </div>
  );
};

export default ZohoReportFetcher; 