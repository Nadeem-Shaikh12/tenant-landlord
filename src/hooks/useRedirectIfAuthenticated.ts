'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function useRedirectIfAuthenticated() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user) {
            if (user.role === 'tenant') {
                router.push('/tenant/dashboard');
            } else if (user.role === 'landlord') {
                router.push('/landlord/dashboard');
            }
        }
    }, [user, isLoading, router]);
}
