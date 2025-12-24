'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, UserCheck, Zap, Star, TrendingUp, Users, Building2, CheckCircle2, HelpCircle, Mail, Play, Smartphone, Clock, Linkedin, Instagram, Twitter } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
const ReviewsSection = dynamic(() => import('@/components/ReviewsSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });


export default function Home() {
  const { user } = useAuth();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"
        />
      </div>

      {/* 1. Clear & Simple Hero Section */}
      <section id="home" className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8 max-w-4xl mx-auto"
          >
            <motion.div variants={heroItemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-indigo-100 dark:border-indigo-900/30 shadow-sm mx-auto">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
              </span>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                Trusted by 10,000+ Landlords
              </span>
            </motion.div>

            <motion.h1 variants={heroItemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
              Prop<span className="text-indigo-600">Accura</span>
              <span className="block mt-4 text-2xl sm:text-4xl lg:text-5xl text-zinc-700 dark:text-zinc-300 font-bold">
                Smart Rental & Tenant Management for Every Homeowner and Renter
              </span>
            </motion.h1>

            <motion.p variants={heroItemVariants} className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Manage properties, verify tenants, track rent & bills, and stay organized — all in one secure platform.
            </motion.p>

            <motion.div variants={heroItemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={user ? `/${user.role}/dashboard` : "/register"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg shadow-indigo-500/25 active:scale-95"
              >
                Get Started <ArrowRight size={20} />
              </Link>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 px-8 py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95">
                <Play size={18} /> Learn How It Works
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Product Visuals / Screenshots */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-blue-500/10" />
            {/* Simulated Browser Header */}
            <div className="bg-zinc-800/50 backdrop-blur-md px-4 py-3 border-b border-zinc-700/50 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-4 px-3 py-1 bg-zinc-900/50 rounded-md text-xs text-zinc-400 font-mono flex-1 text-center">
                dashboard.propaccura.com
              </div>
            </div>

            {/* Dashboard Video Demo */}
            <div className="aspect-[16/9] bg-zinc-950 relative overflow-hidden group">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Optional Overlay */}
              <div className="absolute inset-0 bg-indigo-900/10 pointer-events-none" />

              {/* "Watch Full Demo" Button Overlay */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 border border-white/20 hover:bg-black/90 transition-colors">
                  <Play size={14} fill="currentColor" /> Unmute / Watch Full
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem-Solution Section (About) */}
      <section id="about" className="py-16 sm:py-20 relative z-10 bg-zinc-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold text-sm">
                The Problem
              </div>
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-white">Property management is chaotic.</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-lg text-zinc-600 dark:text-zinc-400">
                  <span className="text-red-500">✕</span> Landlords lose track of rent payments
                </li>
                <li className="flex items-center gap-3 text-lg text-zinc-600 dark:text-zinc-400">
                  <span className="text-red-500">✕</span> Tenants confused about bills & due dates
                </li>
                <li className="flex items-center gap-3 text-lg text-zinc-600 dark:text-zinc-400">
                  <span className="text-red-500">✕</span> Messy paperwork and identity verification
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 p-8 rounded-3xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                The PropAccura Solution
              </div>
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-white">We make it simple.</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-lg text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="text-emerald-500 h-6 w-6" /> We track every payment automatically
                </li>
                <li className="flex items-center gap-3 text-lg text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="text-emerald-500 h-6 w-6" /> Clear dashboards for bills & history
                </li>
                <li className="flex items-center gap-3 text-lg text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="text-emerald-500 h-6 w-6" /> Digital Application & ID Verification
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Key Benefits & Features Section - What PropAccura Does */}
      <section id="features" className="py-24 relative z-10 bg-white dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
              What PropAccura Does
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Powerful tools designed to streamline your workflow and boost efficiency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Landlord Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/20">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">For Landlords</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Manage all your property information in one place",
                  "See occupied & vacant status",
                  "Track rent, pending bills, and financial summaries",
                  "Approve or reject tenant applications",
                  "See tenant history & digital verification reports"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 min-w-5 text-indigo-600 dark:text-indigo-400"><ShieldCheck size={20} /></div>
                    <span className="text-zinc-600 dark:text-zinc-300 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tenant Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-zinc-800 dark:bg-zinc-700 rounded-xl text-white shadow-lg">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">For Tenants</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Securely register with basic details",
                  "Choose your landlord from the list",
                  "Submit ID details & payment history",
                  "Check your rent & utility bill status",
                  "View your stay timeline & trust score"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 min-w-5 text-zinc-500 dark:text-zinc-400"><Zap size={20} /></div>
                    <span className="text-zinc-600 dark:text-zinc-300 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-zinc-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16 text-zinc-900 dark:text-white"
          >
            How it works in 3 simple steps
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            <StepCard number="1" title="Register" description="Sign up as a Tenant or Landlord in seconds." />
            <StepCard number="2" title="Connect" description="Tenants find landlords, submit details, and get verified." />
            <StepCard number="3" title="Manage" description="Track rent, bills, and stay history from your dashboard." />
          </motion.div>
        </div>
      </section>

      {/* 4. Social Proof / Testimonials */}
      <section id="testimonials" className="py-24 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16 text-zinc-900 dark:text-white"
          >
            Trusted by people like you
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <TestimonialCard
              quote="PropAccura made tracking rent so simple! I used to use spreadsheets, but this is a game changer."
              author="Sarah Jenkins"
              role="Landlord, 5 Properties"
            />
            <TestimonialCard
              quote="Even my parents can manage properties now. It's so intuitive and the tenant verification is a lifesaver."
              author="Michael Chen"
              role="Property Manager"
            />
          </motion.div>
        </div>
      </section>

      {/* 4b. Reviews Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ReviewsSection />
      </motion.div>

      {/* 5. FAQ Section */}
      <section className="py-20 bg-zinc-50 dark:bg-black">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-zinc-900 dark:text-white"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <FAQItem
              question="How do tenants choose a landlord?"
              answer="Tenants can search for registered landlords within the app and send a connection request to start their rental journey."
            />
            <FAQItem
              question="Is my data secure?"
              answer="Yes, we use bank-level encryption and secure role-based access control to ensure your personal and financial data is protected."
            />
            <FAQItem
              question="What happens after I register?"
              answer="You'll be taken to your dedicated dashboard where you can immediately start adding properties (as a landlord) or applying to stays (as a tenant)."
            />
          </motion.div>
        </div>
      </section>


      {/* 6. Contact Section */}
      <section id="contact" className="py-24 bg-zinc-50 dark:bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-indigo-50/50 dark:bg-indigo-900/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Get in Touch</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Have questions? We're here to help. Send us a message and we'll respond within 24 hours.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-white">Email</p>
                      <a href="mailto:nadimshaikh74161@gmail.com" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition-colors">nadimshaikh74161@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-white">Phone</p>
                      <a href="tel:+918767683071" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition-colors">+91 87676 83071</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-white">Office</p>
                      <p className="text-zinc-600 dark:text-zinc-400">Aurangabad, Maharashtra, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-white">Support Hours</p>
                      <p className="text-zinc-600 dark:text-zinc-400">Mon – Sat: 10:00 AM – 7:00 PM (IST)</p>
                      <p className="text-zinc-600 dark:text-zinc-400">Sun: Closed</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Map Placeholder */}
              <div className="bg-zinc-200 dark:bg-zinc-800 h-64 rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
                  <span className="flex items-center gap-2"><Building2 size={16} /> Map View Placeholder</span>
                </div>
                {/* In a real app, embed Google Maps iframe here */}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-zinc-900 dark:text-white" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-zinc-900 dark:text-white" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-zinc-900 dark:text-white" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-zinc-900 dark:text-white resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2">
                  Send Message <ArrowRight size={18} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function StepCard({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className="text-center p-6"
    >
      <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
    </motion.div>
  );
}

function TestimonialCard({ quote, author, role }: { quote: string, author: string, role: string }) {
  return (
    <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-current text-yellow-400 text-yellow-500" />)}
      </div>
      <p className="text-lg text-zinc-700 dark:text-zinc-300 italic mb-6">"{quote}"</p>
      <div>
        <p className="font-bold text-zinc-900 dark:text-white">{author}</p>
        <p className="text-sm text-zinc-500">{role}</p>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">{question}</h3>
      <p className="text-zinc-600 dark:text-zinc-400">{answer}</p>
    </div>
  );
}
