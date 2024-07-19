import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Quiz.css';

const questions = [
  'You find it easy to make new friends.',
  'You could spend days learning about random things that interest you.',
  'When others are upset, you feel upset too.',
  'You aren’t one for backup plans.',
  'You stay cool, calm, and collected even when under lots of stress.',
  'When out and about, you don’t really introduce yourself to new people - you prefer to chat with people you already know.',
  'You don’t like to start a new project until the first one’s finished.',
  'You’re a sentimental type of person.',
  'You enjoy using lists or schedules.',
  'Making a small mistake can make you question your knowledge on a subject.',
  'You easily spark up a conversation with a stranger.',
  'You love talking about and analyzing creative works.',
  'You follow your heart more than your head.',
  'You tend to prefer following a daily routine as opposed to just doing whatever you want.',
  'When you meet new people, you worry about whether you made a great first impression.',
  'You prefer solo activities over group activities.',
  'You love watching movies that let you interpret the ending yourself.',
  'You get more happiness from achieving things yourself than you do from helping others.',
  'You aren’t interested in very many things.',
  'You often worry about the worst possible scenario in any given situation.',
  'You love taking up leadership roles.',
  'You’re an artistic type of person.',
  'The world would be better off if people made more decisions with their feelings.',
  'You prefer to relax before getting into chores.',
  'You don’t mind when other people are having a heated argument in front of you.',
  'You like being the center of attention.',
  'Your mood is generally pretty stable.',
  'You have plenty of patience for people that aren’t as efficient as you.',
  'You’re spontaneous.',
  'You have always been fascinated by the question of what, if anything, happens after death.',
  'You prefer to be on your own rather than with others.',
  'You love theoretical discussions and could engage in them for days on end.',
  'You have a hard time empathizing with people who come from a very different lifestyle to your own.',
  'When there’s a decision to be made, you want to make it right away.',
  'You tend to second-guess the decisions you make.',
  'Socializing quickly exhausts you.',
  'You enjoy going to art museums.',
  'You struggle to understand what others are feeling.',
  'You like to have a to-do list for each day.',
  'You often feel insecure.',
  'You prefer talking to people on the phone over texting or messaging them.',
  'When someone has a different perspective on a subject than you, you genuinely try to understand where they’re coming from.',
  'You find that telling the cold, hard truth is more important than being tactful.',
  'You’re happy to go with the flow when your plans are interrupted.',
  'Mistakes you made in the past often haunt your mind.',
  'You feel energized after spending time alone, engaging in solitary activities like reading or reflecting.',
  'You prefer to rely on your instincts rather than sticking strictly to a set plan or schedule.',
  'You often find yourself deeply contemplating the underlying meanings and implications of things rather than focusing solely on the surface details.',
  'When making decisions, you prioritize logic and objective analysis over considering how it might impact others\' feelings.',
  'You often find yourself worrying about potential future outcomes or what could go wrong in a given situation, even if things seem to be going well at the moment.',
  'You often find yourself drawn to new experiences and enjoy exploring unfamiliar places or trying out new activities.',
  'You tend to trust your gut feelings and intuition when faced with difficult decisions rather than relying solely on logical analysis.',
  'You feel a strong sense of empathy towards others and are often affected by their emotions, even if they don\'t directly involve you.',
  'You prefer to have a well-structured plan in place rather than leaving things up to chance or improvisation.',
  'You thrive in dynamic, fast-paced environments and feel invigorated by challenging situations that require quick thinking and adaptability.',
  'When faced with a problem, you\'re more inclined to seek out practical solutions rather than dwelling on abstract theories or hypothetical scenarios.',
  'You enjoy engaging in deep, meaningful conversations with others, exploring complex ideas and exchanging perspectives.',
  'You often find yourself reflecting on past experiences and considering how they\'ve shaped your beliefs and values.',
  'You\'re inclined to take charge in group settings, assuming leadership roles and guiding others towards achieving common goals.',
  'You feel most comfortable when your environment is organized and structured, and you may feel stressed or unsettled in chaotic or unpredictable situations.',
  'You prefer spending time with a small group of close friends rather than attending large social gatherings.',
  'When presented with multiple options, you tend to follow your heart and make decisions based on what feels right in the moment.',
  'You enjoy exploring new ideas and concepts, often seeking out opportunities to expand your knowledge and understanding of the world.',
  'You find it easy to adapt to changes in plans or unexpected situations, often seeing them as opportunities for growth and learning.',
  'When working on a project, you value efficiency and strive to complete tasks quickly and effectively.',
  'You often seek out opportunities to challenge yourself and push your limits, whether it\'s through physical activities or intellectual pursuits.',
  'You prefer to focus on the present moment rather than dwelling on past regrets or worrying about future uncertainties.',
  'You enjoy engaging in lively debates and discussions, sharing your opinions and perspectives with others while also listening to differing viewpoints.',
  'You have a strong desire for structure and order in your daily life, feeling most at ease when following a clear routine or schedule.',
  'You tend to be proactive in seeking out new experiences and opportunities, embracing change as a natural part of life.',
  'You feel energized and excited by social interactions, often seeking out opportunities to meet new people and engage in group activities.',
  'When making decisions, you prioritize logical reasoning and objective analysis, considering the facts and evidence before reaching a conclusion.',
  'You tend to be highly self-critical and introspective, frequently reflecting on your actions and decisions, and striving for self-improvement.',
  'You often find yourself empathizing with others\' emotions, even if you haven\'t experienced the same situation yourself, and strive to offer support and understanding.',
  'You prefer to have a clear plan and direction in life, setting specific goals and working diligently to achieve them.',
  'You enjoy taking on challenges and pushing yourself to excel, thriving in high-pressure situations where you can demonstrate your abilities.',
  'You feel comfortable spending time alone, enjoying solitary activities like reading, writing, or simply reflecting on your thoughts and feelings.',
  'When faced with uncertainty or ambiguity, you trust your instincts and intuition to guide you towards the best course of action.',
  'You often find yourself worrying about potential outcomes and future uncertainties, sometimes feeling anxious even in relatively stable situations.',
  'You prefer to keep your options open and explore different possibilities before committing to a final decision or course of action.',
  'You find it easy to strike up conversations with strangers and enjoy meeting new people in social settings.',
  'When faced with a problem, you\'re more likely to rely on your logical reasoning and objective analysis rather than your gut instincts or intuition.',
  'You prefer to focus on concrete details and tangible facts rather than abstract theories or hypothetical scenarios.',
  'You often prioritize maintaining harmony and avoiding conflict in your relationships, sometimes sacrificing your own needs to keep the peace.',
  'You prefer to have a clear plan and structure in your daily life, feeling most comfortable when things are organized and predictable.',
  'You enjoy taking charge and leading others towards achieving common goals, often assuming leadership roles in group settings.',
  'You feel recharged and refreshed after spending time alone, finding solace and rejuvenation in solitary activities.',
  'You\'re naturally curious and enjoy exploring new ideas and concepts, often delving deep into subjects that pique your interest.',
  'You tend to trust your instincts and rely on your intuition when making decisions, often finding that your gut feelings lead you in the right direction.',
  'You have a keen eye for observing your surroundings and notice even subtle changes in your environment.'
];

