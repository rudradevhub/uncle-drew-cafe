'use client';

import React, { useState } from 'react';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    if (id === 'phone') {
      setFormData(prev => ({ ...prev, [id]: value.replace(/[^0-9]/g, '') }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

   try {
      // Use a relative path so it automatically works on local and Vercel production
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Validation failed');
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' }); 

      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);

    } catch (error: any) {
      console.error('Submission error:', error);
      setFormStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col space-y-12">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[#1A1A1A]/20 pb-12">
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] opacity-50 mb-2 font-mono">Location</h3>
          <p className="text-lg font-medium leading-relaxed">
            23 Groom St<br />
            Clifton Hill VIC 3068<br />
            Australia
          </p>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] opacity-50 mb-2 font-mono">Hours</h3>
          <p className="text-lg font-medium leading-relaxed">
            Mon – Fri: 07:00 – 18:00<br />
            Sat – Sun: 08:00 – 17:00
          </p>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] opacity-50 mb-2 font-mono">Direct Line</h3>
          <p className="text-lg font-medium">
            +61 (03) 9489 2077
          </p>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] opacity-50 mb-2 font-mono">Inquiries</h3>
          <p className="text-lg font-medium whitespace-nowrap">
            e-uncledrewcafe@gmail.com
          </p>
        </div>
      </div>

      <div className="relative p-6 border-2 border-dashed border-[#8B3A2B]/40 bg-[#F7F2E8] rounded-sm transform rotate-[-1deg] max-w-md">
        <div className="absolute -top-3 right-4 px-3 py-0.5 bg-[#8B3A2B] text-white text-[10px] uppercase tracking-widest font-bold">
          Policy Notice
        </div>
        <h4 
          className="text-xl font-bold uppercase tracking-wider text-[#8B3A2B] mb-1"
          style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
        >
          No Bookings
        </h4>
        <p className="text-sm opacity-80 font-medium tracking-wide">
          We operate on a strictly walk-in basis to ensure everyone gets a fair seat at the counter. Come on by, we'll find a place for you.
        </p>
      </div>

      <div className="pt-4">
        <h3 
          className="text-2xl font-bold uppercase tracking-wide mb-6"
          style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
        >
          Send a Message
        </h3>

        {formStatus === 'success' ? (
          <div className="p-8 border border-[#1A1A1A] bg-[#EFEADF] text-center">
            <h4 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-heading, sans-serif)' }}>
              Message Received
            </h4>
            <p className="text-sm opacity-80">Thank you. We'll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            
            <div className="relative group pt-4">
              <input 
                type="text" 
                id="name"
                required 
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                className="block w-full bg-transparent py-2 text-lg border-b border-[#1A1A1A]/30 focus:border-transparent outline-none appearance-none peer"
              />
              <label htmlFor="name" className="absolute left-0 top-2 text-sm uppercase tracking-wider opacity-60 duration-300 transform -translate-y-7 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 pointer-events-none">
                Your Name
              </label>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1A1A1A] transition-all duration-300 group-focus-within:w-full" />
            </div>

            <div className="relative group pt-4">
              <input 
                type="email" 
                id="email"
                required 
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                title="Please enter a complete email address (e.g., name@example.com)"
                className="block w-full bg-transparent py-2 text-lg border-b border-[#1A1A1A]/30 focus:border-transparent outline-none appearance-none peer [&:not(:placeholder-shown):invalid]:text-[#8B3A2B] [&:not(:placeholder-shown):invalid]:border-b-[#8B3A2B]"
              />
              <label htmlFor="email" className="absolute left-0 top-2 text-sm uppercase tracking-wider opacity-60 duration-300 transform -translate-y-7 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 pointer-events-none peer-[&:not(:placeholder-shown):invalid]:text-[#8B3A2B]">
                Email Address
              </label>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1A1A1A] transition-all duration-300 group-focus-within:w-full peer-[&:not(:placeholder-shown):invalid]:bg-[#8B3A2B]" />
              
              <p className="absolute top-full mt-2 left-0 text-[10px] uppercase tracking-wider font-bold text-[#8B3A2B] opacity-0 peer-[&:not(:placeholder-shown):invalid]:opacity-100 transition-opacity duration-300 pointer-events-none">
                Must include a valid domain (e.g., .com)
              </p>
            </div>

            <div className="relative group pt-4">
              <input 
                type="tel" 
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder=" "
                className="block w-full bg-transparent py-2 text-lg border-b border-[#1A1A1A]/30 focus:border-transparent outline-none appearance-none peer"
              />
              <label htmlFor="phone" className="absolute left-0 top-2 text-sm uppercase tracking-wider opacity-60 duration-300 transform -translate-y-7 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 pointer-events-none">
                Phone Number (Optional)
              </label>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1A1A1A] transition-all duration-300 group-focus-within:w-full" />
            </div>

            <div className="relative group pt-4">
              <textarea 
                id="message"
                rows={4} 
                required 
                value={formData.message}
                onChange={handleChange}
                maxLength={500}
                placeholder=" "
                className="block w-full bg-transparent py-2 text-lg border-b border-[#1A1A1A]/30 focus:border-transparent outline-none appearance-none resize-none peer"
              />
              <label htmlFor="message" className="absolute left-0 top-2 text-sm uppercase tracking-wider opacity-60 duration-300 transform -translate-y-7 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 pointer-events-none">
                Your Message
              </label>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1A1A1A] transition-all duration-300 group-focus-within:w-full" />
              
              <p className="absolute top-full mt-2 right-0 text-[10px] font-mono opacity-40 pointer-events-none">
                Max 500 characters
              </p>
            </div>

            {formStatus === 'error' && (
              <p className="text-[#8B3A2B] text-sm font-bold uppercase tracking-wider">
                {errorMessage}
              </p>
            )}

            <button 
              type="submit" 
              disabled={formStatus === 'submitting'}
              className="
                relative inline-block px-10 py-3.5 mt-4
                bg-[#F7F4EC] border border-[#D1C8B8] rounded-[4px]
                text-[#1A1A1A] font-semibold text-[15px] uppercase tracking-[0.18em]
                shadow-[0_8px_18px_rgba(0,0,0,0.12),inset_1px_1px_0_rgba(255,255,255,0.4)]
                transition-all duration-300 ease-out
                hover:bg-[#F0EAE0] hover:-translate-y-[2px]
                hover:shadow-[0_12px_24px_rgba(0,0,0,0.15),inset_1px_1px_0_rgba(255,255,255,0.5)]
                active:translate-y-[1px]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
            >
              {formStatus === 'submitting' ? 'Sending...' : 'Send Message →'}
            </button>

          </form>
        )}
      </div>
    </div>
  );
}