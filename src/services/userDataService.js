class UserDataService {
  constructor() {
    this.userEmail = 'Sourabkansal56@gmail.com'; // Hardcoded for now
  }

  async fetchUserConceptData() {
    try {
      console.log('🔍 Fetching concept data for user:', this.userEmail);
      
      const response = await fetch('/api/zoho/reports/gap-concept-papers');
      
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
        console.log('✅ Found matching record for user:', userRecord);
        console.log('📋 Available fields in record:', Object.keys(userRecord));
        console.log('📅 Date of Incorporation raw value:', userRecord.Date_of_incorporation_of_Organization);
        console.log('🎯 Project_Theme value:', userRecord.Project_Theme);
        console.log('🏆 Award_Category1 value:', userRecord.Award_Category1);
        
        return {
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
    
    // Zoho date format is typically "22-Jul-2025"
    // We need to convert it to "2025-07-22" for HTML date input
    
    try {
      // Parse the Zoho date format
      const date = new Date(zohoDate);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.warn('⚠️ Invalid date format:', zohoDate);
        return '';
      }
      
      // Format to YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      const formattedDate = `${year}-${month}-${day}`;
      console.log('✅ Formatted date:', formattedDate);
      
      return formattedDate;
    } catch (error) {
      console.error('❌ Error formatting date:', error);
      return '';
    }
  }
}

export const userDataService = new UserDataService(); 