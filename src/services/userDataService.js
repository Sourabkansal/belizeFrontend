// Environment-based API configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://belizebackend.onrender.com/api'  // Production
  : '/api';  // Development (uses Vite proxy)

class UserDataService {
  constructor() {
    this.userEmail = 'Sourabkansal56@gmail.com'; // Hardcoded for now
    this.apiCallCount = 0; // Track API calls
    this.cachedData = null; // Cache the data
    this.lastFetchTime = 0; // Track last fetch time
  }

  async fetchUserConceptData() {
    try {
      this.apiCallCount++;
      console.log(`📞 API Call #${this.apiCallCount} - Fetching concept data for user:`, this.userEmail);
      
      // Dispatch API call event for counter
      window.dispatchEvent(new CustomEvent('apiCall'));
      
      // Check if we have cached data and it's recent (within 5 minutes)
      const now = Date.now();
      if (this.cachedData && (now - this.lastFetchTime) < 5 * 60 * 1000) {
        console.log('📦 Using cached data (fetched within 5 minutes)');
        return this.cachedData;
      }
      
      const response = await fetch(`${API_BASE_URL}/zoho/reports/gap-concept-papers`);
      
      if (!response.ok) {
        console.error('❌ Failed to fetch concept data:', response.status);
        return null;
      }
      
      const result = await response.json();
      
      if (!result.success || !result.data) {
        console.error('❌ Invalid response format:', result);
        return null;
      }
      
      console.log('📊 Total concept records:', result.data.length);
      
      // Find record matching user email
      const userRecord = result.data.find(record => 
        record.Email && record.Email.toLowerCase() === this.userEmail.toLowerCase()
      );
      
      if (userRecord) {
        console.log('✅ Found matching record for user');
        
        // Cache the processed data
        this.cachedData = {
          contactName: userRecord.Contact_Name || '',
          projectTitle: userRecord.Project_Title || '',
          email: userRecord.Email || '',
          projectSummary: userRecord.Project_Summary || '',
          durationMonths: userRecord.Duration_Months || '',
          proposedStartDate: userRecord.Proposed_Start_Date || '',
          totalBudget: userRecord.Total2 || '',
          totalCoFinancing: userRecord.Total_Co_Financing || '',
          totalProjectCost: userRecord.Total_Project_Estimated_Cost || '',
          organizationName: userRecord.Organization_Name || userRecord.Organization || '',
          organizationAddress: userRecord.Organization_Address || '',
          organizationType: userRecord.Type_of_Organization || '',
          thematicArea: userRecord.Thematic_Area || '',
          primaryThematicArea: userRecord.Project_Theme || userRecord.Primary_Belize_Fund_Thematic_Area || '',
          secondaryThematicArea: userRecord.Award_Category1 || userRecord.Secondary_Thematic_Area_if_applicable || '',
          goal: userRecord.Goal || '',
          detailedLocationDescription: userRecord.Detailed_Location_Description || '',
          latitude: userRecord.Latitude || '',
          longitude: userRecord.Longitude || '',
          dateOfIncorporation: this.formatDateForInput(userRecord.Date_of_incorporation_of_Organization) || '',
          contactPosition: userRecord.Position || '',
          contactTelephone: userRecord.Telephone || ''
        };
        
        this.lastFetchTime = now;
        return this.cachedData;
      } else {
        console.log('⚠️ No matching record found for user email:', this.userEmail);
        return null;
      }
      
    } catch (error) {
      console.error('💥 Error fetching user concept data:', error);
      return null;
    }
  }

  // Method to set user email (for future use when you implement authentication)
  setUserEmail(email) {
    this.userEmail = email;
  }

  // Get current user email
  getUserEmail() {
    return this.userEmail;
  }

  // Helper method to format Zoho date to HTML date input format
  formatDateForInput(zohoDate) {
    if (!zohoDate) return '';
    
    console.log('📅 Formatting date:', zohoDate);
    
    // Zoho date format is "09-Jul-2025" or "06-Jan-2015"
    // We need to convert it to "2025-07-09" for HTML date input
    
    try {
      // Parse the Zoho date format: "DD-MMM-YYYY"
      const dateMatch = zohoDate.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/);
      
      if (!dateMatch) {
        console.warn('⚠️ Invalid Zoho date format:', zohoDate);
        return '';
      }
      
      const [, day, monthStr, year] = dateMatch;
      
      // Map month abbreviations to numbers
      const monthMap = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
        'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
        'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
      };
      
      const month = monthMap[monthStr];
      if (!month) {
        console.warn('⚠️ Invalid month abbreviation:', monthStr);
        return '';
      }
      
      // Format to YYYY-MM-DD
      const formattedDate = `${year}-${month}-${day.padStart(2, '0')}`;
      console.log('✅ Formatted date:', formattedDate);
      
      return formattedDate;
    } catch (error) {
      console.error('❌ Error formatting date:', error);
      return '';
    }
  }
}

export const userDataService = new UserDataService(); 