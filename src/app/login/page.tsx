'use client';

import { useState } from 'react';
import { useAuth, Role } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, ArrowRight } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function LoginPage() {
    const { login } = useAuth();
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>('tenant');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login({ email, password, role });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-black relative">
            <div className="absolute top-4 right-4 z-50">
                <LanguageSwitcher />
            </div>
            {/* Left Side - Visual */}
            <div className="hidden lg:flex w-1/2 bg-indigo-600 relative overflow-hidden items-center justify-center p-12 text-white">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="relative z-10 max-w-lg space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-lg p-3 rounded-xl w-fit border border-white/20"
                    >
                        <Building2 className="h-8 w-8" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl font-bold tracking-tight"
                    >
                        {t('loginPage.visualTitle')}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6 text-indigo-50 mt-6"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 font-bold shadow-lg">{t('loginPage.step1.number')}</div>
                            <p className="text-lg leading-relaxed font-medium">{t('loginPage.step1.text')} <br /><span className="text-indigo-200 text-sm font-normal">{t('loginPage.step1.subtext')}</span></p>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 font-bold shadow-lg">{t('loginPage.step2.number')}</div>
                            <p className="text-lg leading-relaxed font-medium">{t('loginPage.step2.text')}</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-zinc-50 dark:bg-zinc-950">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-sm space-y-8"
                >
                    <div className="space-y-2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{t('loginPage.welcomeTitle')}</h2>
                        <p className="text-zinc-500 dark:text-zinc-400">{t('loginPage.welcomeSubtitle')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-200">{t('loginPage.roleLabel')}</label>
                            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                <button
                                    type="button"
                                    onClick={() => setRole('tenant')}
                                    className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${role === 'tenant' ? 'bg-white dark:bg-zinc-800 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                                >
                                    {t('loginPage.roles.tenant')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('landlord')}
                                    className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${role === 'landlord' ? 'bg-white dark:bg-zinc-800 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                                >
                                    {t('loginPage.roles.landlord')}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-zinc-700 dark:text-zinc-300">{t('loginPage.emailLabel')}</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-zinc-700 dark:text-zinc-300">{t('loginPage.passwordLabel')}</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-900/20"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
                        >
                            {isLoading ? t('loginPage.loadingButton') : (
                                <>{t('loginPage.submitButton')} <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                        {t('loginPage.noAccount')}{' '}
                        <Link href="/register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 hover:underline">
                            {t('loginPage.createAccount')}
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
