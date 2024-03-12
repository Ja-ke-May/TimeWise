"use client";

import React, { useState, useEffect } from 'react'; 

const QuizType = ({ onQuizTypeChange }) => {

  const getQuizStartDate = (dayOfWeek) => {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); 
    const daysUntilNextQuiz = (dayOfWeek - currentDayOfWeek - 7) % 7;

    const nextQuizStartDate = new Date(currentDate);
    nextQuizStartDate.setDate(currentDate.getDate() + daysUntilNextQuiz);

    const formattedDate = nextQuizStartDate.toLocaleDateString('en-UK', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });

    return formattedDate;
  };

    const quizTypeSettings = {
      GeneralKnowledge: {
        containerBorder: 'border-pink-500/0 rounded',
        bgColor: 'bg-black/10',
        textColor: 'text-pink-500',
        borderColor: 'border-pink-500',
        newQuestionDay: 'Monday',
        quizStartDate: getQuizStartDate(1),
      },
      Music: {
        containerBorder: 'border-orange-500/50 rounded',
        bgColor: 'bg-black/10',
        textColor: 'text-orange-500',
        borderColor: 'border-orange-500',
        newQuestionDay: 'Tuesday',
        quizStartDate: getQuizStartDate(2),
      },
      Geography: {
        containerBorder: 'border-green-500/50 rounded',
        bgColor: 'bg-black/20',
        textColor: 'text-green-500',
        borderColor: 'border-green-500',
        newQuestionDay: 'Wednesday',
        quizStartDate: getQuizStartDate(3),
      },
      Sport: {
        containerBorder: 'border-blue-500/50 rounded',
        bgColor: 'bg-black/10',
        textColor: 'text-blue-500',
        borderColor: 'border-blue-500',
        newQuestionDay: 'Thursday',
        quizStartDate: getQuizStartDate(4),
      },
      History: {
        containerBorder: 'border-purple-500/50 rounded',
        bgColor: 'bg-black/30',
        textColor: 'text-purple-500',
        borderColor: 'border-purple-500',
        newQuestionDay: 'Friday',
        quizStartDate: getQuizStartDate(5),
      },
      PopularCulture: {
        containerBorder: 'border-yellow-500/50 rounded',
        bgColor: 'bg-black/40',
        textColor: 'text-yellow-500',
        borderColor: 'border-yellow-500',
        newQuestionDay: 'Saturday',
        quizStartDate: getQuizStartDate(6),
      },
      Science: {
        containerBorder: 'border-teal-500/50 rounded',
        bgColor: 'bg-black/50',
        textColor: 'text-teal-500',
        borderColor: 'border-teal-500',
        newQuestionDay: 'Sunday',
        quizStartDate: getQuizStartDate(0),
      },
    };
  
    const [selectedQuizType, setSelectedQuizType] = useState('GeneralKnowledge');
    const { bgColor, textColor, borderColor, quizStartDate } = quizTypeSettings[selectedQuizType];

    const handleQuizTypeClick = (quizType) => {
        setSelectedQuizType(quizType);
        onQuizTypeChange(quizType, quizTypeSettings[quizType].containerBorder, quizTypeSettings[quizType].quizStartDate);
      };

      const clickGeneralKnowledgeAutomatically = () => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDayOfWeek = daysOfWeek[new Date().getDay()];
      
        const matchingQuizType = Object.keys(quizTypeSettings).find(
          (quizType) => quizTypeSettings[quizType].newQuestionDay === currentDayOfWeek
        );
      
        const selectedQuizType = matchingQuizType || 'GeneralKnowledge';
      
        handleQuizTypeClick(selectedQuizType);
      };
      
      useEffect(() => {
        clickGeneralKnowledgeAutomatically();
      }, []);
      
  
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
        <p className={`relative ${textColor} mt-2 text-center text-lg ml-2 mr-2`}>
  New {selectedQuizType.replace(/([a-z])([A-Z])/g, '$1 $2')} Questions Every <span className='text-pink-500'>{quizTypeSettings[selectedQuizType].newQuestionDay}</span></p>

  <p className={`relative ${textColor} text-center ml-2 mr-2`}>
        This Quiz Start Date: {quizStartDate}
      </p>

 </>
      );    
            }  
  
  export default QuizType;