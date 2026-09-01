import React, { useState } from 'react';
import ToolHelmet from '../components/common/ToolHelmet';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple form submission via mailto
    const mailtoLink = `mailto:support@minitools.app?subject=Message from ${encodeURIComponent(
      formData.name
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <ToolHelmet
        title="Contact MiniTools"
        description="Get in touch with the MiniTools team. Send feedback, report bugs, or suggest new tools."
        canonical="https://minitools-silk.vercel.app/contact"
      />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        <div className="prose prose-invert max-w-none mb-8">
          <p>
            Have feedback, found a bug, or want to suggest a new tool? We'd love to hear from you!
          </p>
        </div>

        <div className="card p-6 mb-8">
          {submitted && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg">
              ✅ Thank you for reaching out! Your message has been sent.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="input-field h-32 resize-none"
                placeholder="Tell us what you think..."
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Note: This form uses your email client. If it doesn't open, you can email us directly 
            at <strong>support@minitools.app</strong>.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mb-3">Other Ways to Reach Us</h2>
          <p>
            Email us anytime at <strong>support@minitools.app</strong> with feedback, bug reports, 
            or tool suggestions.
          </p>
        </div>
      </div>
    </>
  );
}
