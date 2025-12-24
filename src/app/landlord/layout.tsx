'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    Users,
    ClipboardList,
    LogOut,
    Settings,
    PieChart,
    Bell,
    CreditCard,
    Menu,
    X,
    Building2,
    MessageSquare
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { SidebarProvider } from '@/context/SidebarContext';

export default function LandlordLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const navItems = [
        { href: "/landlord/dashboard", icon: <PieChart size={20} />, label: "Overview" },
        { href: "/landlord/messages", icon: <MessageSquare size={20} />, label: "Messages" },
        { href: "/landlord/dashboard/requests", icon: <Bell size={20} />, label: "Requests", badge: "New" },
        { href: "/landlord/dashboard/properties", icon: <Building2 size={20} />, label: "Properties" },
        { href: "/landlord/dashboard/tenants", icon: <Users size={20} />, label: "Residents" },
        { href: "/landlord/dashboard/bills", icon: <CreditCard size={20} />, label: "Billing" },
        { href: "/landlord/dashboard/settings", icon: <Settings size={20} />, label: "Settings" },
    ];

    return (
        <SidebarProvider>
            <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
                <Sidebar />
                {/* Main Content */}
                <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
