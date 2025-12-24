'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import TenantSidebar from '@/components/dashboard/TenantSidebar';
import { SidebarProvider, useSidebar } from '@/context/SidebarContext';
import { Menu, Home, X } from 'lucide-react';

// Top Navbar is hidden on dashboard, so we restore the Sidebar layout
function TenantLayoutContent({ children }: { children: React.ReactNode }) {
    // Top Navbar is hidden on dashboard, so we restore the Sidebar layout
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
            <TenantSidebar />
            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}


export default function TenantLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <TenantLayoutContent>
                {children}
            </TenantLayoutContent>
        </SidebarProvider>
    )
}
