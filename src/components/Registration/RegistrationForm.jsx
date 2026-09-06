import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitRegistration } from '../../services/registrationService';
import { eventData } from '../../data/eventData';
import { Copy, Check, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

const initialData = {
  captain: { name: '', email: '', phone: '', college: '', course: '', year: '', github: '', linkedin: '' },
  team: { participationType: 'Solo', name: '', size: 1, members: [] },
  project: { domain: '', idea: '', problemArea: '', technologies: '', hackathonExperience: '' },
  consent: false
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[6-9]\d{9}$/; // Indian phone number format

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [teamId, setTeamId] = useState('');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');

  // Draft Management
  useEffect(() => {
    const draft = localStorage.getItem('doom_reg_draft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setData(parsed);
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, []);

  useEffect(() => {
    if (status !== 'success') {
      localStorage.setItem('doom_reg_draft', JSON.stringify(data));
    }
  }, [data, status]);

  // Validation Engine
  const validateStep = (currentStep) => {
    let newErrors = {};
    
    // Step 1: Captain details
    if (currentStep === 1) {
      if (!data.captain.name.trim() || data.captain.name.trim().length < 2) 
        newErrors.name = "Valid name is required (min 2 characters)";
      
      const email = data.captain.email.trim().toLowerCase();
      if (!EMAIL_REGEX.test(email)) 
        newErrors.email = "Valid email format required (e.g., hacker@domain.com)";
      
      const phone = data.captain.phone.replace(/\D/g, '');
      if (!PHONE_REGEX.test(phone)) 
        newErrors.phone = "Valid 10-digit Indian phone number required";
      
      if (!data.captain.college.trim()) 
        newErrors.college = "College/Institute is required";
    } 
    
    // Step 2: Team Configuration
    else if (currentStep === 2) {
      if (data.team.participationType === 'Team') {
        if (!data.team.name.trim()) 
          newErrors.teamName = "Team Name is required for Team participation";
      }
    } 
    
    // Step 3: Team Members
    else if (currentStep === 3) {
      if (data.team.participationType === 'Team') {
        const minRequired = eventData.teamSize.min - 1; // minus captain
        const maxAllowed = eventData.teamSize.max - 1;
        
        if (data.team.members.length < minRequired && !eventData.teamSize.isTbd) {
          newErrors.teamGeneral = `You need at least ${minRequired} additional member(s).`;
        }

        const allEmails = [data.captain.email.trim().toLowerCase()];
        
        data.team.members.forEach((member, i) => {
          if (!member.name.trim()) newErrors[`member_${i}_name`] = "Name is required";
          
          const mEmail = member.email.trim().toLowerCase();
          if (!EMAIL_REGEX.test(mEmail)) {
            newErrors[`member_${i}_email`] = "Valid email required";
          } else if (allEmails.includes(mEmail)) {
            newErrors[`member_${i}_email`] = "Duplicate email detected in team";
          } else {
            allEmails.push(mEmail);
          }
          
          const mPhone = member.phone.replace(/\D/g, '');
          if (!PHONE_REGEX.test(mPhone)) {
            newErrors[`member_${i}_phone`] = "Valid 10-digit phone required";
          }
        });
      }
    } 
    
    // Step 4: Project is optional, no strict validation unless required
    // Step 5: Review/Consent
    else if (currentStep === 5) {
      if (!data.consent) newErrors.consent = "You must accept the terms to proceed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(prev => prev + 1);
  };
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    setStatus('submitting');
    setSubmitMessage('');
    
    // Generate secure pseudo-random ID: HTD-2026-A1B2C3
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < 6; i++) {
      randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const regId = `HTD-2026-${randomString}`;
    
    // Sanitize data before sending
    const sanitizedData = { ...data };
    sanitizedData.captain.email = sanitizedData.captain.email.trim().toLowerCase();
    sanitizedData.team.members = sanitizedData.team.members.map(m => ({
      ...m,
      email: m.email.trim().toLowerCase()
    }));

    const finalPayload = { ...sanitizedData, registrationId: regId, timestamp: new Date().toISOString() };
    
    const response = await submitRegistration(finalPayload);
    
    if (response.success) {
      setTeamId(regId);
      setStatus('success');
      localStorage.removeItem('doom_reg_draft');
    } else {
      setStatus('error');
      setSubmitMessage(response.error || "Registration submission failed. Please try again or contact support.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(teamId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper renderer
  const renderInput = (label, value, key, objPath, required = false, type = "text", placeholder = "") => {
    const errorKey = objPath[0] === "captain" ? key : objPath[0] === "team" ? (key === "name" ? "teamName" : key) : key;
    return (
      <div className="mb-4">
        <label className="block text-metal-400 text-xs tracking-widest uppercase mb-2">
          {label} {required && <span className="text-gamma-500">*</span>}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            setData(prev => {
              const next = { ...prev };
              if (objPath.length === 1) next[objPath[0]][key] = val;
              if (objPath.length === 2) next[objPath[0]][objPath[1]][key] = val;
              return next;
            });
            // Clear error on typing
            if (errors[errorKey]) {
              setErrors(prev => ({ ...prev, [errorKey]: null }));
            }
          }}
          className={cn(
            "w-full bg-background-900 border text-white px-4 py-3 rounded-sm focus:outline-none transition-colors placeholder-metal-700",
            errors[errorKey] ? "border-red-500 focus:border-red-500" : "border-metal-800 focus:border-gamma-500"
          )}
        />
        {errors[errorKey] && <p className="text-red-500 text-xs mt-1 font-bold">{errors[errorKey]}</p>}
      </div>
    );
  };

  return (
    <div className="bg-background-800 border border-background-700 p-6 md:p-10 rounded-sm shadow-2xl relative overflow-hidden min-h-[500px]">
      <div className="absolute top-0 left-0 w-full h-1 bg-background-900">
        <motion.div 
          className="h-full bg-gamma-500" 
          initial={{ width: 0 }}
          animate={{ width: `${(step / 6) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-gamma-500/10 border border-gamma-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(57,255,136,0.3)]">
              <Check size={40} className="text-gamma-500" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-2 tracking-widest uppercase">REGISTRATION SUCCESSFUL</h2>
            <p className="text-metal-400 mb-8 max-w-md mx-auto">Your details have been securely transmitted to the DOOM protocol mainframe.</p>
            
            <div className="bg-background-900 border border-metal-800 p-6 rounded-sm inline-block min-w-[300px]">
              <p className="text-metal-500 text-xs uppercase tracking-widest mb-1">REGISTRATION ID</p>
              <div className="flex items-center justify-between gap-4">
                <span className="text-2xl font-mono text-gamma-400 font-bold">{teamId}</span>
                <button onClick={handleCopy} className="text-metal-400 hover:text-white transition-colors" aria-label="Copy ID">
                  {copied ? <Check size={20} className="text-gamma-500" /> : <Copy size={20} />}
                </button>
              </div>
            </div>
            <p className="text-metal-600 text-xs mt-4">Save this ID. You will need it for future communications.</p>
          </motion.div>

        ) : status === 'submitting' ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-32"
          >
            <div className="w-16 h-16 border-4 border-metal-800 border-t-gamma-500 rounded-full animate-spin mb-6"></div>
            <p className="text-gamma-500 font-mono tracking-widest animate-pulse">TRANSMITTING REGISTRATION DATA...</p>
            <p className="text-metal-500 text-xs mt-2">Connecting to secure endpoint</p>
          </motion.div>

        ) : (
          <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="mb-8 border-b border-metal-800 pb-6">
              <h3 className="text-gamma-500 font-mono text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
                Step 0{step} / 05
                {localStorage.getItem('doom_reg_draft') && step === 1 && (
                  <span className="bg-metal-800/50 text-metal-400 px-2 py-0.5 rounded-sm border border-metal-700">DRAFT RESTORED</span>
                )}
              </h3>
              <h2 className="text-2xl font-display font-bold text-white tracking-widest uppercase">
                {step === 1 && "Participant / Captain Intel"}
                {step === 2 && "Squad Configuration"}
                {step === 3 && "Squad Members"}
                {step === 4 && "Mission Parameters (Project)"}
                {step === 5 && "Review & Authenticate"}
              </h2>
            </div>

            {/* Error Message Header for failed submission */}
            {status === 'error' && step === 5 && (
              <div className="mb-6 bg-red-500/10 border border-red-500/50 p-4 rounded-sm flex items-start gap-3">
                <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-500 font-bold uppercase tracking-widest text-sm mb-1">REGISTRATION FAILED</h4>
                  <p className="text-red-400 text-sm">{submitMessage}</p>
                </div>
              </div>
            )}

            {/* Step 1: Captain */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                {renderInput("Full Name", data.captain.name, "name", ["captain"], true)}
                {renderInput("Email Address", data.captain.email, "email", ["captain"], true, "email", "student@domain.com")}
                {renderInput("Phone Number", data.captain.phone, "phone", ["captain"], true, "tel", "9876543210")}
                {renderInput("College / University", data.captain.college, "college", ["captain"], true)}
                {renderInput("Course / Program", data.captain.course, "course", ["captain"])}
                {renderInput("Year of Study", data.captain.year, "year", ["captain"])}
                {renderInput("GitHub Profile URL", data.captain.github, "github", ["captain"], false, "url", "https://github.com/username")}
                {renderInput("LinkedIn Profile URL", data.captain.linkedin, "linkedin", ["captain"], false, "url", "https://linkedin.com/in/username")}
              </div>
            )}

            {/* Step 2: Team */}
            {step === 2 && (
              <div>
                <label className="block text-metal-400 text-xs tracking-widest uppercase mb-4">Participation Type</label>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {['Solo', 'Team'].map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setData({ ...data, team: { ...data.team, participationType: type, members: [] } });
                        if (errors.teamName) setErrors(prev => ({ ...prev, teamName: null }));
                      }}
                      className={cn(
                        "py-4 border rounded-sm font-bold tracking-widest uppercase transition-all",
                        data.team.participationType === type 
                          ? "bg-gamma-500/10 border-gamma-500 text-gamma-500 shadow-[0_0_15px_rgba(57,255,136,0.1)]" 
                          : "bg-background-900 border-metal-800 text-metal-400 hover:border-metal-600"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {data.team.participationType === 'Team' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    {renderInput("Squad Name", data.team.name, "name", ["team"], true, "text", "Enter your team name")}
                    <p className="text-metal-500 text-xs mt-2 p-3 bg-background-900 border border-metal-800 rounded-sm">
                      <AlertCircle size={14} className="inline mr-2 text-gamma-500" /> 
                      {eventData.teamSize.isTbd 
                        ? "Team size constraints will be announced soon. You can add members in the next step." 
                        : `Allowed team size: ${eventData.teamSize.min} to ${eventData.teamSize.max} members (including captain).`}
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 3: Members */}
            {step === 3 && (
              <div>
                {data.team.participationType === 'Solo' ? (
                  <div className="py-20 text-center text-metal-400 bg-background-900 border border-metal-800 rounded-sm">
                    <p className="font-mono uppercase tracking-widest">Solo Operation Confirmed</p>
                    <p className="text-sm mt-2">You can proceed to the next step.</p>
                  </div>
                ) : (
                  <div>
                    {errors.teamGeneral && (
                      <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-sm text-red-500 text-sm font-bold">
                        {errors.teamGeneral}
                      </div>
                    )}
                    
                    {data.team.members.map((member, index) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        key={index} 
                        className="bg-background-900 border border-metal-800 p-5 mb-4 rounded-sm relative group"
                      >
                        <div className="absolute top-4 right-4">
                          <button 
                            onClick={() => {
                              const newMembers = [...data.team.members];
                              newMembers.splice(index, 1);
                              setData({ ...data, team: { ...data.team, members: newMembers } });
                            }}
                            className="text-red-500/70 hover:text-red-500 text-xs uppercase tracking-widest font-bold transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                        <h4 className="text-gamma-500 font-mono text-sm mb-6 border-l-2 border-gamma-500 pl-2">MEMBER 0{index + 2}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                          <div className="mb-4">
                            <label className="block text-metal-400 text-xs tracking-widest uppercase mb-2">Name *</label>
                            <input
                              type="text"
                              value={member.name}
                              onChange={e => {
                                const newMembers = [...data.team.members];
                                newMembers[index].name = e.target.value;
                                setData({ ...data, team: { ...data.team, members: newMembers } });
                                if(errors[`member_${index}_name`]) setErrors(prev => ({...prev, [`member_${index}_name`]: null}));
                              }}
                              className={cn("w-full bg-background-800 border text-white px-3 py-2 rounded-sm outline-none transition-colors", errors[`member_${index}_name`] ? "border-red-500 focus:border-red-500" : "border-metal-800 focus:border-gamma-500")}
                            />
                            {errors[`member_${index}_name`] && <p className="text-red-500 text-xs mt-1 font-bold">{errors[`member_${index}_name`]}</p>}
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-metal-400 text-xs tracking-widest uppercase mb-2">Email *</label>
                            <input
                              type="email"
                              value={member.email}
                              onChange={e => {
                                const newMembers = [...data.team.members];
                                newMembers[index].email = e.target.value;
                                setData({ ...data, team: { ...data.team, members: newMembers } });
                                if(errors[`member_${index}_email`]) setErrors(prev => ({...prev, [`member_${index}_email`]: null}));
                              }}
                              className={cn("w-full bg-background-800 border text-white px-3 py-2 rounded-sm outline-none transition-colors", errors[`member_${index}_email`] ? "border-red-500 focus:border-red-500" : "border-metal-800 focus:border-gamma-500")}
                            />
                            {errors[`member_${index}_email`] && <p className="text-red-500 text-xs mt-1 font-bold">{errors[`member_${index}_email`]}</p>}
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-metal-400 text-xs tracking-widest uppercase mb-2">Phone *</label>
                            <input
                              type="tel"
                              value={member.phone || ''}
                              onChange={e => {
                                const newMembers = [...data.team.members];
                                newMembers[index].phone = e.target.value;
                                setData({ ...data, team: { ...data.team, members: newMembers } });
                                if(errors[`member_${index}_phone`]) setErrors(prev => ({...prev, [`member_${index}_phone`]: null}));
                              }}
                              className={cn("w-full bg-background-800 border text-white px-3 py-2 rounded-sm outline-none transition-colors", errors[`member_${index}_phone`] ? "border-red-500 focus:border-red-500" : "border-metal-800 focus:border-gamma-500")}
                            />
                            {errors[`member_${index}_phone`] && <p className="text-red-500 text-xs mt-1 font-bold">{errors[`member_${index}_phone`]}</p>}
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-metal-400 text-xs tracking-widest uppercase mb-2">College/Institute</label>
                            <input
                              type="text"
                              value={member.college || ''}
                              onChange={e => {
                                const newMembers = [...data.team.members];
                                newMembers[index].college = e.target.value;
                                setData({ ...data, team: { ...data.team, members: newMembers } });
                              }}
                              className="w-full bg-background-800 border border-metal-800 text-white px-3 py-2 rounded-sm focus:border-gamma-500 outline-none transition-colors"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {(!eventData.teamSize.max || data.team.members.length < eventData.teamSize.max - 1) ? (
                      <button 
                        onClick={() => setData({ ...data, team: { ...data.team, members: [...data.team.members, { name: '', email: '', phone: '', college: '' }] } })}
                        className="w-full py-5 border border-dashed border-metal-700 text-metal-400 hover:text-gamma-400 hover:border-gamma-500 hover:bg-gamma-500/5 transition-all uppercase tracking-widest text-sm font-bold rounded-sm"
                      >
                        + ADD SQUAD MEMBER
                      </button>
                    ) : (
                      <p className="text-metal-500 text-sm text-center bg-background-900 py-3 rounded-sm">Maximum squad size reached.</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Project */}
            {step === 4 && (
              <div className="grid grid-cols-1 gap-4">
                <div className="mb-4">
                  <label className="block text-metal-400 text-xs tracking-widest uppercase mb-2">Target Domain (Optional)</label>
                  <select 
                    value={data.project.domain}
                    onChange={(e) => setData({ ...data, project: { ...data.project, domain: e.target.value } })}
                    className="w-full bg-background-900 border border-metal-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-gamma-500 transition-colors"
                  >
                    <option value="">Select a domain (TBD)</option>
                    {eventData.domains.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                </div>
                {renderInput("Project Idea / Problem Area (Optional)", data.project.idea, "idea", ["project"])}
                {renderInput("Tech Stack / Technologies (Optional)", data.project.technologies, "technologies", ["project"])}
              </div>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <div>
                <div className="bg-background-900 border border-metal-800 p-6 rounded-sm mb-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gamma-500"></div>
                  <h4 className="text-gamma-400 font-mono mb-4 border-b border-metal-800 pb-2 text-sm uppercase tracking-widest">CAPTAIN PROFILE</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-metal-500 block text-[10px] uppercase tracking-widest">NAME</span> <span className="text-white">{data.captain.name}</span></div>
                    <div><span className="text-metal-500 block text-[10px] uppercase tracking-widest">EMAIL</span> <span className="text-white">{data.captain.email}</span></div>
                    <div><span className="text-metal-500 block text-[10px] uppercase tracking-widest">PHONE</span> <span className="text-white">{data.captain.phone}</span></div>
                    <div><span className="text-metal-500 block text-[10px] uppercase tracking-widest">COLLEGE</span> <span className="text-white">{data.captain.college}</span></div>
                  </div>
                </div>

                <div className="bg-background-900 border border-metal-800 p-6 rounded-sm mb-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-metal-600"></div>
                  <h4 className="text-metal-400 font-mono mb-4 border-b border-metal-800 pb-2 text-sm uppercase tracking-widest">SQUAD PROFILE</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div><span className="text-metal-500 block text-[10px] uppercase tracking-widest">TYPE</span> <span className="text-white">{data.team.participationType}</span></div>
                    {data.team.participationType === 'Team' && <div><span className="text-metal-500 block text-[10px] uppercase tracking-widest">NAME</span> <span className="text-white">{data.team.name}</span></div>}
                  </div>
                  {data.team.members.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-metal-800/50">
                      <span className="text-metal-500 block text-[10px] uppercase tracking-widest mb-3">MEMBERS</span>
                      <ul className="text-white text-sm space-y-3">
                        {data.team.members.map((m, i) => (
                          <li key={i} className="flex flex-col bg-background-800 p-3 rounded-sm border border-metal-800/50">
                            <span className="font-bold">{m.name}</span>
                            <span className="text-metal-400 text-xs font-mono">{m.email} | {m.phone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-start gap-4 p-4 border border-metal-800 bg-background-900 rounded-sm hover:border-gamma-500 transition-colors">
                  <input 
                    type="checkbox" 
                    id="consent"
                    checked={data.consent}
                    onChange={(e) => {
                      setData({ ...data, consent: e.target.checked });
                      if (errors.consent) setErrors(prev => ({ ...prev, consent: null }));
                    }}
                    className="mt-1 w-5 h-5 accent-gamma-500 bg-background-900 border-metal-800 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-sm text-metal-300 cursor-pointer leading-relaxed">
                    I confirm that the information provided is accurate. I authorize Hack4Tech to process this data for event coordination. I agree to abide by the official Hack the Doom Rulebook and Code of Conduct.
                  </label>
                </div>
                {errors.consent && <p className="text-red-500 text-sm mt-2 font-bold ml-9">{errors.consent}</p>}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-background-700">
              {step > 1 ? (
                <button 
                  onClick={prevStep}
                  disabled={status === 'submitting'}
                  className="flex items-center gap-2 text-metal-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold disabled:opacity-50"
                >
                  <ChevronLeft size={16} /> Back
                </button>
              ) : <div></div>}

              {step < 5 ? (
                <button 
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-gamma-500 text-background-900 px-6 py-3 rounded-sm font-bold tracking-widest uppercase hover:bg-gamma-400 transition-colors glow-box"
                >
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={status === 'submitting'}
                  className="flex items-center gap-2 bg-gamma-500 text-background-900 px-8 py-3 rounded-sm font-bold tracking-widest uppercase hover:bg-gamma-400 transition-colors glow-box disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  INITIATE REGISTRATION
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
