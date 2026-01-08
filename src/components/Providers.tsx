'use client';

import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { LanguageProvider } from '@/context/LanguageContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <DataProvider>
                <SidebarProvider>
                    <LanguageProvider>
                        {children}
                    </LanguageProvider>
                </SidebarProvider>
            </DataProvider>
        </AuthProvider>
    );
}
