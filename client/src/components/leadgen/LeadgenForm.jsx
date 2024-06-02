//TODO: add validation of questions structure before adding new leadgen.
import React, { useState, useEffect ,useRef} from 'react';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import { createLeadgenAction } from '@/pages/leadgens/NewLeadgenPage';
const getInitialFormData = () => {
  const savedFormData = localStorage.getItem('leadgenFormData');
  return savedFormData ? JSON.parse(savedFormData) : {
    title: '',
    flowName: '',
    questions: [{ text: '', code: '', step: 0, type: '', display_list_direction: '', answers: [{ text: '', next_question_code: '' }] }]
  };
};
const LeadgenForm = () => {
  const questionsRef = useRef(null);
  const actionData = useActionData();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState(getInitialFormData());

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    localStorage.setItem('leadgenFormData', JSON.stringify(formData));
  
  }, [formData]);

  useEffect(() => {
    // Set action data errors to formErrors state
    if (actionData?.error) {
      setFormErrors(actionData.error);
    }
  }, [actionData]);
  useEffect(() => {
    // Update the hidden input value whenever questions change
    if (questionsRef.current) {
      questionsRef.current.value = JSON.stringify(formData.questions);
    }
  }, [formData.questions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;
    setFormData((prevData) => ({ ...prevData, questions: updatedQuestions }));
  };

  const handleAnswerChange = (questionIndex, answerIndex, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].answers[answerIndex][field] = value;
    setFormData((prevData) => ({ ...prevData, questions: updatedQuestions }));
  };

  const addQuestion = () => {
    setFormData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, { text: '', code: '', step: 0, type: '', display_list_direction: '', answers: [{ text: '', next_question_code: '' }] }]
    }));
  };

  const addAnswer = (questionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].answers.push({ text: '', next_question_code: '' });
    setFormData((prevData) => ({ ...prevData, questions: updatedQuestions }));
  };

  const clearForm = () => {
    setFormData({
      title: '',
      flowName: '',
      questions: [{ text: '', code: '', step: 0, type: '', display_list_direction: '', answers: [{ text: '', next_question_code: '' }] }]
    });
    setFormErrors({});
    localStorage.removeItem('leadgenFormData');
  };
  
 
  return (
    <Form method='post'  >
      {actionData?.error && <div className="error">{actionData.error}</div>}
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleInputChange}
        />
        {formErrors.title && <div className="error">{formErrors.title}</div>}
      </div>

      <div>
        <label htmlFor="flowName">Flow Name</label>
        <input
          type="text"
          name="flowName"
          required
          value={formData.flowName}
          onChange={handleInputChange}
        />
        {formErrors.flowName && <div className="error">{formErrors.flowName}</div>}
      </div>

      {formData.questions.map((question, qIndex) => (
        <div key={qIndex}>
          <h4>Question {qIndex + 1}</h4>
          <div>
            <label>Text</label>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
            />
            {formErrors[`questionText${qIndex}`] && <div className="error">{formErrors[`questionText${qIndex}`]}</div>}
          </div>
          <div>
            <label>Code</label>
            <input
              type="text"
              value={question.code}
              onChange={(e) => handleQuestionChange(qIndex, 'code', e.target.value)}
            />
            {formErrors[`questionCode${qIndex}`] && <div className="error">{formErrors[`questionCode${qIndex}`]}</div>}
          </div>
          <div>
            <label>Step</label>
            <input
              type="number"
              value={question.step}
              onChange={(e) => handleQuestionChange(qIndex, 'step', parseInt(e.target.value, 10))}
            />
            {formErrors[`questionStep${qIndex}`] && <div className="error">{formErrors[`questionStep${qIndex}`]}</div>}
          </div>
          <div>
            <label>Type</label>
            <input
              type="text"
              value={question.type}
              onChange={(e) => handleQuestionChange(qIndex, 'type', e.target.value)}
            />
            {formErrors[`questionType${qIndex}`] && <div className="error">{formErrors[`questionType${qIndex}`]}</div>}
          </div>
          <div>
            <label>Display List Direction</label>
            <input
              type="text"
              value={question.display_list_direction}
              onChange={(e) => handleQuestionChange(qIndex, 'display_list_direction', e.target.value)}
            />
            {formErrors[`questionDisplayListDirection${qIndex}`] && <div className="error">{formErrors[`questionDisplayListDirection${qIndex}`]}</div>}
          </div>

          {question.answers.map((answer, aIndex) => (
            <div key={aIndex}>
              <h5>Answer {aIndex + 1}</h5>
              <div>
                <label>Text</label>
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) => handleAnswerChange(qIndex, aIndex, 'text', e.target.value)}
                />
                {formErrors[`answerText${qIndex}-${aIndex}`] && <div className="error">{formErrors[`answerText${qIndex}-${aIndex}`]}</div>}
              </div>
              <div>
                <label>Next Question Code</label>
                <input
                  type="text"
                  value={answer.next_question_code}
                  onChange={(e) => handleAnswerChange(qIndex, aIndex, 'next_question_code', e.target.value)}
                />
                {formErrors[`answerNextQuestionCode${qIndex}-${aIndex}`] && <div className="error">{formErrors[`answerNextQuestionCode${qIndex}-${aIndex}`]}</div>}
              </div>
            </div>
          ))}

          <button type="button" onClick={() => addAnswer(qIndex)}>Add Answer</button>
        </div>
      ))}

      <button type="button" onClick={addQuestion}>Add Question</button>
      <input ref={questionsRef} type="hidden" name="questions" />
      <div>
      <button type="button" onClick={clearForm}>Clear Fields</button>

      <button type="submit">Submit</button>

      </div>
    </Form>
  );
};

export default LeadgenForm;
