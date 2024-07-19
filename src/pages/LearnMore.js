import React from 'react';
import './LearnMore.css';

const personalityDetails = {
  D: {
    front: "D styles are motivated by winning, competition, and success. They prioritize taking action, accepting challenges, and achieving results and are often described as direct and demanding, strong-willed, driven, and determined.",
    back: `Fears: being seen as vulnerable or being taken advantage of
Values: competency, action, concrete results, personal freedom, and challenges
Overuses: the need to win, resulting in win/lose situations
Influences others by: assertiveness, insistence, competition
In conflict: speaks up about problems; looks to even the score
Could improve effectiveness through: patience, empathy
DiSC Classic patterns: Developer, Result-Oriented, Inspirational, Creative`
  },
  I: {
    front: "i styles are motivated by social recognition, group activities, and relationships. They prioritize taking action, collaboration, and expressing enthusiasm and are often described as warm, trusting, optimistic, magnetic, enthusiastic, and convincing.",
    back: `Fears: loss of influence, disapproval, being ignored, rejection
Values: coaching and counseling, freedom of expression, democratic relationships
Overuses: optimism, praise
Influences others through: charm, optimism, energy
In conflict: expresses feelings, gossips
Could improve effectiveness through: being more objective, following through on tasks
DiSC Classic patterns: Promoter, Persuader, Counselor, Appraiser`
  },
  S: {
    front: "S styles are motivated by cooperation, opportunities to help, and sincere appreciation. They prioritize giving support, collaborating, and maintaining stability and are often described as calm, patient, predictable, deliberate, stable, and consistent.",
    back: `Fears: change, loss of stability, offending others, letting people down
Values: loyalty, helping others, security
Overuses: modesty, passive resistance, compromise
Influences others by: accommodation, consistent performance
In conflict: listens to others’ perspectives; keeps their own needs to themselves
Could improve effectiveness through: displaying more self-confidence, revealing their true feelings
DiSC Classic patterns: Specialist, Achiever, Agent, Investigator`
  },
  C: {
    front: "C styles are motivated by opportunities to gain knowledge, show their expertise, and produce quality work. They prioritize ensuring accuracy, maintaining stability, and challenging assumptions. They are often described as careful, analytical, systematic, diplomatic, accurate, and tactful.",
    back: `Fears: criticism and being wrong; strong displays of emotion
Values: quality and accuracy
Overuses: analysis, restraint
Influences others by: logic, exacting standards
In conflict: focuses on logic and objectivity; overpowers with facts
Could improve effectiveness through: acknowledging others’ feelings; looking beyond data
DiSC Classic patterns: Objective Thinker, Perfectionist, Practitioner`
  }
};

const LearnMore = () => {
  return (
    <div className="learn-more-container">
      <h1>Learn More</h1>
      <div className="info-section">
        <h2>What is the purpose of the DISC personality test?</h2>
        <p>The DISC personality test is designed to help improve communication and cooperation in the workplace, boost the performance of teams and improve managers' effectiveness. The DISC types can help people better understand themselves and their coworkers and use that knowledge to improve relationships and adapt behaviors when necessary.</p>
      </div>
      <div className="info-section">
        <h2>Can your DISC style change over time?</h2>
        <p>The average individual's DISC style does not change over time. When people get older, but their habits and responsibilities can change, but their personality tends to stay the same.</p>
      </div>
      <div className="info-section">
        <h2>What is the rarest and the most common DISC style?</h2>
        <p>Most people tend to fall into one or two main DISC quadrants.
        According to the 2019 Extended DISC validation study, the type D (Dominance) personality style is one of the rarest personality types, forming approximately 9% of the worldwide population.
        According to the same study, the S personality type is the most common DISC style—dominant S styles make up 32% of the world's population.</p>
      </div>
      <div className="card-container">
        {Object.keys(personalityDetails).map((key) => (
          <div className="card" key={key}>
            <div className="card-inner">
              <div className="card-front">
                <h2>{key}</h2>
                <p>{personalityDetails[key].front}</p>
              </div>
              <div className="card-back">
                <pre>{personalityDetails[key].back}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="careers-section">
        <div className="career-column">
          <h2>Possible careers for D types</h2>
          <ul>
            <li>Chief executive officer (CEO)</li>
            <li>Entrepreneur</li>
            <li>Attorney</li>
            <li>Police officer</li>
            <li>Stockbroker</li>
          </ul>
        </div>
        <div className="career-column">
          <h2>Possible careers for I types</h2>
          <ul>
            <li>Creative director</li>
            <li>Graphic designer</li>
            <li>Public relations manager</li>
            <li>Realtor</li>
            <li>Travel agent</li>
          </ul>
        </div>
        <div className="career-column">
          <h2>Possible careers for S types</h2>
          <ul>
            <li>Dental hygienist</li>
            <li>Counselor</li>
            <li>Human resources director</li>
            <li>Nurse</li>
            <li>Therapist</li>
          </ul>
        </div>
        <div className="career-column">
          <h2>Possible careers for C types</h2>
          <ul>
            <li>Actuary</li>
            <li>Software engineer</li>
            <li>Investment analyst</li>
            <li>Economist</li>
            <li>Scientist</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
