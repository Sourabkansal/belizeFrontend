import { useState, useEffect } from 'react'
import { Target, List, AlertCircle } from 'lucide-react'
import PrefilledField from '../PrefilledField'

const Step3ProjectGoals = ({ register, errors, setValue, getValues, watch, userData }) => {
  const [goalWordCount, setGoalWordCount] = useState(0)

  const countWords = (text) => {
    if (!text) return 0
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  useEffect(() => {
    const goalText = watch('projectGoalObjectives')
    setGoalWordCount(countWords(goalText))
  }, [watch('projectGoalObjectives')])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">C. Project Layout</h3>
        <p className="text-gray-600">Define your project goals, objectives, and expected outputs</p>
      </div>

      {/* Project Goals Section */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Target className="h-6 w-6 text-blue-600 mr-2" />
            <h4 className="text-xl font-semibold text-gray-900">1. Project Goal, Objectives and Expected Outputs (max-500 words)</h4>
          </div>
          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
            goalWordCount > 500 ? 'bg-red-100 text-red-700' : 
            goalWordCount > 450 ? 'bg-yellow-100 text-yellow-700' : 
            'bg-green-100 text-green-700'
          }`}>
            {goalWordCount} / 500 words
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <h5 className="font-medium text-gray-900 mb-2">This section should contain a clear and specific statement of what the proposed project will accomplish. This section should include:</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>A detailed presentation and analysis of the problem/threats or issue to be addressed (problem statement)</li>
              <li>The rationale of the project. This should explain the reasoning behind the need for the project. Demonstrate the relevance of the project to the threats identified. It should also explain the reasons and interest of developing a partnership with other organizations such as government agencies, NGO's, or community organizations for the project implementation</li>
              <li>The Goal - The desired state the project is aiming to achieve</li>
              <li>The Impact of the project – What will be the long–term and overarching benefits of your project?</li>
              <li>The Objectives - What do you plan to achieve by the end of your project?</li>
              <li>The Outcomes of the project - What are the intended short and medium-term changes that can be directly attributed to the project and result from the achievement of the planned outputs?</li>
              <li>The Outputs - What are specific products, goods, and services created through the implementation of several project activities?</li>
              <li>The Activities that the project will conduct. How will the activities provide the desired solutions?</li>
            </ul>
          </div>

          <div>
            <label className="form-label">Project Goal, Objectives and Expected Outputs * (Maximum 500 words)</label>
            <textarea
              {...register('projectGoalObjectives')}
              className="form-input min-h-[400px]"
              placeholder="Provide a comprehensive description covering all the points listed above..."
            />
            {errors.projectGoalObjectives && (
              <p className="form-error">{errors.projectGoalObjectives.message}</p>
            )}
            {goalWordCount > 500 && (
              <p className="text-red-600 text-sm mt-1">
                ⚠️ Content exceeds 500-word limit. Please reduce by {goalWordCount - 500} words.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Logical Framework Section */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center mb-4">
          <List className="h-6 w-6 text-green-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">LOGICAL FRAMEWORK</h4>
        </div>

        <div className="space-y-6">
          {/* Project Goal */}
          <div>
            <label className="form-label">Goal:</label>
            <textarea
              {...register('logicalFrameworkGoal')}
              className="form-input"
              rows="3"
              placeholder="State the overall goal your project aims to achieve"
            />
            {errors.logicalFrameworkGoal && (
              <p className="form-error">{errors.logicalFrameworkGoal.message}</p>
            )}
          </div>

          {/* OUTCOMES TABLE */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="text-lg font-semibold text-gray-900 mb-3 bg-teal-100 p-2 rounded">OUTCOMES</h5>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-teal-600 text-white">
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Interventions</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Statement</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Indicators</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Baselines</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Targets</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Means of Verification</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Responsible Party (Lead Agency)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-teal-100">OUTCOME 1</td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('outcome1Statement')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                    />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('outcome1Indicators')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                          <textarea
                        {...register('outcome1Baseline')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                          <textarea
                        {...register('outcome1Targets')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                          <textarea
                        {...register('outcome1Verification')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                          <textarea
                        {...register('outcome1ResponsibleParty')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
                        </div>
                      </div>

          {/* OUTPUTS TABLE */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="text-lg font-semibold text-gray-900 mb-3 bg-teal-100 p-2 rounded">OUTPUTS</h5>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-teal-600 text-white">
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Interventions</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Statement</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Indicators</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Baselines</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Targets</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Means of Verification</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Responsible Party (Lead Agency)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* OUTPUT 1 */}
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-teal-100">OUTPUT 1</td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output1Statement')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output1Indicators')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output1Baseline')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output1Targets')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output1Verification')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output1ResponsibleParty')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                  </tr>

                  {/* OUTPUT 2 */}
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-teal-100">OUTPUT 2</td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output2Statement')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs font-medium text-gray-600">1.1 [Indicator text]</label>
                          <textarea
                            {...register('output2Indicator1')}
                            className="w-full p-1 text-xs border border-gray-200 rounded resize-none"
                            rows="2"
                            placeholder=""
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600">1.2 [Optional]</label>
                          <textarea
                            {...register('output2Indicator2')}
                            className="w-full p-1 text-xs border border-gray-200 rounded resize-none"
                            rows="2"
                            placeholder=""
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600">1.3 [Optional]</label>
                          <textarea
                            {...register('output2Indicator3')}
                            className="w-full p-1 text-xs border border-gray-200 rounded resize-none"
                            rows="2"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output2Baseline')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output2Targets')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output2Verification')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output2ResponsibleParty')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                  </tr>

                  {/* OUTPUT 3 */}
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-teal-100">OUTPUT 3<br/>[optional]</td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output3Statement')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output3Indicators')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output3Baseline')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output3Targets')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output3Verification')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output3ResponsibleParty')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                  </tr>

                  {/* OUTPUT 4 */}
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-teal-100">OUTPUT 4<br/>[optional]</td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output4Statement')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output4Indicators')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output4Baseline')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output4Targets')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output4Verification')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output4ResponsibleParty')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                  </tr>

                  {/* OUTPUT 5 */}
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-teal-100">OUTPUT 5<br/>[optional]</td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output5Statement')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('output5Indicators')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                          <textarea
                        {...register('output5Baseline')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                          <textarea
                        {...register('output5Targets')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                          <textarea
                        {...register('output5Verification')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                          <textarea
                        {...register('output5ResponsibleParty')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
                        </div>
                      </div>

          {/* ASSUMPTIONS TABLE */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="text-lg font-semibold text-gray-900 mb-3 bg-teal-100 p-2 rounded">ASSUMPTIONS</h5>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-teal-600 text-white">
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Interventions</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Statement</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Indicators</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Baselines</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Targets</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Means of Verification</th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Responsible Party (Lead Agency)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-teal-100">[optional]</td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('assumptions1Statement')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('assumptions1Indicators')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('assumptions1Baseline')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('assumptions1Targets')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('assumptions1Verification')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('assumptions1ResponsibleParty')}
                        className="w-full p-2 text-sm border border-gray-200 rounded resize-none"
                        rows="3"
                        placeholder=""
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-3 italic">
              Insert rows as needed.
            </p>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            <strong>Note:</strong> Each table follows the format: Intervention | Statement | Indicators | Baselines, Benchmarks, Targets | Means of Verification | Responsible Party (Lead Agency). Each indicator should have its own individual row for better reporting and dashboard integration.
          </p>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Important Notes:</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Ensure all objectives are SMART (Specific, Measurable, Achievable, Relevant, Time-bound)</li>
              <li>• Indicators should be quantifiable and verifiable</li>
              <li>• The logical framework should align with your project's thematic area</li>
              <li>• Adapt the number of objectives and outputs based on your project design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3ProjectGoals 