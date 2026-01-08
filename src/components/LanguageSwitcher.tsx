'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', label: 'English', native: 'English' },
        { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
        { code: 'mr', label: 'Marathi', native: 'मराठी' },
    ] as const;

    const currentLanguage = languages.find(l => l.code === language) || languages[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Select Language"
            >
                <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium">{currentLanguage.native}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 py-1 overflow-hidden z-50 text-left"
                        >
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800">
                                Select Language
                            </div>
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${language === lang.code
                                        ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                                        }`}
                                >
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className="font-medium text-base">{lang.native}</span>
                                        <span className="text-xs opacity-70">{lang.label}</span>
                                    </div>
                                    {language === lang.code && <Check size={16} className="text-indigo-600 dark:text-indigo-400" />}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
