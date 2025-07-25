import { Shield, AlertTriangle, FileCheck, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const Step5RiskScreening = ({ register, errors, setValue, getValues, watch }) => {
  const [expandedSections, setExpandedSections] = useState({});

  // Risk rating options (1-5)
  const riskOptions = [
    { value: '', label: 'Select...' },
    { value: '1', label: '1 - Very Low' },
    { value: '2', label: '2 - Low' },
    { value: '3', label: '3 - Medium' },
    { value: '4', label: '4 - High' },
    { value: '5', label: '5 - Very High' }
  ];

  const essData = [
    {
      code: 'ESS1',
      title: 'Environmental and Social Risk Management',
      questions: [
        'raised human rights concerns (e.g. during the stakeholder engagement process, grievance processes, public statements) by local communities or individuals?',
        'risk that duty-bearers (e.g. government agencies) do not have the capacity to meet their obligations in the project?',
        'risk that rights-holders (e.g. project-affected persons) do not have the capacity to claim their rights?',
        'adverse impacts on enjoyment of the human rights (civil, political, economic, social or cultural) of the affected population and particularly of marginalized groups?',
        'inequitable or discriminatory impacts on affected populations, particularly people living in poverty or marginalized or excluded individuals or groups, including persons with disabilities?',
        'restrictions in availability, quality of and/or access to resources or basic services, in particular to marginalized individuals or groups, including persons with disabilities?',
        'exacerbation of conflicts among and/or the risk of violence to project-affected communities and individuals?',
        'conflict with existing environmental regulations?'
      ]
    },
    {
      code: 'ESS2',
      title: 'Conservation and Sustainable Management of Biodiversity, Natural Habitats and Living Natural Resources',
      questions: [
        'adverse impacts to habitats (e.g. modified, natural, and critical habitats) and/or ecosystems and ecosystem services? For example, through habitat loss, conversion or degradation, fragmentation, hydrological changes?',
        'activities within or adjacent to critical habitats and/or environmentally sensitive areas, including (but not limited to) legally designated protected areas (e.g. marine reserves, wildlife sanctuaries, natural monuments, nature reserves, national parks), coastal areas proposed for protection, or recognized as such by authoritative sources and/or indigenous peoples or local communities?',
        'changes to the use of lands and resources that may have adverse impacts on habitats, ecosystems, and/or livelihoods? (Note: if restrictions and/or limitations of access to lands would apply, refer to Standard 5)',
        'infrastructure construction, upgrade, or decommissioning?',
        'risks to endangered species (e.g. reduction, encroachment on habitat)?',
        'exacerbation of illegal wildlife trade?',
        'introduction of invasive alien species?',
        'adverse impacts on land/soil (degradation, sedimentation, erosion of soil)?',
        'harvesting of natural forests, plantation development, or reforestation?',
        'significant agricultural production?',
        'animal husbandry, aquaculture or harvesting of fish populations or other aquatic species?',
        'utilization of genetic resources? (e.g. collection and/or harvesting, commercial development)',
        'restoration or rehabilitation activities?',
        'adverse transboundary or global environmental concerns?',
        'outputs and outcomes sensitive or vulnerable to potential impacts of climate change or disasters? For example, through increased precipitation, drought, temperature, salinity, extreme events, earthquakes?',
        'increases in vulnerability to climate change impacts or disaster risks now or in the future (also known as maladaptive or negative coping practices)? For example, changes to land use planning may encourage further development of floodplains, potentially?'
      ]
    },
    {
      code: 'ESS3',
      title: 'Pollution Prevention',
      questions: [
        'the release of pollutants to the environment due to routine or non-routine circumstances with the potential for adverse local, regional, and/or transboundary impacts?',
        'the generation of waste (both hazardous and non-hazardous)?',
        'the manufacture, trade, release, and/or use of hazardous materials and/or chemicals?',
        'the use of chemicals or materials subject to international bans or phase-outs? For example, DDT, PCBs and other chemicals listed in international conventions such as the Montreal Protocol, Minamata Convention, Basel Convention, Rotterdam Convention, Stockholm Convention?',
        'the application of pesticides that may have a negative effect on the environment or human health?',
        'significant consumption of raw materials, energy, and/or water?',
        'risks/impacts of pollution that can impact Occupational Health and Safety?',
        'risks/impacts on water quality?',
        'risks/impacts on air quality?'
      ]
    },
    {
      code: 'ESS4',
      title: 'Land Acquisition and Involuntary Resettlement',
      questions: [
        'economic displacement (e.g. loss of assets or access to resources due to land acquisition or access restrictions – even in the absence of physical relocation)?',
        'impacts on or changes to land tenure arrangements and/or community-based property rights/customary rights to land, territories and/or resources?',
        'new restrictions of, or access to, natural resources?'
      ]
    },
    {
      code: 'ESS5',
      title: 'Labor and Working Conditions',
      questions: [
        'working conditions that do not meet national labour laws and international commitments?',
        'working conditions that may deny freedom of association and collective bargaining?',
        'use of child labour and forced labour?',
        'discriminatory working conditions and/or lack of equal opportunity?',
        'occupational health and safety risks due to physical, chemical, biological and psychosocial hazards (including violence and harassment) throughout the project life-cycle?',
        'the physical integrity of the persons working on the project compromised by external factor? (security risks)',
        'persons working on the project be exposed to toxic and flammable substances including fuel?',
        'persons working on the project operate heavy duty machinery (equipment for marine/coastal activities, farming, etc.)',
        'persons operating equipment in project activities (including scuba gear, boats and vehicles)?',
        'community labour (including stipends for volunteers)?'
      ]
    },
    {
      code: 'ESS6',
      title: 'Physical Cultural Heritage',
      questions: [
        'alterations to landscapes and natural features with cultural significance? (e.g. significant excavations, demolitions, etc)',
        'utilization of tangible and/or intangible forms (e.g. practices, traditional knowledge) of Cultural Heritage for commercial or other purposes?',
        'restrict access to sacred sites or natural sites of cultural, spiritual significance?'
      ]
    },
    {
      code: 'ESS7',
      title: 'Stakeholder Engagement and Information Disclosure',
      questions: [
        'identification of vulnerable and disadvantaged stakeholders?',
        'inequitable participation of persons of all genders in consultation and engagement process?'
      ]
    },
    {
      code: 'ESS8',
      title: 'Accountability and Grievance Procedures',
      questions: [
        'exclusion of any potentially affected stakeholders, in particular marginalized groups and excluded individuals (including persons with disabilities), from fully participating in decisions that may affect them?',
        'grievances or objections from potentially affected stakeholders?',
        'risks of retaliation or reprisals against stakeholders who express concerns or grievances, or who seek to participate in or to obtain information on the project?'
      ]
    },
    {
      code: 'ESS9',
      title: 'Gender Mainstreaming',
      questions: [
        'raised gender equality concerns by women\'s groups/leaders (e.g. during the stakeholder engagement process, grievance processes, public statements)?',
        'adverse impacts on gender equality and/or the situation of women and girls?',
        'reproducing discriminations against women based on gender, especially regarding participation in design and implementation or access to opportunities and benefits?',
        'limitations on women\'s ability to use, develop and protect natural resources, taking into account different roles and positions of women and men in accessing environmental goods and services?',
        'exacerbation of risks of gender-based violence?'
      ]
    },
    {
      code: 'ESS10',
      title: 'Indigenous People',
      questions: [
        'areas where indigenous peoples are present (including project area of influence)?',
        'activities located on lands and territories claimed by indigenous peoples?',
        'impacts (positive or negative) to the human rights, lands, natural resources, territories, and traditional livelihoods of indigenous peoples (regardless of whether indigenous peoples possess the legal titles to such areas, whether the project is located within or outside of the lands and territories inhabited by the affected peoples, or whether the indigenous peoples are recognized as indigenous peoples by the country in question)?',
        'the absence of culturally appropriate consultations carried out with the objective of achieving free prior and informed consent (FPIC) on matters that may affect the rights and interests, lands, resources, territories and traditional livelihoods of the indigenous peoples concerned?',
        'adverse impacts on the development priorities of indigenous peoples as defined by them?',
        'risks to the physical and cultural survival of indigenous peoples?',
        'impacts on the Cultural Heritage of indigenous peoples, including through the commercialization or use of their traditional knowledge and practices? Consider, and where appropriate ensure, consistency with the answers under Standard 6 above.'
      ]
    }
  ];

  const toggleSection = (essCode) => {
    setExpandedSections(prev => ({
      ...prev,
      [essCode]: !prev[essCode]
    }));
  };

  const getQuestionKey = (essCode, questionIndex) => `${essCode}-${questionIndex}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Environmental and Social Risk Screening</h3>
        <p className="text-gray-600">Identify and plan mitigation for environmental and social risks</p>
      </div>

      {/* Environmental and Social Risk Tools */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center mb-4">
          <FileCheck className="h-6 w-6 text-blue-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">1. Environmental and Social Risk Management Tools</h4>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-700 mb-4">
              Complete the following environmental and social risk management tools as part of your application. 
              These will be submitted as separate documents with your application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Environmental and Social Risk Screening Tool (ESRST) Status *</label>
              <select {...register('esrstStatus')} className="form-input">
                <option value="">Select status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Started">Not Started</option>
              </select>
              {errors.esrstStatus && (
                <p className="form-error">{errors.esrstStatus.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">ESRST Risk Level Result</label>
              <select {...register('esrstRiskLevel')} className="form-input">
                <option value="">Select risk level</option>
                <option value="Low Risk">Low Risk</option>
                <option value="Medium Risk">Medium Risk</option>
                <option value="High Risk">High Risk</option>
              </select>
            </div>

            <div>
              <label className="form-label">Environmental and Social Risk Management Plan (ESRMP) Status *</label>
              <select {...register('esrmpStatus')} className="form-input">
                <option value="">Select status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Required">Not Required</option>
              </select>
              {errors.esrmpStatus && (
                <p className="form-error">{errors.esrmpStatus.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Gender Action Plan (GAP) Status *</label>
              <select {...register('gapStatus')} className="form-input">
                <option value="">Select status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Required">Not Required</option>
              </select>
              {errors.gapStatus && (
                <p className="form-error">{errors.gapStatus.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">Stakeholder Engagement Plan (SEP) Status *</label>
            <select {...register('sepStatus')} className="form-input">
              <option value="">Select status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Required">Not Required</option>
            </select>
            {errors.sepStatus && (
              <p className="form-error">{errors.sepStatus.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Environmental and Social Risk Summary</label>
            <textarea
              {...register('environmentalSocialRiskSummary')}
              className="form-input"
              rows="5"
              placeholder="Provide a summary of the key environmental and social risks identified through the screening process and how they will be managed."
            />
          </div>
        </div>
      </div>

      {/* ESSF Risk Assessment */}
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">2. Environmental and Social Safeguards Framework (ESSF) Risk Assessment</h4>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-red-100">
            <p className="text-sm text-gray-700">
              Complete the Environmental and Social Safeguards Framework risk assessment below. 
              For each question, indicate whether the project potentially involves or leads to the described risk, 
              rate the impact and likelihood, and provide any relevant notes.
            </p>
          </div>

          {/* ESS Sections */}
          {essData.map((ess) => (
            <div key={ess.code} className="border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => toggleSection(ess.code)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-t-lg"
              >
                <div className="text-left">
                  <h2 className="text-lg font-semibold text-gray-900">{ess.code}</h2>
                  <p className="text-sm text-gray-600">{ess.title}</p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    expandedSections[ess.code] ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSections[ess.code] && (
                <div className="p-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4 font-medium">
                    Would the project potentially involve or lead to:
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-left text-sm font-medium text-gray-700 w-1/2">
                            Guiding Questions on Risk and Impacts
                          </th>
                          <th className="border border-gray-300 p-3 text-center text-sm font-medium text-gray-700 w-20">
                            Yes/No
                          </th>
                          <th className="border border-gray-300 p-3 text-center text-sm font-medium text-gray-700 w-32">
                            Impact (1-5)
                          </th>
                          <th className="border border-gray-300 p-3 text-center text-sm font-medium text-gray-700 w-32">
                            Likelihood (1-5)
                          </th>
                          <th className="border border-gray-300 p-3 text-left text-sm font-medium text-gray-700 w-40">
                            Note
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ess.questions.map((question, index) => {
                          const questionKey = getQuestionKey(ess.code, index);
                          return (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-3 text-sm text-gray-700">
                                <span className="font-medium text-blue-600">{ess.code}-{index + 1}</span>
                                <span className="ml-2">{question}</span>
                              </td>
                              <td className="border border-gray-300 p-3 text-center">
                                <div className="flex justify-center space-x-2">
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name={`${questionKey}-response`}
                                      value="yes"
                                      className="mr-1"
                                      {...register(`${questionKey}-response`)}
                                    />
                                    <span className="text-xs">Yes</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name={`${questionKey}-response`}
                                      value="no"
                                      className="mr-1"
                                      {...register(`${questionKey}-response`)}
                                    />
                                    <span className="text-xs">No</span>
                                  </label>
                                </div>
                              </td>
                              <td className="border border-gray-300 p-3">
                                <select
                                  className="w-full p-1 border border-gray-300 rounded text-sm"
                                  {...register(`${questionKey}-impact`)}
                                >
                                  {riskOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="border border-gray-300 p-3">
                                <select
                                  className="w-full p-1 border border-gray-300 rounded text-sm"
                                  {...register(`${questionKey}-likelihood`)}
                                >
                                  {riskOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="border border-gray-300 p-3">
                                <textarea
                                  className="w-full p-1 border border-gray-300 rounded text-sm resize-none"
                                  rows="2"
                                  placeholder="Add notes..."
                                  {...register(`${questionKey}-note`)}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Clearance */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center mb-4">
          <Shield className="h-6 w-6 text-green-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">3. Environmental Clearance</h4>
        </div>

        <div className="space-y-4">
          <div>
            <label className="form-label">Environmental Clearance Required?</label>
            <select {...register('environmentalClearanceRequired')} className="form-input">
              <option value="">Select option</option>
              <option value="Yes">Yes - Required</option>
              <option value="No">No - Not Required</option>
              <option value="Pending">Pending Assessment</option>
            </select>
          </div>

          {watch('environmentalClearanceRequired') === 'Yes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Environmental Clearance Status</label>
                <select {...register('environmentalClearanceStatus')} className="form-input">
                  <option value="">Select status</option>
                  <option value="Obtained">Obtained</option>
                  <option value="Applied">Applied For</option>
                  <option value="Pending">Pending Application</option>
                </select>
              </div>

              <div>
                <label className="form-label">Expected Date of Clearance</label>
                <input
                  type="date"
                  {...register('environmentalClearanceDate')}
                  className="form-input"
                />
              </div>
            </div>
          )}

          <div>
            <label className="form-label">Environmental Clearance Notes</label>
            <textarea
              {...register('environmentalClearanceNotes')}
              className="form-input"
              rows="3"
              placeholder="Provide additional details about environmental clearance requirements or status"
            />
          </div>
        </div>
      </div>

      {/* Required Documents Reminder */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h5 className="font-medium text-gray-900 mb-3">Required Environmental and Social Documents</h5>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Environmental and Social Risk Screening Tool (ESRST) Results</li>
          <li>Environmental and Social Risk Management Plan (ESRMP)</li>
          <li>Gender Action Plan (GAP)</li>
          <li>Stakeholder Engagement Plan (SEP)</li>
          <li>Environmental Clearance letter (if applicable)</li>
        </ul>
        <p className="text-sm text-gray-600 mt-2">
          These documents will be uploaded in the final step of the application.
        </p>
      </div>
    </div>
  )
}

export default Step5RiskScreening 