import React from 'react';

const QuizComponent = () => {
  return (
    <div className="absolute mt-60 mb-40 ml-5 mr-5 ">
      {/* Quiz */}
      <section id="quiz-container" className="hidden p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white md:max-w-2xl">
        <div id="green-plus" className="hidden text-green-500 text-3xl float-right mr-10 pb-1">+3</div>
        <div id="red-minus" className="hidden text-red-500 text-3xl float-left ml-10 pb-1">-5</div>
        <div id="timer" className="text-2xl flex items-center justify-center absolute inset-x-0">
          00:00
        </div>
        <br />
        <hr className="border-pink-500 m-3" />
        <div id="question-box" className="mb-5 text-2xl">
          {/* Question content goes here */}
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center">
          <button className="answer-box bg-pink-500 text-white text-center px-3 py-2 rounded">Option 1</button>
          <button className="answer-box bg-pink-500 text-white text-center px-3 py-2 rounded">Option 2</button>
          <button className="answer-box bg-pink-500 text-white text-center px-3 py-2 rounded">Option 3</button>
          <button className="answer-box bg-pink-500 text-white text-center px-3 py-2 rounded">Option 4</button>
        </div>
      </section>
    </div>
  );
};

export default QuizComponent;
