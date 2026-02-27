import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, ShieldCheck, Mail, MapPin, Phone, Award, Database, Terminal, Cpu, Globe, Zap, Code2, Briefcase } from 'lucide-react';

const ResumeOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const handleDownload = () => {
    // This triggers the browser's native print dialog, allowing "Save as PDF" 
    // which is the standard way to download dynamically generated web documents.
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none" />
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:rotate-90 transition-all duration-500 z-[1010] no-print"
      >
        <X size={24} />
      </button>

      {/* Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1010] flex gap-4 no-print">
        <button 
          onClick={handleDownload}
          className="group px-8 py-4 bg-cyan-500 text-slate-950 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-[0_20px_40px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 transition-all"
        >
          <Download size={18} className="group-hover:translate-y-0.5 transition-transform" /> 
          Download CV Schematic (PDF)
        </button>
      </div>

      <motion.div 
        initial={{ y: 60, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        data-lenis-prevent="true"
        className="w-full max-w-5xl max-h-[90vh] bg-white text-slate-900 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-y-auto resume-content custom-scrollbar p-8 md:p-16 flex flex-col gap-12 relative"
      >
        <div className="max-w-4xl mx-auto w-full space-y-12 pb-16">
          
          {/* Header Section */}
          <header className="border-b-[6px] border-slate-900 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-7xl font-display font-black tracking-tighter uppercase italic leading-none">
                Ta h a K h a l i d
              </h1>
              <h2 className="text-xl md:text-2xl font-display font-black text-cyan-600 uppercase tracking-widest">
                Senior Full Stack Engineer
              </h2>
            </div>
            
            <div className="space-y-2 text-left md:text-right font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-500 leading-relaxed">
              <div className="flex items-center gap-3 md:justify-end">
                <MapPin size={14} className="text-cyan-500" /> AF Society, Karachi, Sindh 75840
              </div>
              <div className="flex items-center gap-3 md:justify-end">
                <Phone size={14} className="text-cyan-500" /> (92) 347-2245343
              </div>
              <div className="flex items-center gap-3 md:justify-end">
                <Mail size={14} className="text-cyan-500" /> iamtahaalikhalid@gmail.com
              </div>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
               <h3 className="text-sm font-mono text-slate-400 uppercase tracking-[0.6em] whitespace-nowrap italic font-bold">P r o f e s s i o n a l S u m m a r y</h3>
               <div className="h-[1px] w-full bg-slate-100" />
            </div>
            <div className="space-y-4 text-base md:text-lg leading-relaxed text-slate-700 font-light">
              <p>
                Senior Full Stack Engineer with almost 7 years of professional experience in designing, developing, and
                maintaining scalable enterprise applications using Microsoft technologies and modern frontend frameworks. I
                have extensive experience across the complete Software Development Life Cycle (SDLC), including requirement
                analysis, design, development, maintenance, troubleshooting, deployments, and production support. I have
                primarily worked with US-based firms, collaborating closely with offshore and onshore teams in agile
                environments.
              </p>
              <p>
                My backend expertise includes .NET Framework, .NET Core, .NET 6+, C#, ASP.NET Web Forms, ASP.NET MVC, and
                .NET Web API (REST/SOAP), along with experience in building microservices-based architectures. I have worked
                extensively with databases such as MS SQL Server, MongoDB, and Azure Cosmos DB. On the frontend, I have
                hands-on experience with Angular and React, along with JavaScript, TypeScript, HTML5, CSS3, Bootstrap, and
                jQuery, enabling me to build responsive, scalable, and high-performance web applications.
              </p>
              <p>
                I am a Microsoft Certified Azure Developer Associate and Azure Fundamentals certified professional with strong
                experience in designing and deploying cloud-native solutions on Microsoft Azure. My experience includes Azure
                Functions, Logic Apps, Azure Key Vault, Azure Front Door, Azure CDN, Application Insights, Azure Blob Storage, and
                Web Jobs. I also have solid expertise in implementing clean architecture principles, design patterns, distributed
                and in-memory caching using Redis, CI/CD pipelines with Azure DevOps, and advanced concepts such as
                multithreading, parallelism, and asynchronous programming in .NET Core.
              </p>
              <p>
                I have worked in diverse IT consulting environments across multiple domains, contributing to both development
                and architectural decisions while maintaining direct client communication and ensuring high-quality, scalable
                solutions aligned with business objectives.
              </p>
              <p>
                Day-to-day responsibilities include collaborating in Agile sprint ceremonies, participating in backlog refinement,
                providing task estimations, and delivering features within defined timelines. I design and develop scalable
                solutions aligned with business requirements, analyze existing systems for potential improvements, and
                troubleshoot production issues. I actively deploy releases to development, staging, and production environments,
                including handling hotfix deployments for critical production incidents.
              </p>
              <p>
                I conduct peer code reviews and reviews to pull requests to maintain code quality, enforce best practices, and
                guide junior developers. I collaborate directly with technical and non-technical stakeholders to translate business
                requirements into technical solutions and ensure successful implementation.
              </p>
            </div>
          </section>

          {/* Professional Experience */}
          <section className="space-y-12">
            <div className="flex items-center gap-4">
               <h3 className="text-sm font-mono text-slate-400 uppercase tracking-[0.6em] whitespace-nowrap italic font-bold">P r o f e s s i o n a l E x p e r i e n c e</h3>
               <div className="h-[1px] w-full bg-slate-100" />
            </div>
            
            <div className="space-y-16">
              {/* Visionet Systems Inc */}
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 border-slate-900 pl-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-3xl font-black uppercase italic text-slate-900">Visionet Systems Inc</h3>
                    <p className="text-sm font-bold text-cyan-600 uppercase tracking-[0.2em]">Senior Software Engineer | Karachi, Hybrid</p>
                  </div>
                  <span className="text-sm font-mono text-slate-900 font-bold bg-slate-100 px-4 py-1 rounded-full whitespace-nowrap mt-2 md:mt-0">JUNE 2021 – PRESENT</span>
                </div>
                
                <div className="grid gap-10 pl-6 border-l-[1px] border-slate-200">
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 uppercase text-lg border-b border-slate-50 pb-1">Outsource to Real Matters as Title Consultant US/CA</h4>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                      At Real Matters, I work across key enterprise products including Title Hound, Certus, and Latitude, primarily
                      serving U.S.-based clients in the real estate, mortgage, and title insurance domain. My role combines full-stack
                      development, production support, system enhancements, and deployment management within an Agile
                      environment. Title Hound is a U.S. industry title rate engine used to calculate and compare title insurance
                      premiums, recording fees, mortgage taxes, and other closing costs. I contribute to enhancing rate calculation logic,
                      implementing state-specific compliance rules, resolving complex fee-related issues, and ensuring accurate cost
                      disclosures aligned with U.S. regulations.
                    </p>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                      Certus focuses on system integrations and service-based architecture, enabling secure communication between
                      internal and third-party platforms. I work on API development (REST/SOAP), service enhancements, and resolving
                      integration-related issues to ensure seamless data exchange.
                    </p>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                      Latitude supports operational workflows and transaction processing within the title ecosystem. My responsibilities
                      include feature development, performance optimization, and maintaining system stability across environments.
                    </p>
                    <p className="text-[10px] font-mono font-bold text-cyan-600 uppercase tracking-widest pt-2">
                      Technologies Used: Dot Net Web Forms, VB Dot Net, Dot Net Core Apis, Angular, Azure Cloud, Active MQ, GitHub, SQL Server, Jira
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 uppercase text-lg border-b border-slate-50 pb-1">Outsource to Silicon Valley Bank as Senior Software Engineer</h4>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                      Worked as a Lead Developer on the Essential Project Cloud project, focusing on large-scale data integration and
                      backend enhancements. Consumed and integrated Essential Project Cloud exposed APIs and designed structured
                      data models to manage thousands of project records efficiently.
                    </p>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                      Developed data processing and integration scripts using Python, including building services with Fast API to
                      consume and expose REST endpoints. Integrated core backend APIs with business applications and implemented
                      major system enhancements to improve scalability and performance.
                    </p>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                      Collaborated directly with onsite teams and clients to gather requirements, define solution approaches, and lead
                      small project milestones to successful delivery.
                    </p>
                    <p className="text-[10px] font-mono font-bold text-cyan-600 uppercase tracking-widest pt-2">
                      Technologies Used: Python, Essential Project Cloud, Git
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 uppercase text-lg border-b border-slate-50 pb-1">Outsource to Mortgage Connect as Senior Software Engineer</h4>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                      Worked on enhancement and bug fixing for the AT Close application, specifically focusing on the barcode
                      processing module. The client was facing issues with reading barcodes from multiple document pages, and I
                      analyzed the root cause and implemented an improved solution using the SoftTek barcode library within a .NET-
                      based SOAP Web Service.
                    </p>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                      Collaborated directly with onsite teams and client stakeholders to understand requirements, define the solution
                      approach, and ensure accurate barcode extraction across different document formats. Delivered enhancements
                      that improved reliability and document processing accuracy.
                    </p>
                    <p className="text-[10px] font-mono font-bold text-cyan-600 uppercase tracking-widest pt-2">
                      Technologies Used: Dot NET SOAP Web Services, IIS, TFS, SoftTek Barcode Library.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 uppercase text-lg border-b border-slate-50 pb-1">Visionet Systems In-house Projects</h4>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                      For K-Electric Limited, a utility and energy provider in Karachi, I contributed to revamping their existing
                      SharePoint/.NET application which faced performance and scalability challenges. I designed and implemented the
                      new architecture using .NET Core 6 and Azure Cloud, leveraging services such as Virtual Machines, App Services,
                      Blob Storage, CDN, Key Vault, Azure Functions, Front Door, and VNet. I set up the project’s architecture, integrated
                      cloud services, and improved system performance, scalability, and maintainability.
                    </p>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                      For AKD Trading Private Limited, I focused on day-to-day feature enhancements, development, and support. Key
                      contributions included maintaining and improving bank statement processing, cash-in/cash-out workflows, and
                      other critical financial features, ensuring accuracy, performance, and user-friendly operation.
                    </p>
                    <p className="text-[10px] font-mono font-bold text-cyan-600 uppercase tracking-widest pt-2">
                      Technologies Used: Dot NET Core 6, Azure Cloud, Angular, Rabbit MQ. Git
                    </p>
                  </div>
                </div>
              </div>

              {/* Intelligenes */}
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 border-slate-900 pl-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-3xl font-black uppercase italic text-slate-900">Intelligenes</h3>
                    <p className="text-sm font-bold text-cyan-600 uppercase tracking-[0.2em]">Software Engineer | Karachi, Sindh (Onsite)</p>
                  </div>
                  <span className="text-sm font-mono text-slate-900 font-bold bg-slate-100 px-4 py-1 rounded-full mt-2 md:mt-0">SEPTEMBER 2019 – MAY 2021</span>
                </div>
                <div className="grid gap-8 pl-6 border-l-[1px] border-slate-200">
                  <div className="space-y-4">
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                      I started at Intelligence as an Associate Software Engineer and grew to be a Software Engineer, contributing to
                      multiple enterprise applications.
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-800 uppercase">For Diligent</h4>
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                        A .NET MVC-based solution for a medical service provider, I was responsible for development,
                        support, and key feature implementation. I redesigned a core functionality that handles tabular input from
                        providers. Previously, table data was dumped directly into the database as HTML elements, causing accuracy and
                        performance issues. I implemented a dynamic system where input of any table structure is converted into a structured format and stored efficiently in the database.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-800 uppercase">For Proper fleet</h4>
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                        An application built for managing fleets of data, I contributed to development from scratch. Key
                        responsibilities included implementing login/signup functionality, JWT-based authentication, email notifications via
                        SendGrid, push notifications, and Azure Function integration. The application was deployed on Azure App Service.
                      </p>
                    </div>
                    <p className="text-[10px] font-mono font-bold text-cyan-600 uppercase tracking-widest pt-2">
                      Technologies Used: Dot NET Core MVC, Html, CSS, JavaScript, Razor View, Azure DevOps, GitHub
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Skills Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
               <h3 className="text-sm font-mono text-slate-400 uppercase tracking-[0.6em] whitespace-nowrap italic font-bold">T e c h n i c a l S k i l l s</h3>
               <div className="h-[1px] w-full bg-slate-100" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div className="space-y-2">
                <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 flex items-center gap-2">Programming & Frameworks</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  VB.NET, .NET Framework, .NET Core, .NET 6/7/8, ASP.NET Web Forms, ASP.NET
                  MVC, .NET Web APIs (REST & SOAP), WCF Services, Node.js, Nest.js, Angular, React, JavaScript, TypeScript, HTML5,
                  CSS3, Bootstrap, jQuery
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 flex items-center gap-2">Cloud & DevOps</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  Microsoft Azure (App Service, Functions, Blob Storage, Key Vault, Front Door, VNet, CDN), CI/CD
                  with Azure DevOps, Git, GitHub, TFS, Application Insights, Production Deployment & Monitoring
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 flex items-center gap-2">Databases</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  SQL Server, MongoDB, Azure Cosmos DB, Data Modeling, Stored Procedures, Query Optimization
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 flex items-center gap-2">Messaging & Background Processing</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  ActiveMQ, Multithreading, Async Programming, Background Task Processing
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 flex items-center gap-2">Other Tools & Platforms</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  Jira, Confluence, Supabase, Vercel, SendGrid
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 flex items-center gap-2">Core Competencies</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  Full-stack development, Cloud-native application design, API integration, Microservices
                  architecture, System performance optimization, Agile methodologies, Code review & mentoring, Client
                  collaboration
                </p>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
               <h3 className="text-sm font-mono text-slate-400 uppercase tracking-[0.6em] whitespace-nowrap italic font-bold">E d u c a t i o n</h3>
               <div className="h-[1px] w-full bg-slate-100" />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-l-4 border-slate-100 pl-6">
              <div className="space-y-2">
                <span className="text-sm font-mono text-slate-900 font-bold bg-slate-100 px-4 py-1 rounded-full">DEC 2019</span>
                <h3 className="text-2xl font-black uppercase italic text-slate-900">Bachelor of Computer Science</h3>
                <p className="text-base text-slate-700 font-bold">Pakistan Air Force Karachi Institute of Economics & Technology | Karachi, Sindh</p>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                  <span className="text-cyan-600 font-bold flex items-center gap-2"><Award size={14} /> 3.8 GPA</span>
                  <span>•</span>
                  <span>Member of university’s Honor Society</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Signature */}
          <footer className="pt-20 text-center opacity-30 flex flex-col items-center gap-4">
            <ShieldCheck size={48} className="text-slate-900" />
            <p className="text-[9px] font-mono uppercase tracking-[0.6em]">Taha Khalid // Senior Full Stack Engineer // Enterprise Digital Archive</p>
          </footer>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; padding: 0 !important; margin: 0 !important; }
          .resume-content { 
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: auto !important;
            box-shadow: none !important;
            padding: 2cm !important;
            margin: 0 !important;
            overflow: visible !important;
            background: white !important;
            border-radius: 0 !important;
          }
          .fixed { display: none !important; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #06b6d4;
          border-radius: 10px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #06b6d4 transparent;
        }
      `}} />
    </motion.div>
  );
};

export default ResumeOverlay;