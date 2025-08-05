export const signUpFormControls = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Enter your user name",
      type: "text",
      componentType: "input",
      className: "w-full xs:text-xs",
      errorClassName: "text-red-500 text-sm xs:text-xs",
    },
    {
      name: "userEmail",
      label: "User Email",
      placeholder: "Enter your user email",
      type: "email",
      componentType: "input",
      className: "w-full xs:text-xs",
      errorClassName: "text-red-500 text-sm xs:text-xs",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      componentType: "input",
      className: "w-full xs:text-xs",
      errorClassName: "text-red-500 text-sm xs:text-xs",
    },
  ];
  
  export const signInFormControls = [
    {
      name: "userEmail",
      label: "User Email",
      placeholder: "Enter your user email",
      type: "email",
      componentType: "input",
      className: "w-full sm:mt-2 xs:text-xs",
      errorClassName: "text-red-500 text-sm",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      componentType: "input",
      className: "w-full sm:mt-2 xs:text-xs",
      errorClassName: "text-red-500 text-sm",
    },
  ];

  export const initialSignInFormData = {
    userEmail: "",
    password: "",
  };
  
  export const initialSignUpFormData = {
    userName: "",
    userEmail: "",
    password: "",
  };


  export const dialogFormControls = [
    {
      name: "jobRole",
      label: "Job Role / Job Position",
      placeholder: "Ex. Full Stack Developer",
      type: "text",
      componentType: "input",
      className: "w-full sm:mt-2 xs:text-xs",
      errorClassName: "text-red-500 text-sm",
    },
    {
      name: "jobDescription",
      label: "Job Description / Tech Stack (In Short)",
      placeholder: "Ex. React, NodeJs",
      type: "text",
      componentType: "textarea", 
      className: "w-full sm:mt-2 xs:text-xs",
      errorClassName: "text-red-500 text-sm",
    },
    {
      name: "jobExperience",
      label: "Years of Experience",
      placeholder: "Ex. 5",
      type: "number",
      componentType: "input",
      className: "w-full sm:mt-2 xs:text-xs",
      errorClassName: "text-red-500 text-sm",
    },
  ];
  
  export const initialDialogFormData = {
    jobRole: "",           
    jobDescription: "",    
    jobExperience: "",     
  };

  export const dummyFeedback = [
    {
      question: "What is React?",
      rating: 4,
      answer: "React is a backend framework.",
      correctanswer: "React is a JavaScript library for building user interfaces.",
      feedback: "Your answer is partially correct but incorrect overall. React is a frontend library, not a backend framework."
    },
    {
      question: "What is the purpose of useState in React?",
      rating: 5,
      answer: "useState is used to manage state in functional components.",
      correctanswer: "useState is used to manage state in functional components.",
      feedback: "Great job! Your answer is spot on."
    },
    {
      question: "What is the difference between state and props in React?",
      rating: 3,
      answer: "State is used for styling, and props are for dynamic content.",
      correctanswer: "State is a local component property that holds data, while props are used to pass data from parent to child components.",
      feedback: "Your understanding needs improvement. State and props are core concepts of React, and it's essential to know their correct purpose."
    }
  ];
  
  
  export const languageOptions = [
    { id: "english", label: "English" },
    { id: "spanish", label: "Spanish" },
    { id: "french", label: "French" },
    { id: "german", label: "German" },
    { id: "chinese", label: "Chinese" },
    { id: "japanese", label: "Japanese" },
    { id: "korean", label: "Korean" },
    { id: "portuguese", label: "Portuguese" },
    { id: "arabic", label: "Arabic" },
    { id: "russian", label: "Russian" },
  ];
  
  export const courseLevelOptions = [
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
  ];
  
  export const courseCategories = [
    { id: "web-development", label: "Web Development" },
    { id: "backend-development", label: "Backend Development" },
    { id: "data-science", label: "Data Science" },
    { id: "machine-learning", label: "Machine Learning" },
    { id: "artificial-intelligence", label: "Artificial Intelligence" },
    { id: "cloud-computing", label: "Cloud Computing" },
    { id: "cyber-security", label: "Cyber Security" },
    { id: "mobile-development", label: "Mobile Development" },
    { id: "game-development", label: "Game Development" },
    { id: "software-engineering", label: "Software Engineering" },
  ];
  
  export const courseLandingPageFormControls = [
    {
      name: "title",
      label: "Title",
      componentType: "input",
      type: "text",
      placeholder: "Enter course title",
    },
    {
      name: "category",
      label: "Category",
      componentType: "select",
      type: "text",
      placeholder: "",
      options: courseCategories,
    },
    {
      name: "level",
      label: "Level",
      componentType: "select",
      type: "text",
      placeholder: "",
      options: courseLevelOptions,
    },
    {
      name: "primaryLanguage",
      label: "Primary Language",
      componentType: "select",
      type: "text",
      placeholder: "",
      options: languageOptions,
    },
    {
      name: "subtitle",
      label: "Subtitle",
      componentType: "input",
      type: "text",
      placeholder: "Enter course subtitle",
    },
    {
      name: "description",
      label: "Description",
      componentType: "textarea",
      type: "text",
      placeholder: "Enter course description",
    },
    {
      name: "pricing",
      label: "Pricing",
      componentType: "input",
      type: "number",
      placeholder: "Enter course pricing",
    },
    {
      name: "objectives",
      label: "Objectives",
      componentType: "textarea",
      type: "text",
      placeholder: "Enter course objectives",
    },
    {
      name: "welcomeMessage",
      label: "Welcome Message",
      componentType: "textarea",
      placeholder: "Welcome message for students",
    },
  ];
  
  export const courseLandingInitialFormData = {
    title: "",
    category: "",
    level: "",
    primaryLanguage: "",
    subtitle: "",
    description: "",
    pricing: "",
    objectives: "",
    welcomeMessage: "",
    image: "",
  };
  
  export const courseCurriculumInitialFormData = [
    {
      title: "",
      videoUrl: "",
      freePreview: false,
      public_id: "",
    },
  ];
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  
  export const filterOptions = {
    category: courseCategories,
    level: courseLevelOptions,
    primaryLanguage: languageOptions,
  };