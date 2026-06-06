import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Hash, MessageSquare, Tag, Github, Linkedin, ExternalLink } from 'lucide-react';

const AnimatedTitle = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <div className="overflow-hidden flex flex-wrap justify-center gap-4 mb-4">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-bold mono tracking-tight text-white inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const ContactItem = ({ label, icon: Icon, placeholder, type = "text", required = false, name, value, onChange }: {
  label: string,
  icon: any,
  placeholder: string,
  type?: string,
  required?: boolean,
  name: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => (
  <div className="space-y-2 group">
    <label className="text-[10px] mono text-zinc-500 uppercase flex items-center gap-2 group-focus-within:text-cyan transition-colors">
      <Icon size={12} />
      {label} {required && <span className="text-cyan">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm mono text-white focus:outline-none focus:border-cyan focus:glow-cyan transition-all relative z-20"
    />
  </div>
);

const SocialCard = ({ icon: Icon, label, value, href }: { icon: any, label: string, value: string, href: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-card p-6 flex flex-col items-center gap-4 group border border-white/5 hover:border-cyan/50 hover:shadow-[0_0_20px_rgba(0,242,255,0.2)] transition-all duration-500"
  >
    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan/20 group-hover:glow-cyan group-hover:scale-110 transition-all duration-500">
      <Icon size={20} className="text-zinc-400 group-hover:text-cyan transition-colors" />
    </div>
    <div className="text-center transition-transform duration-300 group-hover:translate-x-1">
      <div className="text-[10px] mono text-zinc-500 uppercase tracking-widest mb-1 group-hover:text-cyan/70 transition-colors">{label}</div>
      <div className="text-sm font-bold mono group-hover:text-cyan group-hover:glow-cyan transition-colors flex items-center gap-2">
        {value}
        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  </motion.a>
);

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    systemId: '',
    number: '',
    purpose: ''
  });
  const [status, setStatus] = useState<'IDLE' | 'TRANSMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('TRANSMITTING');

    try {
      const FORM_ID = "meernyra";
      const endpoint = `https://formspree.io/f/${FORM_ID}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', systemId: '', number: '', purpose: '' });
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus('ERROR');
    } finally {
      setIsSubmitting(false);
      if (status !== 'SUCCESS') {
        setTimeout(() => setStatus('IDLE'), 3000);
      }
    }
  };

  return (
    <section id="contact" className="py-32 px-8 max-w-4xl mx-auto relative z-10">
      <div className="mb-16 text-center relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-cyan/10 border border-cyan flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,242,255,0.3)] animate-pulse">
          <Mail size={28} className="text-cyan glow-cyan" />
        </div>
        <AnimatedTitle text="Let's Connect" />
        <p className="text-zinc-500 mono text-sm tracking-widest uppercase">Initiate Secure Transmission</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
        <SocialCard 
          icon={Linkedin} 
          label="Professional" 
          value="LinkedIn" 
          href="https://www.linkedin.com/in/abhyoday-kumar-6aa715319/" 
        />
        <SocialCard 
          icon={Github} 
          label="Source Code" 
          value="GitHub" 
          href="https://github.com/Abhyoday-001" 
        />
        <SocialCard 
          icon={Mail} 
          label="Direct Comm" 
          value="Email" 
          href="mailto:abhyodaysingh993@gmail.com" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card p-8 md:p-12 border border-white/5 relative z-10"
      >
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContactItem
              label="Identification [Name]"
              icon={User}
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <ContactItem
              label="Communication Port [Email]"
              icon={Mail}
              placeholder="name@domain.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <ContactItem
              label="System ID [e.g. LinkedIn]"
              icon={Tag}
              placeholder="@username"
              name="systemId"
              value={formData.systemId}
              onChange={handleChange}
            />
            <ContactItem
              label="Secure Frequency [Number]"
              icon={Hash}
              placeholder="+1 234 567 890"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2 group">
            <label className="text-[10px] mono text-zinc-500 uppercase flex items-center gap-2 group-focus-within:text-cyan transition-colors">
              <MessageSquare size={12} />
              Message Payload
            </label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              rows={4}
              placeholder="Define project scope and intent..."
              className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-sm mono text-white focus:outline-none focus:border-cyan focus:glow-cyan transition-all resize-none relative z-20"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || status === 'SUCCESS'}
            whileHover={{ scale: status === 'SUCCESS' ? 1 : 1.02 }}
            whileTap={{ scale: status === 'SUCCESS' ? 1 : 0.98 }}
            className={`w-full py-4 rounded-lg transition-all relative z-20 mono font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 ${
              status === 'SUCCESS'
                ? 'border border-green-500 bg-green-500/10 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                : 'border border-cyan bg-cyan/10 text-cyan hover:bg-cyan hover:text-black hover:shadow-[0_0_30px_rgba(0,242,255,0.4)]'
            }`}
          >
            {status === 'TRANSMITTING' ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Synchronizing...
              </span>
            ) : status === 'SUCCESS' ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-black text-[10px]">✓</span>
                </div>
                Nexus Link Established
              </span>
            ) : status === 'ERROR' ? (
              <span className="flex items-center gap-2 text-red-400">
                Connection Failed - Retry
              </span>
            ) : (
              <>
                <Send size={18} />
                Transmit Payload
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
