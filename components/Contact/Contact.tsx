import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Sparkles, MailCheck, Terminal, Mail, MessageSquareShare, ShieldAlert, Activity, WifiOff, Zap, ShieldCheck, Clock, FileCheck } from 'lucide-react';

const BrandIcons = {
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>(["SYSTEM_READY", "AWAITING_INPUT"]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-3), msg]);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    addLog("INIT_HANDSHAKE_WEB3");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "b58cf8fa-27b7-46c1-972e-a1c464a6d7b2",
          name: formData.name,
          email: formData.email,
          subject: `Strategic Inquiry: ${formData.subject}`,
          message: formData.message,
          from_name: "Taha's Enterprise Portfolio"
        })
      });

      const result = await response.json();

      if (result.success) {
        addLog("TRANSFER_COMPLETE_200");
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || "Relay Blocked");
      }
    } catch (err) {
      addLog("RELAY_FAILED_CRITICAL");
      setStatus('error');
    }
  };

  const manualEmailRelay = () => {
    addLog("FALLBACK_MANUAL_INIT");
    const mailtoBody = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ASubject: ${formData.subject}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = `mailto:iamtahaalikhalid@gmail.com?subject=Strategic Partnership Inquiry: ${formData.subject}&body=${mailtoBody}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 relative">
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-slate-950/98 backdrop-blur-3xl"
          >
            <div className="glass-bright p-5 md:p-7 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 w-full max-w-xl flex flex-col items-center gap-4 shadow-[0_0_150px_rgba(6,182,212,0.15)] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              
              {/* Shrunken Success Icon */}
              <div className="w-14 h-14 md:w-16 md:h-16 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
                <MailCheck size={32} />
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-display font-black text-3xl md:text-5xl uppercase tracking-tighter italic leading-none">
                  TRANSMISSION SUCCESS
                </h4>
                
                <p className="text-slate-300 text-[10px] md:text-base leading-relaxed max-w-sm mx-auto font-light">
                  Your message was delivered to Taha Khalid. He will respond to your email address shortly.
                </p>

                {/* Shrunken Receipt Box */}
                <div className="p-3 md:p-5 bg-slate-950/60 rounded-[1.5rem] border border-white/5 space-y-2 shadow-inner text-left font-mono text-[9px] md:text-[11px]">
                   <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-[0.2em] mb-1">
                     <ShieldCheck size={14} /> VERIFIED_DELIVERY
                   </div>
                   
                   <div className="space-y-1">
                     <div className="flex items-start gap-4">
                        <span className="text-slate-500 shrink-0">Recipient:</span>
                        <span className="text-white font-bold">Taha Khalid</span>
                     </div>
                     <div className="flex items-start gap-4">
                        <span className="text-slate-500 shrink-0">Protocol:</span>
                        <span className="text-white font-bold italic">Secure_Uplink_v12</span>
                     </div>
                   </div>
                </div>
              </div>

              <button 
                onClick={() => setStatus('idle')}
                className="group relative px-10 py-3.5 bg-white text-slate-950 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] overflow-hidden hover:bg-cyan-500 hover:text-white transition-all shadow-2xl active:scale-95"
              >
                <span className="relative z-10">DISMISS MESSAGE</span>
                <div className="absolute inset-0 bg-cyan-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-mono tracking-[0.5em] uppercase">
              <Sparkles size={14} /> Global_Uplink_Node
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-black text-white leading-[0.9] uppercase tracking-tighter italic">
              Initialize <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Contact.</span>
            </h2>
            <p className="text-slate-400 text-xl font-light leading-relaxed max-w-xl">
              I am always open to discussing new opportunities, technical architecture, or high-impact engineering projects.
            </p>
          </motion.div>

          <div className="space-y-6">
            <a href="mailto:iamtahaalikhalid@gmail.com" className="flex items-center gap-6 p-6 glass rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-slate-950 transition-all shadow-inner"><Mail size={24} /></div>
              <div className="relative z-10">
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] mb-1">Direct Relay</p>
                <p className="text-lg md:text-xl font-bold text-white tracking-tight">iamtahaalikhalid@gmail.com</p>
              </div>
            </a>
            <a href="https://wa.me/923298378093" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 glass rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all shadow-inner"><BrandIcons.WhatsApp /></div>
              <div className="relative z-10">
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] mb-1">Secure Instant</p>
                <p className="text-lg md:text-xl font-bold text-white tracking-tight">+92 329 8378093</p>
              </div>
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-[3.5rem] border border-white/10 relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-cyan-600/10 transition-all duration-700"></div>
          
          <form className="space-y-8 relative z-10" onSubmit={handleSend}>
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Personnel Name</label>
                <span className="text-[9px] font-mono text-cyan-500/40 tracking-widest">INPUT_01</span>
              </div>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Ex. Taha Khalid" required className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-5 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-white placeholder:text-slate-800 font-medium" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Email Address</label>
                <span className="text-[9px] font-mono text-cyan-500/40 tracking-widest">INPUT_02</span>
              </div>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="your-email@provider.com" required className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-5 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-white placeholder:text-slate-800 font-medium" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Subject</label>
                <span className="text-[9px] font-mono text-cyan-500/40 tracking-widest">INPUT_03</span>
              </div>
              <input type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="Strategic Partnership" required className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-5 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-white placeholder:text-slate-800 font-medium" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Message</label>
                <span className="text-[9px] font-mono text-cyan-500/40 tracking-widest">INPUT_04</span>
              </div>
              <textarea rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Describe your technical requirements..." required className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-5 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-white placeholder:text-slate-800 resize-none font-medium" />
            </div>

            {status === 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 space-y-5">
                <div className="flex items-center gap-3 text-red-400 font-bold text-xs uppercase tracking-widest">
                  <ShieldAlert size={18} /> Relay Interrupted
                </div>
                <p className="text-[10px] text-slate-400 font-mono leading-relaxed uppercase tracking-widest">
                  The AJAX relay was blocked by your browser's security settings. Use the fail-safe manual uplink to send directly.
                </p>
                <button 
                  type="button"
                  onClick={manualEmailRelay}
                  className="w-full py-4 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-red-600 transition-all shadow-xl"
                >
                  <MessageSquareShare size={16} /> Manual Email Uplink (Fail-Safe)
                </button>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className={`w-full py-6 rounded-2xl font-black flex items-center justify-center gap-4 group transition-all relative overflow-hidden shadow-2xl ${
                status === 'success' ? 'bg-emerald-500 text-white' : 
                status === 'sending' ? 'bg-slate-800 text-slate-400' : 
                status === 'error' ? 'hidden' : 'bg-white text-slate-950'
              }`}
            >
              {status === 'idle' && <> <span className="uppercase tracking-[0.3em] text-xs">Establish Link</span> <Send className="w-4 h-4" /> </>}
              {status === 'sending' && <> <Loader2 className="w-5 h-5 animate-spin" /> <span className="uppercase tracking-[0.3em] text-xs">Relaying...</span> </>}
              {status === 'success' && <> <CheckCircle2 className="w-5 h-5" /> <span className="uppercase tracking-[0.3em] text-xs">Link Secured</span> </>}
            </motion.button>
            
            {/* DIAGNOSTIC TERMINAL */}
            <div className="p-5 bg-slate-950/80 rounded-2xl border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Terminal size={12} className="text-cyan-400" />
                  RELAY_DIAGNOSTICS
                </div>
                <div className="flex items-center gap-2">
                   {status === 'sending' && <Activity size={10} className="text-cyan-400 animate-pulse" />}
                   {status === 'idle' && <Zap size={10} className="text-slate-700" />}
                   {status === 'error' && <WifiOff size={10} className="text-red-500" />}
                </div>
              </div>
              <div className="space-y-1 font-mono text-[9px]">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-slate-800">[{i}]</span>
                    <span className={log.includes("FAILED") ? "text-red-500" : log.includes("COMPLETE") ? "text-emerald-400" : "text-slate-400"}>
                      {log}
                    </span>
                  </div>
                ))}
                {status === 'sending' && (
                  <div className="text-cyan-400 animate-pulse flex items-center gap-1">
                    <span>{'>'}</span> EXECUTING_PAYLOAD_TRANSFER...
                  </div>
                )}
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;