"use client";

import React, { useState, useEffect } from 'react'; 

const QuizType = ({ onQuizTypeChange }) => {

    const quizTypeSettings = {
      GeneralKnowledge: {
        questions: 'questions/GeneralKnowledgeQuestions',
        containerBorder: 'border-pink-500/0',
        bgColor: 'bg-black/10',
        textColor: 'text-pink-500',
        borderColor: 'border-pink-500',
        newQuestionDay: 'Monday',
      },
      Music: {
        questions: 'questions/MusicQuestions',
        containerBorder: 'border-orange-500/50',
        bgColor: 'bg-black/10',
        textColor: 'text-orange-500',
        borderColor: 'border-orange-500',
        newQuestionDay: 'Tuesday',
      },
      Geography: {
        questions: 'questions/GeographyQuestions',
        containerBorder: 'border-green-500/50',
        bgColor: 'bg-black/20',
        textColor: 'text-green-500',
        borderColor: 'border-green-500',
        newQuestionDay: 'Wednesday',
      },
      Sport: {
        questions: 'questions/SportQuestions',
        containerBorder: 'border-blue-500/50',
        bgColor: 'bg-black/10',
        textColor: 'text-blue-500',
        borderColor: 'border-blue-500',
        newQuestionDay: 'Thursday',
      },
      History: {
        questions: 'questions/HistoryQuestions',
        containerBorder: 'border-purple-500/50',
        bgColor: 'bg-black/30',
        textColor: 'text-purple-500',
        borderColor: 'border-purple-500',
        newQuestionDay: 'Friday',
      },
      PopularCulture: {
        questions: 'questions/PopularCultureQuestions',
        containerBorder: 'border-yellow-500/50',
        bgColor: 'bg-black/40',
        textColor: 'text-yellow-500',
        borderColor: 'border-yellow-500',
        newQuestionDay: 'Saturday',
      },
      Science: {
        questions: 'questions/ScienceQuestions',
        containerBorder: 'border-teal-500/50',
        bgColor: 'bg-black/50',
        textColor: 'text-teal-500',
        borderColor: 'border-teal-500',
        newQuestionDay: 'Sunday',
      },
    };
  
    const [selectedQuizType, setSelectedQuizType] = useState('GeneralKnowledge');
    const [questions, setQuestions] = useState([]);
    const { bgColor, textColor, borderColor } = quizTypeSettings[selectedQuizType];
    

    useEffect(() => {
      // Load questions when the selected quiz type changes
      import(`./${quizTypeSettings[selectedQuizType].questions}`).then((module) => {
        setQuestions(module.default); 
      });
    }, [selectedQuizType]);

    const handleQuizTypeClick = (quizType) => {
        setSelectedQuizType(quizType);
        onQuizTypeChange(quizType, quizTypeSettings[quizType].containerBorder);
      };
  
      return (
        <>
        <div className="relative mt-10 flex flex-wrap justify-center items-center text-2xl">
          {Object.keys(quizTypeSettings).map((quizType) => (
            <button
              key={quizType}
              onClick={() => handleQuizTypeClick(quizType)}
              className={`${
                selectedQuizType === quizType ? `${bgColor} ${textColor} ${borderColor}` : 'bg-black/50 text-gray-500/30 border-gray-500/20'
              } text-center px-3 py-2 rounded border-2`}
              aria-selected={selectedQuizType === quizType}
            >
              {quizType.replace(/([a-z])([A-Z])/g, '$1 $2')} {/* Add space between camel case */}
            </button>
          ))}
        </div>
        <p className={`relative ${textColor} mt-2`}>
  New Questions Every <span className='text-pink-500'>{quizTypeSettings[selectedQuizType].newQuestionDay}</span></p>
 </>
      );    
            }  
  
  export default QuizType;