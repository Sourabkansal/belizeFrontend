import { useState, useEffect } from 'react'
import { FileText, Building, Info, Users, Plus, X } from 'lucide-react'
import PrefilledField from '../PrefilledField'

const Step2BackgroundInfo = ({ register, errors, setValue, getValues, watch, userData }) => {
  const [summaryWordCount, setSummaryWordCount] = useState(0)
  const [orgBackgroundWordCount, setOrgBackgroundWordCount] = useState(0)
  const [implementationTeamRows, setImplementationTeamRows] = useState([{ id: 1 }])

  // Word count helper function
  const countWords = (text) => {
    if (!text) return 0
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  // Add new row to implementation team table
  const addImplementationTeamRow = () => {
    const newId = Math.max(...implementationTeamRows.map(row => row.id)) + 1
    setImplementationTeamRows([...implementationTeamRows, { id: newId }])
  }

  // Remove row from implementation team table
  const removeImplementationTeamRow = (id) => {
    if (implementationTeamRows.length > 1) {
      setImplementationTeamRows(implementationTeamRows.filter(row => row.id !== id))
    }
  }

  // Monitor word counts
  useEffect(() => {
    const summary = watch('projectSummary')
    const orgBackground = watch('organizationalBackground')
    
    setSummaryWordCount(countWords(summary))
    setOrgBackgroundWordCount(countWords(orgBackground))
  }, [watch('projectSummary'), watch('organizationalBackground')])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">B. Background Information</h3>
        <p className="text-gray-600">Provide comprehensive information about your project and organization</p>
      </div>

      {/* Project Summary Section */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-blue-600 mr-2" />
            <h4 className="text-xl font-semibold text-gray-900">1. Summary (max-500 words)</h4>
          </div>
          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
            summaryWordCount > 500 ? 'bg-red-100 text-red-700' : 
            summaryWordCount > 450 ? 'bg-yellow-100 text-yellow-700' : 
            'bg-green-100 text-green-700'
          }`}>
            {summaryWordCount} / 500 words
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <h5 className="font-medium text-gray-900 mb-2">The summary should briefly describe:</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>The Goal of the proposed project</li>
              <li>Rationale/Justification for the project approach</li>
              <li>Purpose of the project</li>
              <li>Contribution towards the Belize Fund Thematic Area (TA). Focus on the targeted TA only!</li>
              <li>Contribution towards national/local management plans and strategies (if any)</li>
              <li>The issue to be addressed (the problem/threat) and proposed approach/solution (the solution)</li>
              <li>Site description (if relevant)</li>
              <li>Beneficiaries, including the participation of women, men and indigenous people, if any</li>
            </ul>
          </div>

          <div>
            <label className="form-label">Project Summary * (Maximum 500 words)</label>
            <textarea
              {...register('projectSummary')}
              className="form-input min-h-[300px]"
              placeholder="Provide a comprehensive summary of your project covering all the points listed above..."
            />
            {errors.projectSummary && (
              <p className="form-error">{errors.projectSummary.message}</p>
            )}
            {summaryWordCount > 500 && (
              <p className="text-red-600 text-sm mt-1">
                ⚠️ Summary exceeds 500-word limit. Please reduce by {summaryWordCount - 500} words.
              </p>
            )}
          </div>

          {/* Thematic Area Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {userData ? (
                <PrefilledField
                  label="Primary Belize Fund Thematic Area *"
                  value={userData.primaryThematicArea}
                  fieldName="Project_Theme from Concept Paper"
                />
              ) : (
                <>
                  <label className="form-label">Primary Belize Fund Thematic Area *</label>
                  <select {...register('primaryThematicArea')} className="form-input">
                    <option value="">Select primary thematic area</option>
                    <option value="TA1">TA 1: Protection for Biodiversity</option>
                    <option value="TA2">TA 2: Sustainable Fisheries</option>
                    <option value="TA3">TA 3: Climate Resilience</option>
                    <option value="TA4">TA 4: Blue Business Innovation</option>
                  </select>
                  {errors.primaryThematicArea && (
                    <p className="form-error">{errors.primaryThematicArea.message}</p>
                  )}
                </>
              )}
            </div>

            <div>
              {userData ? (
                <PrefilledField
                  label="Secondary Thematic Area (if applicable)"
                  value={userData.secondaryThematicArea}
                  fieldName="Award_Category1 from Concept Paper"
                />
              ) : (
                <>
                  <label className="form-label">Secondary Thematic Area (if applicable)</label>
                  <select {...register('secondaryThematicArea')} className="form-input">
                    <option value="">Select secondary thematic area</option>
                    <option value="TA1">TA 1: Protection for Biodiversity</option>
                    <option value="TA2">TA 2: Sustainable Fisheries</option>
                    <option value="TA3">TA 3: Climate Resilience</option>
                    <option value="TA4">TA 4: Blue Business Innovation</option>
                  </select>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Organizational Background Section */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Building className="h-6 w-6 text-green-600 mr-2" />
            <h4 className="text-xl font-semibold text-gray-900">2. Organizational Background and Capacity (max-250 words)</h4>
          </div>
                      <div className={`text-sm font-medium px-3 py-1 rounded-full ${
              orgBackgroundWordCount > 250 ? 'bg-red-100 text-red-700' : 
              orgBackgroundWordCount > 225 ? 'bg-yellow-100 text-yellow-700' : 
              'bg-green-100 text-green-700'
            }`}>
              {orgBackgroundWordCount} / 250 words
            </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="font-medium text-gray-900 mb-2">This section should provide information on the profile of the lead applicant (organization) and main partners (implementing). Furthermore, it should clearly demonstrate that the applicant (supported by partners if appropriate) has the capacity, commitment and experience to successfully implement the proposed project. This section must include:</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Organization Mission and Vision (attach supporting document)</li>
              <li>The purpose and day-to-day core activities being carried out by the applying organization</li>
              <li>Organizational legal status, date of registration and governance structure</li>
              <li>Existing capacity and skills to effectively implement and manage the proposed project (including the project implementation team)</li>
              <li>Description of past or current experience(s) and partnership(s), relevant to the present proposal</li>
              <li>Provide examples of relevant projects executed to date, giving a brief description including: project title, period of implementation, project leader, partners, budget, and donor/agency</li>
              <li>Include CV (if applicable) as supporting documents for the Project Manager/project implementation team</li>
            </ul>
          </div>

          {/* Organization Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Organization Mission *</label>
              <textarea
                {...register('organizationMission')}
                className="form-input"
                rows="3"
                placeholder="State your organization's mission statement"
              />
              {errors.organizationMission && (
                <p className="form-error">{errors.organizationMission.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Organization Vision *</label>
              <textarea
                {...register('organizationVision')}
                className="form-input"
                rows="3"
                placeholder="State your organization's vision statement"
              />
              {errors.organizationVision && (
                <p className="form-error">{errors.organizationVision.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Legal Status *</label>
              <select {...register('legalStatus')} className="form-input">
                <option value="">Select legal status</option>
                <option value="Registered NGO">Registered NGO</option>
                <option value="Non-profit Organization">Non-profit Organization</option>
                <option value="Community-based Organization">Community-based Organization</option>
                <option value="Private Company">Private Company</option>
                <option value="Government Agency">Government Agency</option>
                <option value="Academic Institution">Academic Institution</option>
                <option value="International Organization">International Organization</option>
              </select>
              {errors.legalStatus && (
                <p className="form-error">{errors.legalStatus.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Registration Date *</label>
              <input
                type="date"
                {...register('registrationDate')}
                className="form-input"
              />
              {errors.registrationDate && (
                <p className="form-error">{errors.registrationDate.message}</p>
              )}
            </div>
          </div>

          {/* Organizational Background Narrative */}
          <div>
            <label className="form-label">Organizational Background and Capacity * (Maximum 250 words)</label>
            <textarea
              {...register('organizationalBackground')}
              className="form-input min-h-[300px]"
              placeholder="Describe your organization's background, capacity, experience, and relevant projects. Include details about your team's qualifications and past achievements..."
            />
            {errors.organizationalBackground && (
              <p className="form-error">{errors.organizationalBackground.message}</p>
            )}
            {orgBackgroundWordCount > 250 && (
              <p className="text-red-600 text-sm mt-1">
                ⚠️ Background exceeds 250-word limit. Please reduce by {orgBackgroundWordCount - 250} words.
              </p>
            )}
          </div>

          {/* Project Implementation Team */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="font-medium text-gray-900 mb-3">Project Implementation Team</h5>
            
            {/* Implementation Team Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-center font-medium text-gray-900">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-center font-medium text-gray-900">Position</th>
                    <th className="border border-gray-300 px-4 py-2 text-center font-medium text-gray-900">
                      <div>Project Management</div>
                      <div>experience</div>
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center font-medium text-gray-900">
                      <div>Updated CV</div>
                      <div>(?)</div>
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center font-medium text-gray-900 w-16">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {implementationTeamRows.map((row, index) => (
                    <tr key={row.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          {...register(`implementationTeam.${index}.name`)}
                          className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter name"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          {...register(`implementationTeam.${index}.position`)}
                          className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter position"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <textarea
                          {...register(`implementationTeam.${index}.projectManagementExperience`)}
                          className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          rows="2"
                          placeholder="Describe experience"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setValue(`implementationTeam.${index}.cvFile`, file);
                            }
                          }}
                          className="w-full text-sm text-gray-500
                            file:mr-2 file:py-1 file:px-2
                            file:rounded file:border-0
                            file:text-xs file:font-medium
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {implementationTeamRows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeImplementationTeamRow(row.id)}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors duration-200"
                            title="Remove row"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Add Row Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={addImplementationTeamRow}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <span>+ Add Row</span>
              </button>
            </div>
          </div>

          {/* Previous Relevant Projects */}
          <div>
            <label className="form-label">Previous Relevant Projects</label>
            <textarea
              {...register('previousRelevantProjects')}
              className="form-input"
              rows="4"
              placeholder="List and briefly describe relevant projects executed to date, including: project title, period of implementation, project leader, partners, budget, and donor/agency"
            />
            {errors.previousRelevantProjects && (
              <p className="form-error">{errors.previousRelevantProjects.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Important Notes:</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Organization Mission and Vision documents should be attached in the final step</li>
              <li>• CVs for Project Manager and key implementation team members should be attached</li>
              <li>• Ensure all information demonstrates capacity to implement the proposed project</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step2BackgroundInfo 