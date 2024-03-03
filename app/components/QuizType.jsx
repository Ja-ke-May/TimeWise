"use client";

import React, { useState } from 'react'; 

const QuizType = ({ onQuizTypeChange }) => {

    const quizTypeSettings = {
      GeneralKnowledge: {
        questions: '/GeneralKnowledgeQuestions',
        containerBorder: 'border-pink-500/0',
        bgColor: 'bg-black/10',
        textColor: 'text-pink-500',
        borderColor: 'border-pink-500',
      },
      Music: {
        questions: '/MusicQuestions',
        containerBorder: 'border-orange-500/50',
        bgColor: 'bg-black/10',
        textColor: 'text-orange-500',
        borderColor: 'border-orange-500',
      },
      Sport: {
        questions: '/SportQuestions',
        containerBorder: 'border-blue-500/50',
        bgColor: 'bg-black/10',
        textColor: 'text-blue-500',
        borderColor: 'border-blue-500',
      },
      Geography: {
        questions: '/GeographyQuestions',
        containerBorder: 'border-green-500/50',
        bgColor: 'bg-black/20',
        textColor: 'text-green-500',
        borderColor: 'border-green-500',
      },
      History: {
        questions: '/HistoryQuestions',
        containerBorder: 'border-purple-500/50',
        bgColor: 'bg-black/30',
        textColor: 'text-purple-500',
        borderColor: 'border-purple-500',
      },
      PopularCulture: {
        questions: '/PopularCultureQuestions',
        containerBorder: 'border-yellow-500/50',
        bgColor: 'bg-black/40',
        textColor: 'text-yellow-500',
        borderColor: 'border-yellow-500',
      },
      Science: {
        questions: '/ScienceQuestions',
        containerBorder: 'border-teal-500/50',
        bgColor: 'bg-black/50',
        textColor: 'text-teal-500',
        borderColor: 'border-teal-500',
      },
    };
  
    const [selectedQuizType, setSelectedQuizType] = useState('GeneralKnowledge');
  
    const { bgColor, textColor, borderColor } = quizTypeSettings[selectedQuizType];

    const handleQuizTypeClick = (quizType) => {
        setSelectedQuizType(quizType);
        onQuizTypeChange(quizType, quizTypeSettings[quizType].containerBorder);
      };
  
      return (
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
      );    
            }  
  
  export default QuizType;