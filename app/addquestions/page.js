"use client";

import { useState } from 'react';
import { postQuestionData } from "@/apiClient";

const correctPassword = process.env.NEXT_PUBLIC_PASSKEY;

const quizTypes = [
  'GeneralKnowledge',
  'Music',
  'Geography',
  'Sport',
  'History',
  'PopularCulture',
  'Science'
];

export default function AddQuestion() {
  const [quizType, setQuizType] = useState('');
  const [quizDate, setQuizDate] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    if (password === correctPassword) {
      setIsPasswordCorrect(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  if (!isPasswordCorrect) {
    return (
      <form onSubmit={handleSubmitPassword} className='relative'>
        <label htmlFor="password">Enter Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    );
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions(prevOptions => [...prevOptions, '']);
  };

  const handleRemoveOption = index => {
    setOptions(prevOptions => prevOptions.filter((_, i) => i !== index));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = {
      quizType,
      quizDate,
      question,
      options,
      correctAnswer
    };

    try {
      const response = await postQuestionData(data);
      alert('Question added:', response.data);

      setQuizType('');
      setQuizDate('');
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
    } catch (error) {
      alert('Error adding question:', error);
    }
  };

  return (
    <div className='fixed flex flex-col w-full justify-center items-center'>
    <div className={`mt-40 mb-20 border-2 border-pink-500 bg-black/50 p-5`}>
    <div className='text-pink-500'>
      <h1 className='text-2xl font-bold mb-4'>Add Question</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
              <label htmlFor="quizType" className='block mb-2'>Quiz Type:</label>
              <select
                id="quizType"
                value={quizType}
                onChange={e => setQuizType(e.target.value)}
                required
                className='input text-black'
              >
                <option value="">Select Quiz Type</option>
                {quizTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
        <div>
          <label htmlFor="quizDate" className='block mb-2'>Quiz Date:</label>
          <input
            type="text"
            id="quizDate"
            value={quizDate}
            onChange={e => setQuizDate(e.target.value)}
            required
            className='input text-black'
          />
        </div>
        <div>
          <label htmlFor="question" className='block mb-2'>Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            required
            className='input text-black'
          />
        </div>
        <div>
          <label className='block mb-2'>Options:</label>
          {options.map((option, index) => (
            <div key={index} className='flex items-center space-x-2'>
              <input
                type="text"
                value={option}
                onChange={e => handleOptionChange(index, e.target.value)}
                required
                className='input text-black'
              />
              {index > 3 && (
                <button type="button" onClick={() => handleRemoveOption(index)} className='btn btn-red'>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddOption} className='hidden btn btn-green'>
            Add Option
          </button>
        </div>
        <div>
          <label htmlFor="correctAnswer" className='block  mb-2'>Correct Answer:</label>
          <input
            type="text"
            id="correctAnswer"
            value={correctAnswer}
            onChange={e => setCorrectAnswer(e.target.value)}
            required
            className='input text-black'
          />
        </div>
        <button type="submit" className='btn btn-blue text-green-500 border-2 border-green-500 p-2 rounded-full'>Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
}
