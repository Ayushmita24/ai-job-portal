const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');

dotenv.config();

const jobs = [
  {
    title: 'Frontend Developer',
    company: 'TechNova',
    location: 'Bangalore, India',
    type: 'Full-time',
    salary: '₹6-10 LPA',
    description: 'We are looking for a skilled Frontend Developer to build beautiful, responsive web applications using React.js and modern CSS frameworks.',
    skills: ['React.js', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
    experience: '1-3 years',
  },
  {
    title: 'Backend Developer',
    company: 'CloudStack',
    location: 'Remote',
    type: 'Remote',
    salary: '₹8-14 LPA',
    description: 'Join our backend team to build scalable REST APIs and microservices using Node.js and MongoDB.',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT'],
    experience: '2-4 years',
  },
  {
    title: 'Machine Learning Engineer',
    company: 'DataMind AI',
    location: 'Hyderabad, India',
    type: 'Full-time',
    salary: '₹12-20 LPA',
    description: 'Work on cutting-edge ML models for NLP and computer vision. You will design, train, and deploy models at scale.',
    skills: ['Python', 'Scikit-learn', 'TensorFlow', 'NLP', 'Deep Learning'],
    experience: '2-5 years',
  },
  {
    title: 'Full Stack Developer',
    company: 'StartupHub',
    location: 'Mumbai, India',
    type: 'Full-time',
    salary: '₹8-15 LPA',
    description: 'Build and maintain full-stack web applications from scratch. Own features end to end across frontend and backend.',
    skills: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'JavaScript'],
    experience: '2-4 years',
  },
  {
    title: 'Data Scientist',
    company: 'InsightCorp',
    location: 'Pune, India',
    type: 'Full-time',
    salary: '₹10-18 LPA',
    description: 'Analyze large datasets and build predictive models to drive business decisions. Work closely with product and engineering teams.',
    skills: ['Python', 'Pandas', 'Scikit-learn', 'SQL', 'Data Visualization'],
    experience: '2-4 years',
  },
  {
    title: 'React Native Developer',
    company: 'MobileFirst',
    location: 'Remote',
    type: 'Remote',
    salary: '₹7-12 LPA',
    description: 'Develop cross-platform mobile applications for iOS and Android using React Native.',
    skills: ['React Native', 'JavaScript', 'Redux', 'REST APIs', 'Mobile UI'],
    experience: '1-3 years',
  },
  {
    title: 'DevOps Engineer',
    company: 'InfraCloud',
    location: 'Bangalore, India',
    type: 'Full-time',
    salary: '₹10-16 LPA',
    description: 'Manage CI/CD pipelines, cloud infrastructure, and deployment processes. Work with Docker, Kubernetes and AWS.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
    experience: '2-5 years',
  },
  {
    title: 'Python Developer',
    company: 'AutomateX',
    location: 'Chennai, India',
    type: 'Full-time',
    salary: '₹6-11 LPA',
    description: 'Build automation scripts, data pipelines, and backend services using Python and Django/FastAPI.',
    skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'REST APIs'],
    experience: '1-3 years',
  },
  {
    title: 'UI/UX Designer & Developer',
    company: 'DesignLab',
    location: 'Remote',
    type: 'Remote',
    salary: '₹5-9 LPA',
    description: 'Design and implement beautiful user interfaces with a strong eye for detail. Collaborate with product teams.',
    skills: ['Figma', 'React.js', 'CSS3', 'Tailwind CSS', 'UI Design'],
    experience: '1-2 years',
  },
  {
    title: 'Software Engineer Intern',
    company: 'NextGen Tech',
    location: 'Kolkata, India',
    type: 'Internship',
    salary: '₹15,000-25,000/month',
    description: 'Great opportunity for fresh graduates to gain real-world experience in full-stack development. Mentorship provided.',
    skills: ['JavaScript', 'React.js', 'Node.js', 'MongoDB', 'Git'],
    experience: '0-1 years',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected ✅');

    await Job.deleteMany({});
    console.log('Old jobs cleared 🗑️');

    await Job.insertMany(jobs);
    console.log('10 jobs seeded successfully 🌱');

    mongoose.connection.close();
    console.log('Done! Connection closed.');
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

seedDB();