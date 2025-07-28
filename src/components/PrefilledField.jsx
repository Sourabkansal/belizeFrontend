import React from 'react';

const PrefilledField = ({ 
  label, 
  value, 
  className = "", 
  showLockIcon = true,
  fieldName = "",
  isDate = false
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={isDate ? "date" : "text"}
          value={value || ''}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 cursor-not-allowed"
          style={{ 
            backgroundColor: '#f9fafb',
            color: '#374151'
          }}
        />
        {showLockIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg 
              className="h-5 w-5 text-gray-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default PrefilledField; 