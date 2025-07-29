import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { userDataService } from '../services/userDataService';

const UserDataContext = createContext();

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasInitialized = useRef(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await userDataService.fetchUserConceptData();
      
      if (data) {
        setUserData(data);
        console.log('✅ User data loaded successfully');
      } else {
        console.log('⚠️ No user data found');
        setUserData(null);
      }
    } catch (err) {
      console.error('❌ Error loading user data:', err);
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch once when component mounts
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      fetchUserData();
    }
  }, []);

  const refreshUserData = () => {
    fetchUserData();
  };

  const value = {
    userData,
    loading,
    error,
    refreshUserData,
    userEmail: userDataService.getUserEmail()
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}; 