const answerOptions = [
  { answerText: 'Strongly disagree', type: 'D0' },
  { answerText: 'Disagree', type: 'I' },
  { answerText: 'Neutral', type: 'S' },
  { answerText: 'Agree', type: 'C' },
  { answerText: 'Strongly agree', type: 'D2' },
];

function Quiz({ user }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Received user in Quiz:', user);
  }, [user]);

  const handleAnswerClick = (type) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (answers) => {
    const scores = { D: 0, I: 0, S: 0, C: 0 };
    answers.forEach((answer) => {
      scores[answer[0]]++;
    });

    const resultType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    saveResult(resultType);
  };

  const saveResult = (result) => {
    if (!user || !user.email) {
      console.error('User is not logged in or user email is missing.', user);
      return;
    }

    console.log('Saving result for user:', user.email, 'with result:', result);

    axios.post('http://localhost:5000/auth/save-result', {
      email: user.email,
      result,
    })
    .then(response => {
      console.log('Result saved:', response.data.message);
      navigate('/results', { state: { resultType: result } });
    })
    .catch(error => {
      console.error('Error saving result:', error);
      navigate('/results', { state: { resultType: result } });
    });
  };

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
        ></div>
      </div>
      <p>{questions[currentQuestion]}</p>
      <div className="answers">
        {answerOptions.map((option) => (
          <button key={option.type} onClick={() => handleAnswerClick(option.type)}>
            {option.answerText}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
