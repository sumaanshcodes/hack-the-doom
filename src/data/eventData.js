import { domains } from './domains';
import { sponsors, pastSponsors } from './sponsors';
import { judges, mentors } from './people';
import { timeline } from './timeline';

export const eventData = {
  eventName: "HACK THE DOOM",
  organization: "HACK4TECH",
  institution: "GLA UNIVERSITY",
  location: "MATHURA",
  tagline: "BUILD. BREAK. SURVIVE.",
  description: "A technology-driven hackathon for developers, designers, innovators and problem solvers.",
  
  // CHANGE THIS DATE/TIME TO UPDATE THE COUNTDOWN (Format: YYYY-MM-DDTHH:MM:SS)
  eventDate: null, // e.g., "2026-10-31T09:00:00" or null for TBD
  
  registrationDeadline: "TBD",
  prizePool: "XX,XXX+",
  teamSize: {
    min: 1, 
    max: 4, 
    isTbd: true,
  },
  eventMode: "OFFLINE", // OFFLINE / ONLINE / HYBRID / TBD
  
  socialLinks: {
    email: "hack4tech@gla.ac.in",
    linkedin: "https://www.linkedin.com/company/hack4tech-glau/",
    instagram: "https://www.instagram.com/hack4tech.glau/"
  },

  domains,
  sponsors,
  pastSponsors,
  judges,
  mentors,
  timeline,

  faqs: [
    {
      question: "Who can participate?",
      answer: "Hack the Doom is a technology-driven hackathon for developers, designers, innovators, and problem solvers. Students from any college can participate."
    },
    {
      question: "What is the team size?",
      answer: "Team size requirements are currently TBD. Stay tuned for official announcements."
    },
    {
      question: "Is registration free?",
      answer: "Yes, participation is completely free."
    },
    {
      question: "Is the hackathon online or offline?",
      answer: "The venue is GLA University, Mathura. Final event format details are TBD."
    },
    {
      question: "When will problem statements be released?",
      answer: "Problem statements will be released shortly before the hacking period begins. Specific dates are TBD."
    },
    {
      question: "What are the prizes?",
      answer: "We have an exciting prize pool of ₹XX,XXX+, along with special sponsor prizes and opportunities. Final amounts are Coming Soon."
    }
  ]
};
