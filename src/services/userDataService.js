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
          primaryThematicArea: userRecord.Primary_Belize_Fund_Thematic_Area || '',
          secondaryThematicArea: userRecord.Secondary_Thematic_Area_if_applicable || '',
          goal: userRecord.Goal || '',
          detailedLocationDescription: userRecord.Detailed_Location_Description || '',
          latitude: userRecord.Latitude || '',
          longitude: userRecord.Longitude || '',
          dateOfIncorporation: userRecord.Date_of_incorporation_of_Organization || '',
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
}

export const userDataService = new UserDataService(); 