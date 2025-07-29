import { useEffect, useState } from 'react';

// Environment-based API configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://belizebackend.onrender.com/api'  // Production
  : '/api';  // Development (uses Vite proxy)

const ZohoReportFetcher = () => {
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const fetchZohoReport = async () => {
      try {
        setStatus('loading');
        console.log('🔄 Fetching Zoho report data...');
        
        // First test the simple route
        console.log('🧪 Testing simple route...');
        const testResponse = await fetch(`${API_BASE_URL}/zoho/reports/test`);
        if (testResponse.ok) {
          const testResult = await testResponse.json();
          console.log('✅ Simple route test successful:', testResult);
        } else {
          console.error('❌ Simple route test failed:', testResponse.status);
        }
        
        const response = await fetch(`${API_BASE_URL}/zoho/reports/gap-concept-papers`);
        
        if (!response.ok) {
          console.error('❌ HTTP Error:', response.status, response.statusText);
          const errorText = await response.text();
          console.error('📄 Error Response Text:', errorText);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          setStatus('success');
          console.log('✅ Zoho Report Data fetched successfully!');
          console.log('📊 Total Records:', result.data.length);
          console.log('📋 Full Report Data:', result.data);
          
          // Log each record individually for better readability
          result.data.forEach((record, index) => {
            console.log(`📄 Record ${index + 1}:`, record);
          });
          
          // Log summary statistics
          const summary = {
            totalRecords: result.data.length,
            recordsWithBudget: result.data.filter(r => r.Total2 && r.Total2 !== '').length,
            recordsWithCoFinancing: result.data.filter(r => r.Total_Co_Financing && r.Total_Co_Financing !== '').length,
            averageDuration: result.data.reduce((sum, r) => sum + (parseInt(r.Duration_Months) || 0), 0) / result.data.length
          };
          console.log('📈 Report Summary:', summary);
          
        } else {
          setStatus('error');
          console.error('❌ Failed to fetch Zoho report:', result.message);
          console.error('🔍 Error details:', result.error);
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