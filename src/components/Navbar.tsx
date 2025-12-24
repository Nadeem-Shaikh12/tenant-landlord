'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Building2, Menu, X, ChevronDown, User, LogOut, Settings, Bell, Search, LayoutDashboard, Home, Users, FileText, PieChart, CreditCard, MessageSquare, Wrench } from 'lucide-react';
import { useAuth, Role } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const [activeSection, setActiveSection] = useState('home');

    // Handle scroll effect
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle active section on scroll (for landing page)
    useEffect(() => {
        if (user) return; // Don't track sections if logged in (dashboard mode)

        let ticking = false;
        const handleScrollSpy = () => {
            if (ticking) return;
            ticking = true;

            window.requestAnimationFrame(() => {
                const sections = ['home', 'features', 'how-it-works', 'reviews', 'contact'];
                for (const section of sections) {
                    const element = document.getElementById(section);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        if (rect.top >= 0 && rect.top <= 300) {
                            setActiveSection(section);
                            break;
                        }
                    }
                }
                ticking = false;
            });
        };

        window.addEventListener('scroll', handleScrollSpy);
        return () => window.removeEventListener('scroll', handleScrollSpy);
    }, [user]);


    const handleLogout = () => {
        logout();
        setProfileMenuOpen(false);
        router.push('/login');
    };

    const navLinks = [
        { label: 'Home', href: '/#home' },
        { label: 'Features', href: '/#features' },
        { label: 'How It Works', href: '/#how-it-works' },
        { label: 'Reviews', href: '/#reviews' },
        { label: 'Contact', href: '/#contact' },
    ];

    const tenantLinks = [
        { label: 'Dashboard', href: '/tenant/dashboard', icon: LayoutDashboard },
        { label: 'Properties', href: '/tenant/properties', icon: Home },
        { label: 'Applications', href: '/tenant/applications', icon: FileText },
        { label: 'My Payments', href: '/tenant/payments', icon: CreditCard },
        { label: 'Maintenance', href: '/tenant/maintenance', icon: Wrench },
        { label: 'Messages', href: '/tenant/messages', icon: MessageSquare },
    ];

    const landlordLinks = [
        { label: 'Dashboard', href: '/landlord/dashboard', icon: LayoutDashboard },
        { label: 'My Properties', href: '/landlord/properties', icon: Building2 },
        { label: 'Tenants', href: '/landlord/tenants', icon: Users },
        { label: 'Applications', href: '/landlord/applications', icon: FileText },
        { label: 'Financials', href: '/landlord/financials', icon: PieChart },
        { label: 'Maintenance', href: '/landlord/maintenance', icon: Wrench },
        { label: 'Messages', href: '/landlord/messages', icon: MessageSquare },
    ];

    const activeLinks = user
        ? (user.role === 'tenant' ? tenantLinks : landlordLinks)
        : navLinks;

    // Check if we are on a dashboard page
    const isDashboard = pathname?.startsWith('/tenant') || pathname?.startsWith('/landlord');

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isDashboard ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800' : 'bg-transparent border-transparent'}`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                            <Building2 className="text-white" size={18} />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                            PropAccura
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {activeLinks.map((link) => {
                            const isActive = user
                                ? pathname === link.href
                                : activeSection === link.href.replace('/#', '');

                            const Icon = (link as any).icon;

                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors group ${isActive
                                        ? 'text-indigo-600 dark:text-indigo-400'
                                        : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
                                        }`}>
                                    {Icon ? (
                                        <span className="flex items-center gap-2">
                                            <Icon size={16} />
                                            {link.label}
                                        </span>
                                    ) : (
                                        <>
                                            {link.label}
                                            <span className={`absolute left-0 bottom-0 h-0.5 bg-indigo-600 transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                        </>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                >
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <User size={14} className="text-indigo-600" />
                                    </div>
                                    <span className="text-sm font-medium">{user.name}</span>
                                    <ChevronDown size={14} className={`transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {profileMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 py-1 overflow-hidden"
                                        >
                                            <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800">
                                                <p className="text-xs text-zinc-500">Signed in as</p>
                                                <p className="text-sm font-medium truncate">{user.email}</p>
                                            </div>
                                            <Link href={user.role === 'tenant' ? '/tenant/profile' : '/landlord/profile'} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800" onClick={() => setProfileMenuOpen(false)}>
                                                <User size={16} /> My Profile
                                            </Link>
                                            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
                                                <LogOut size={16} /> Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors shadow-lg shadow-indigo-500/20"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-zinc-600 dark:text-zinc-300"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
                    >
                        <div className="p-4 space-y-2">
                            {activeLinks.map(link => {
                                const Icon = (link as any).icon;
                                return (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {Icon && <Icon size={18} />}
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}
                            {!user && (
                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                    <Link href="/login" className="text-center p-2 rounded-lg hover:bg-zinc-100" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                                    <Link href="/register" className="text-center p-2 rounded-lg bg-indigo-600 text-white" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
                                </div>
                            )}
                            {user && (
                                <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
                                    <LogOut size={18} />
                                    <span>Sign Out</span>
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
