import { useState, useEffect } from 'react'
import { BarChart3, Target, Lock } from 'lucide-react'
import PrefilledField from '../PrefilledField'

const Step6MonitoringEvaluation = ({ register, errors, setValue, getValues, watch, userData }) => {
  const [meWordCount, setMeWordCount] = useState(0)
  const [isAutoPopulated, setIsAutoPopulated] = useState(false)

  const countWords = (text) => {
    if (!text) return 0
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  useEffect(() => {
    const meText = watch('monitoringEvaluationPlan')
    setMeWordCount(countWords(meText))
  }, [watch('monitoringEvaluationPlan')])

  // Auto-populate M&E section from Logical Framework data on component mount
  useEffect(() => {
    if (!isAutoPopulated && hasLogicalFrameworkData()) {
      autoPopulateFromLogicalFramework()
    }
  }, [])

  // Auto-populate M&E section from Logical Framework data
  const autoPopulateFromLogicalFramework = () => {
    try {
      const formData = getValues()
      
      // Extract Logical Framework data
      const logicalFrameworkGoal = formData.logicalFrameworkGoal || ''
      
      // Extract Outcomes data
      const outcome1Statement = formData.outcome1Statement || ''
      const outcome1Indicators = formData.outcome1Indicators || ''
      const outcome1Baseline = formData.outcome1Baseline || ''
      const outcome1Targets = formData.outcome1Targets || ''
      const outcome1Verification = formData.outcome1Verification || ''
      const outcome1ResponsibleParty = formData.outcome1ResponsibleParty || ''

      // Extract Outputs data
      const outputs = [
        {
          statement: formData.output1Statement || '',
          indicators: formData.output1Indicators || '',
          baseline: formData.output1Baseline || '',
          targets: formData.output1Targets || '',
          verification: formData.output1Verification || '',
          responsibleParty: formData.output1ResponsibleParty || ''
        },
        {
          statement: formData.output2Statement || '',
          indicators: [
            formData.output2Indicator1,
            formData.output2Indicator2,
            formData.output2Indicator3
          ].filter(Boolean).join('; '),
          baseline: formData.output2Baseline || '',
          targets: formData.output2Targets || '',
          verification: formData.output2Verification || '',
          responsibleParty: formData.output2ResponsibleParty || ''
        },
        {
          statement: formData.output3Statement || '',
          indicators: formData.output3Indicators || '',
          baseline: formData.output3Baseline || '',
          targets: formData.output3Targets || '',
          verification: formData.output3Verification || '',
          responsibleParty: formData.output3ResponsibleParty || ''
        },
        {
          statement: formData.output4Statement || '',
          indicators: formData.output4Indicators || '',
          baseline: formData.output4Baseline || '',
          targets: formData.output4Targets || '',
          verification: formData.output4Verification || '',
          responsibleParty: formData.output4ResponsibleParty || ''
        },
        {
          statement: formData.output5Statement || '',
          indicators: formData.output5Indicators || '',
          baseline: formData.output5Baseline || '',
          targets: formData.output5Targets || '',
          verification: formData.output5Verification || '',
          responsibleParty: formData.output5ResponsibleParty || ''
        }
      ].filter(output => output.statement || output.indicators)

      // Auto-populate basic project info
      // Note: meProjectGoal and recipientOrganization are NOT auto-populated - user fills manually

      // Create objectives list from outcomes and outputs
      let objectivesList = []
      if (outcome1Statement) {
        objectivesList.push(`1. ${outcome1Statement}`)
      }
      outputs.forEach((output, index) => {
        if (output.statement) {
          objectivesList.push(`${index + 2}. ${output.statement}`)
        }
      })
      
      if (objectivesList.length > 0) {
        setValue('meProjectObjectives', objectivesList.join('\n'))
      }

      // Auto-populate Indicator 1 from Outcome 1
      if (outcome1Statement || outcome1Indicators) {
        setValue('indicator1Outcome', outcome1Statement)
        setValue('indicator1Description', outcome1Indicators)
        setValue('indicator1Baseline', outcome1Baseline)
        setValue('indicator1Target', outcome1Targets)
        setValue('indicator1Verification', outcome1Verification)
        setValue('indicator1Responsible', outcome1ResponsibleParty)
        setValue('indicator1Frequency', 'Quarterly') // Default frequency
      }

      // Auto-populate Indicator 2 from first available Output
      const firstOutput = outputs.find(output => output.statement || output.indicators)
      if (firstOutput) {
        setValue('indicator2Outcome', firstOutput.statement)
        setValue('indicator2Description', firstOutput.indicators)
        setValue('indicator2Baseline', firstOutput.baseline)
        setValue('indicator2Target', firstOutput.targets)
        setValue('indicator2Verification', firstOutput.verification)
        setValue('indicator2Responsible', firstOutput.responsibleParty)
        setValue('indicator2Frequency', 'Monthly') // Default frequency
      }

      // Auto-populate Indicator 3 from second available Output
      const secondOutput = outputs.length > 1 ? outputs[1] : null
      if (secondOutput && (secondOutput.statement || secondOutput.indicators)) {
        setValue('indicator3Outcome', secondOutput.statement)
        setValue('indicator3Description', secondOutput.indicators)
        setValue('indicator3Baseline', secondOutput.baseline)
        setValue('indicator3Target', secondOutput.targets)
        setValue('indicator3Verification', secondOutput.verification)
        setValue('indicator3Responsible', secondOutput.responsibleParty)
        setValue('indicator3Frequency', 'Quarterly') // Default frequency
      }

      // Note: Monitoring and Evaluation Plan is NOT auto-generated - user fills manually

      setIsAutoPopulated(true)

    } catch (error) {
      console.error('Error auto-populating M&E section:', error)
    }
  }

  // Generate M&E Plan text based on Logical Framework data
  const generateMEPlanText = (goal, outcome, outputs) => {
    let planText = ''
    
    if (goal) {
      planText += `This Monitoring and Evaluation (M&E) plan is designed to track progress towards achieving the project goal: ${goal}\n\n`
    }

    planText += `MONITORING APPROACH:\n`
    planText += `• Performance will be monitored on a monthly basis for outputs and quarterly for outcomes\n`
    planText += `• Key indicators from the Logical Framework will be tracked systematically\n`
    planText += `• Data collection will involve both quantitative measurements and qualitative assessments\n`
    planText += `• Regular progress reports will be generated for stakeholders and funders\n\n`

    planText += `IMPACT ASSESSMENT:\n`
    if (outcome) {
      planText += `• Primary outcome measurement: ${outcome}\n`
    }
    planText += `• Baseline data will be collected at project start for all key indicators\n`
    planText += `• Impact will be assessed through before-and-after comparisons\n`
    planText += `• Stakeholder feedback will be incorporated through surveys and interviews\n\n`

    planText += `ALIGNMENT WITH BELIZE FUND MANAGEMENT:\n`
    planText += `• All indicators align with Belize Fund Management's programmatic metrics\n`
    planText += `• Reporting will follow Belize Fund Management's standard formats and timelines\n`
    planText += `• Data will be disaggregated by gender and other relevant demographics where applicable\n`
    planText += `• Regular coordination meetings will ensure alignment with fund priorities`

    return planText.length > 500 ? planText.substring(0, 497) + '...' : planText
  }

  // Check if Logical Framework data is available
  const hasLogicalFrameworkData = () => {
    const formData = getValues()
    return formData.logicalFrameworkGoal || 
           formData.outcome1Statement || 
           formData.output1Statement || 
           formData.output2Statement
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Monitoring and Evaluation</h3>
        <p className="text-gray-600">M&E framework automatically generated from your Logical Framework</p>
        
        {/* Auto-populated Status */}
        {isAutoPopulated && (
          <div className="mt-4 flex items-center justify-center space-x-2">
            <Lock className="h-4 w-4 text-green-600" />
            <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
              M&E Framework Auto-Generated from Logical Framework
            </span>
          </div>
        )}
      </div>

      {/* M&E Plan Overview */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
            <h4 className="text-xl font-semibold text-gray-900">Monitoring and Evaluation Plan</h4>
          </div>
          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
            meWordCount > 500 ? 'bg-red-100 text-red-700' : 
            meWordCount > 450 ? 'bg-yellow-100 text-yellow-700' : 
            'bg-green-100 text-green-700'
          }`}>
            {meWordCount} / 500 words
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <h5 className="font-medium text-gray-900 mb-2">Key issues addressed:</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>How and at what frequency project performance will be monitored</li>
              <li>How project impact will be assessed in terms of achieving desired outcomes and objectives</li>
              <li>Alignment with Belize Fund Management's programmatic metrics</li>
              <li>Indicators directly extracted from your Logical Framework</li>
            </ul>
          </div>

          <div>
            <label className="form-label">Monitoring and Evaluation Plan * (Maximum 500 words)</label>
            <textarea
              {...register('monitoringEvaluationPlan')}
              className="form-input min-h-[300px]"
              placeholder="Explain how your project team will track progress, including monitoring frequency, impact assessment methods, and alignment with Belize Fund Management programmatic metrics..."
            />
            {errors.monitoringEvaluationPlan && (
              <p className="form-error">{errors.monitoringEvaluationPlan.message}</p>
            )}
            {meWordCount > 500 && (
              <p className="text-red-600 text-sm mt-1">
                ⚠️ M&E Plan exceeds 500-word limit. Please reduce by {meWordCount - 500} words.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* M&E Framework */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center mb-4">
          <Target className="h-6 w-6 text-green-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">Project M&E Framework</h4>
          {isAutoPopulated && <Lock className="h-4 w-4 text-gray-500 ml-2" />}
        </div>

        <div className="space-y-6">
          {/* Basic Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Recipient Organization *</label>
              <input
                type="text"
                {...register('recipientOrganization')}
                className="form-input"
                placeholder="Lead implementing organization"
              />
              {errors.recipientOrganization && (
                <p className="form-error">{errors.recipientOrganization.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Project Goal *</label>
              <textarea
                {...register('meProjectGoal')}
                className="form-input"
                rows="2"
                placeholder="State the project goal for M&E tracking"
              />
              {errors.meProjectGoal && (
                <p className="form-error">{errors.meProjectGoal.message}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="form-label">Project Objectives * (From Outcomes & Outputs)</label>
              {isAutoPopulated && <Lock className="h-4 w-4 text-gray-500" />}
            </div>
            <textarea
              {...register('meProjectObjectives')}
              className="form-input bg-gray-50"
              rows="3"
              placeholder="Auto-populated from Logical Framework Outcomes and Outputs"
              readOnly={isAutoPopulated}
              disabled={isAutoPopulated}
            />
            {errors.meProjectObjectives && (
              <p className="form-error">{errors.meProjectObjectives.message}</p>
            )}
          </div>

          {/* Indicator 1 */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <div className="flex items-center space-x-2 mb-4">
              <h5 className="font-semibold text-gray-900">Key Indicator 1 (From Outcome 1)</h5>
              {isAutoPopulated && <Lock className="h-4 w-4 text-gray-500" />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Outcome/Output</label>
                <textarea
                  {...register('indicator1Outcome')}
                  className="form-input bg-gray-50"
                  rows="2"
                  placeholder="Auto-populated from Outcome 1"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Indicator</label>
                <textarea
                  {...register('indicator1Description')}
                  className="form-input bg-gray-50"
                  rows="2"
                  placeholder="Auto-populated from Outcome 1 Indicators"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Baseline</label>
                <input
                  type="text"
                  {...register('indicator1Baseline')}
                  className="form-input bg-gray-50"
                  placeholder="Auto-populated from Outcome 1 Baseline"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Target</label>
                <input
                  type="text"
                  {...register('indicator1Target')}
                  className="form-input bg-gray-50"
                  placeholder="Auto-populated from Outcome 1 Targets"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Responsible Party</label>
                <input
                  type="text"
                  {...register('indicator1Responsible')}
                  className="form-input bg-gray-50"
                  placeholder="Auto-populated from Outcome 1"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Means of Verification</label>
                <input
                  type="text"
                  {...register('indicator1Verification')}
                  className="form-input bg-gray-50"
                  placeholder="Auto-populated from Outcome 1"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Monitoring Frequency</label>
                <select 
                  {...register('indicator1Frequency')} 
                  className="form-input bg-gray-50"
                  disabled={isAutoPopulated}
                >
                  <option value="">Select frequency</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-annually">Semi-annually</option>
                  <option value="Annually">Annually</option>
                  <option value="End of project">End of project</option>
                </select>
              </div>
            </div>
          </div>

          {/* Indicator 2 */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <div className="flex items-center space-x-2 mb-4">
              <h5 className="font-semibold text-gray-900">Key Indicator 2 (From First Output)</h5>
              {isAutoPopulated && <Lock className="h-4 w-4 text-gray-500" />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Outcome/Output</label>
                <textarea
                  {...register('indicator2Outcome')}
                  className="form-input bg-gray-50"
                  rows="2"
                  placeholder="Auto-populated from First Output"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Indicator</label>
                <textarea
                  {...register('indicator2Description')}
                  className="form-input bg-gray-50"
                  rows="2"
                  placeholder="Auto-populated from First Output Indicators"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Baseline</label>
                <input
                  type="text"
                  {...register('indicator2Baseline')}
                  className="form-input bg-gray-50"
                  placeholder="Auto-populated from First Output Baseline"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Target</label>
                <input
                  type="text"
                  {...register('indicator2Target')}
                  className="form-input bg-gray-50"
                  placeholder="Auto-populated from First Output Targets"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Responsible Party</label>
                <input
                  type="text"
                  {...register('indicator2Responsible')}
                  className="form-input bg-gray-50"
                  placeholder="Auto-populated from First Output"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Means of Verification</label>
                <input
                  type="text"
                  {...register('indicator2Verification')}
                  className="form-input bg-gray-50"
                  placeholder="Auto-populated from First Output"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Monitoring Frequency</label>
                <select 
                  {...register('indicator2Frequency')} 
                  className="form-input bg-gray-50"
                  disabled={isAutoPopulated}
                >
                  <option value="">Select frequency</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-annually">Semi-annually</option>
                  <option value="Annually">Annually</option>
                  <option value="End of project">End of project</option>
                </select>
              </div>
            </div>
          </div>

          {/* Indicator 3 */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <div className="flex items-center space-x-2 mb-4">
              <h5 className="font-semibold text-gray-900">Key Indicator 3 (From Second Output)</h5>
              {isAutoPopulated && <Lock className="h-4 w-4 text-gray-500" />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Outcome/Output</label>
                <textarea
                  {...register('indicator3Outcome')}
                  className="form-input bg-gray-50"
                  rows="2"
                  placeholder="Auto-populated from Second Output"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Indicator</label>
                <textarea
                  {...register('indicator3Description')}
                  className="form-input bg-gray-50"
                  rows="2"
                  placeholder="Auto-populated from Second Output Indicators"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Baseline</label>
                <input
                  type="text"
                  {...register('indicator3Baseline')}
                  className="form-input bg-gray-50"
                  placeholder="Auto-populated from Second Output Baseline"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Target</label>
                <input
                  type="text"
                  {...register('indicator3Target')}
                  className="form-input bg-gray-50"
                  placeholder="Auto-populated from Second Output Targets"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Responsible Party</label>
                <input
                  type="text"
                  {...register('indicator3Responsible')}
                  className="form-input bg-gray-50"
                  placeholder="Auto-populated from Second Output"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Means of Verification</label>
                <input
                  type="text"
                  {...register('indicator3Verification')}
                  className="form-input bg-gray-50"
                  placeholder="Auto-populated from Second Output"
                  readOnly={isAutoPopulated}
                  disabled={isAutoPopulated}
                />
              </div>
              <div>
                <label className="form-label">Monitoring Frequency</label>
                <select 
                  {...register('indicator3Frequency')} 
                  className="form-input bg-gray-50"
                  disabled={isAutoPopulated}
                >
                  <option value="">Select frequency</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-annually">Semi-annually</option>
                  <option value="Annually">Annually</option>
                  <option value="End of project">End of project</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h5 className="font-medium text-gray-900 mb-3">M&E Auto-Generation Information</h5>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>M&E indicators are automatically extracted and aligned with your Logical Framework</li>
          <li>All indicators maintain SMART criteria (Specific, Measurable, Achievable, Relevant, Time-bound)</li>
          <li>Baseline data and targets are directly mapped from your project design</li>
          <li>Monitoring frequencies are optimized for effective project tracking</li>
          <li>The M&E indicators ensure full alignment with Belize Fund Management requirements</li>
          <li><strong>M&E Plan field is manually filled by the user to describe their specific monitoring approach</strong></li>
          <li><strong>Other fields are locked to maintain consistency with your Logical Framework</strong></li>
        </ul>
      </div>
    </div>
  )
}

export default Step6MonitoringEvaluation 