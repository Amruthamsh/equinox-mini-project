import React from 'react'

function page() {
  return (
    <div className='font-Poppins bg-black-100 text-white h-full z-10'>
     <div className='relative'>
       <img 
       src="/grid.svg" 
       alt="grid"
       className='w-full h-full opacity-80 absolute inset-0'
       />
       <div className='relative z-20 py-10'>
         <h1 className='text-start text-4xl mb-5 pl-6'>Software Engineering</h1>
         <div className='pl-6 mb-10'>
            <div className='pb-5'>
              <h2 className='text-xl'>Overall description</h2>
              <p>We are seeking a skilled Software Engineer to join our team. You will design, develop, and maintain high-quality software solutions, collaborating with cross-functional teams to gather requirements and implement scalable applications.</p>
            </div>
            <div className='pb-5'>
              <h2 className='text-xl'>Skills required</h2>
              <p>Proficiency in JavaScript, Python, or Java, and experience with frameworks like React, Angular, or Node.js, is required. Knowledge of agile methodologies, version control systems, and CI practices is essential.</p>
            </div>
            <div className='pb-5'>
             <h2 className='text-xl'>Years of Experience Required</h2>
             <p>We are looking for candidates with 3+ years of experience in software engineering or related fields.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='py-2'>
        <h1 className='text-4xl pl-6 pb-5'>Candidates</h1>
        <div className='text-center flex max-w-5xl mx-auto gap-8 group'>
          <div className='bg-white/10 group-hover:scale-[0.85] hover:!scale-100 cursor-pointer p-8 rounded-xl'>
            <img src="/exp1.svg" alt="" className='h-20 mx-auto'/>
            <h4 className='uppercase text-xl font-bold'>John Doe</h4>
            <p className='text-sm leading-7 my-3 font-light opacity-50'>Hi, I'm John Doe, a full-stack developer with 8 years of experience. I specialize in JavaScript, Python, and Java, and have a knack for using React and Django to create robust applications.</p>
            <button className='bg-violet-400 py-2.5 px-8 rounded-full'>Get in touch</button>
          </div>

          <div className='bg-white/10 group-hover:scale-[0.85] hover:!scale-100 cursor-pointer p-8 rounded-xl'>
           <img src="/exp4.svg" alt="" className='h-20 mx-auto'/>
           <h4 className='uppercase text-xl font-bold'>Emily Johnson</h4>
           <p className='text-sm leading-7 my-3 font-light opacity-50'>My name is Emily Johnson, and I have 6 years of experience in AI and machine learning. I’m proficient in Python, TensorFlow, and PyTorch, and I love creating AI models that solve real-world problems.</p>
           <button className='bg-violet-400 py-2.5 px-8 rounded-full'>Get in touch</button>
          </div>

          <div className='bg-white/10 group-hover:scale-[0.85] hover:!scale-100 cursor-pointer p-8 rounded-xl'>
           <img src="/exp1.svg" alt="" className='h-20 mx-auto'/>
           <h4 className='uppercase text-xl font-bold'>Michael Brown</h4>
           <p className='text-sm leading-7 my-3 font-light opacity-50'>I'm Michael Brown, a DevOps-focused software engineer with 7 years of experience. I specialize in AWS, Azure, and CI/CD practices to ensure efficient software delivery and scalable infrastructure.</p>
           <button className='bg-violet-400 py-2.5 px-8 rounded-full'>Get in touch</button>
          </div>
       </div>
     </div>
   </div>


  )
}

export default page