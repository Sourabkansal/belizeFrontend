import { useEffect, useState } from 'react';

const ApiCallCounter = () => {
  const [apiCallCount, setApiCallCount] = useState(0);

  useEffect(() => {
    // Listen for API call events
    const handleApiCall = () => {
      setApiCallCount(prev => prev + 1);
    };

    // Create a custom event listener for API calls
    window.addEventListener('apiCall', handleApiCall);

    return () => {
      window.removeEventListener('apiCall', handleApiCall);
    };
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50 bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
      📞 API Calls: {apiCallCount}
    </div>
  );
};

export default ApiCallCounter; 