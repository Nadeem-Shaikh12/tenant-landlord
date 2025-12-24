'use client';

import Link from 'next/link';
import { Building2, Github, Twitter, Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand & Description */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-white">
                            <Building2 className="h-8 w-8 text-indigo-500" />
                            <span className="font-bold text-2xl tracking-tight">PropAccura</span>
                        </div>
                        <p className="text-lg leading-relaxed max-w-sm">
                            Simplifying property management for landlords and tenants with trust, transparency, and technology.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Platform</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/login" className="text-lg hover:text-indigo-400 transition-colors block py-1">Login</Link>
                            </li>
                            <li>
                                <Link href="/register" className="text-lg hover:text-indigo-400 transition-colors block py-1">Register</Link>
                            </li>
                            <li>
                                <Link href="/#features" className="text-lg hover:text-indigo-400 transition-colors block py-1">Features</Link>
                            </li>
                            <li>
                                <Link href="/#reviews" className="text-lg hover:text-indigo-400 transition-colors block py-1">Reviews</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Reach (Contact) */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Reach Us</h3>
                        <ul className="space-y-6">
                            <li>
                                <a href="tel:+918767683071" className="flex items-start gap-3 group">
                                    <Phone className="h-6 w-6 text-indigo-500 group-hover:text-white transition-colors mt-1" />
                                    <div>
                                        <span className="block text-white font-medium">Phone</span>
                                        <span className="text-lg group-hover:text-indigo-400 transition-colors block py-1">+91 87676 83071</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:nadimshaikh74161@gmail.com" className="flex items-start gap-3 group">
                                    <Mail className="h-6 w-6 text-indigo-500 group-hover:text-white transition-colors mt-1" />
                                    <div>
                                        <span className="block text-white font-medium">Email</span>
                                        <span className="text-lg group-hover:text-indigo-400 transition-colors block py-1 break-all">nadimshaikh74161@gmail.com</span>
                                    </div>
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-6 w-6 text-indigo-500 mt-1" />
                                <div>
                                    <span className="block text-white font-medium">Office</span>
                                    <span className="text-lg leading-relaxed">Aurangabad, Maharashtra, India</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Media (Socials) */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Social Media</h3>
                        <p className="mb-6 text-base">Stay connected with us for updates and tips.</p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://www.linkedin.com/in/nadeem-shaikh-a8357a189/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-zinc-900 p-4 rounded-xl hover:bg-indigo-600 hover:text-white transition-all transform hover:-translate-y-1 block"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={24} />
                            </a>
                            <a
                                href="https://www.instagram.com/nadeem_shaikh_121/?igsh=Z2NwdmIweWdxa2k1#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-zinc-900 p-4 rounded-xl hover:bg-pink-600 hover:text-white transition-all transform hover:-translate-y-1 block"
                                aria-label="Instagram"
                            >
                                <Instagram size={24} />
                            </a>
                            <a
                                href="https://x.com/NadeemShaikh124?t=PUUKq5cDngshFq_JKUEj2A&s=08"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-zinc-900 p-4 rounded-xl hover:bg-blue-400 hover:text-white transition-all transform hover:-translate-y-1 block"
                                aria-label="Twitter"
                            >
                                <Twitter size={24} />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-base">
                        © {currentYear} PropAccura. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8">
                        <Link href="#" className="text-base hover:text-white transition-colors py-2">Privacy Policy</Link>
                        <Link href="#" className="text-base hover:text-white transition-colors py-2">Terms of Service</Link>
                        <Link href="#" className="text-base hover:text-white transition-colors py-2">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
