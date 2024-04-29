import React from 'react';

const About = ({ containerBorder }) => {
  return (
    <div className={`relative mt-40 mb-20 mx-5 border-2 ${containerBorder}`}>
      <section id="about-container" className="p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white md:max-w-4xl">
        <h3 className="flex items-center justify-center mb-2 text-2xl">
          About
        </h3>
        <hr className="m-3 border-pink-500 rounded-full" />
        <div>
          <p className="flex items-center justify-center mb-5 md:text-lg">
            Welcome to TimeWiseQuiz.com, your dynamic destination for thrilling trivia challenges! Dive into a world where knowledge meets excitement, and every moment counts.
          </p>
          <p className="flex items-center justify-center mb-5 md:text-lg">
            At TimeWise we pride ourselves on offering seven captivating quizzes covering a range of general knowledge-based topics. Each day of the week brings a fresh opportunity to test your expertise in a different field, ensuring endless entertainment and learning.
          </p>
          <p className="flex items-center justify-center mb-5 md:text-lg">
            Our unique twist? Time is of the essence. As you tackle each quiz, a timer ticks away, rewarding accurate and swift answers with precious seconds while penalizing mistakes. The ultimate goal? Complete all 33 questions with the most time left on the clock. Can you beat the challenge and claim the top spot on our leaderboards?
          </p>
          <p className="flex items-center justify-center mb-5 md:text-lg">
            Speaking of leaderboards, we offer daily, weekly, and all-time rankings, fostering friendly competition and community spirit. Simply enter your name to join the fray—no sign-in required. Discuss your results with other users on our Instagram page.
            </p>
            <p className="flex items-center justify-center mb-5 md:text-lg">
            Choose your difficulty setting—easy, normal, or hard—to tailor the challenge to your skill level. Whether you're a trivia novice or a seasoned pro, there's something for everyone at TimeWiseQuiz.com.
          </p>
          <p className="flex items-center justify-center mb-5 md:text-lg">
            Every quiz experience is meticulously crafted for maximum enjoyment and fairness. With questions and answers shuffled randomly and placed dynamically, each session offers a unique challenge. Our carefully curated selection of questions ensures a stimulating experience every time.
          </p>
          
          <p className="flex items-center justify-center mb-5 md:text-lg">
            Ready to put your knowledge to the test?
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
