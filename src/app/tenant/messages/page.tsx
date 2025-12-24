'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Send, Clock, User, MessageCircle } from 'lucide-react';

export default function TenantMessagesPage() {
    const { user } = useAuth();
    const [contacts, setContacts] = useState<any[]>([]);
    const [activeContact, setActiveContact] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [showContacts, setShowContacts] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch Contacts
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch('/api/contacts');
                const data = await res.json();
                setContacts(data.contacts || []);
                if (data.contacts && data.contacts.length > 0) {
                    setActiveContact(data.contacts[0]); // Auto-select first contact (Landlord)
                }
                // Initial unread counts
                const unreadRes = await fetch('/api/messages/unread');
                const unreadData = await unreadRes.json();
                setUnreadCounts(unreadData.countsBySender || {});
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    // Poll Messages
    useEffect(() => {
        if (!activeContact) return;

        const fetchMessages = async () => {
            const res = await fetch(`/api/messages?chatWith=${activeContact.id}`);
            const data = await res.json();
            setMessages(data.messages || []);

            // Refresh unread counts
            const unreadRes = await fetch('/api/messages/unread');
            const unreadData = await unreadRes.json();
            setUnreadCounts(unreadData.countsBySender || {});
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); // Poll every 3s
        return () => clearInterval(interval);
    }, [activeContact]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newMessage.trim() || !activeContact) return;

        try {
            await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    receiverId: activeContact.id,
                    content: newMessage
                })
            });
            setNewMessage('');
            // Optimistic update or wait for poll? Poll is fast enough, but let's re-fetch immediately
            const res = await fetch(`/api/messages?chatWith=${activeContact.id}`);
            const data = await res.json();
            setMessages(data.messages || []);
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-zinc-400" /></div>;

    if (contacts.length === 0) {
        return (
            <div className="p-12 text-center text-zinc-500">
                <MessageCircle size={48} className="mx-auto mb-4 opacity-20" />
                <p>No contacts available. You are not connected to any properties yet.</p>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-2rem)] flex bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100 m-2 sm:m-4">
            {/* Sidebar / Contact List */}
            <div className={`${showContacts ? 'flex' : 'hidden md:flex'} w-full md:w-80 bg-zinc-50 border-r border-zinc-100 flex-col`}>
                <div className="p-4 border-b border-zinc-100 font-bold text-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <User size={20} className="text-zinc-400" />
                        Contacts
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {contacts.map(contact => (
                        <div
                            key={contact.id}
                            onClick={() => {
                                setActiveContact(contact);
                                setShowContacts(false);
                            }}
                            className={`p-4 cursor-pointer hover:bg-zinc-100 transition relative ${activeContact?.id === contact.id ? 'bg-white border-l-4 border-black shadow-sm' : ''}`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="font-bold text-zinc-900">{contact.name}</div>
                                {unreadCounts[contact.id] > 0 && (
                                    <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                        {unreadCounts[contact.id]}
                                    </span>
                                )}
                            </div>
                            <div className="text-xs text-zinc-500">{contact.propertyName}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`${!showContacts ? 'flex' : 'hidden md:flex'} flex-1 flex-col h-full overflow-hidden`}>
                {activeContact ? (
                    <>
                        {/* Header */}
                        <div className="p-3 sm:p-4 border-b border-zinc-100 bg-white flex justify-between items-center shadow-sm z-10">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowContacts(true)}
                                    className="md:hidden p-2 -ml-2 hover:bg-zinc-100 rounded-full transition"
                                >
                                    <Clock className="rotate-90 text-zinc-400" size={20} />
                                </button>
                                <div>
                                    <h2 className="font-bold text-base sm:text-lg">{activeContact.name}</h2>
                                    <p className="text-[10px] sm:text-xs text-zinc-500 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Online
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-zinc-50/50 space-y-4">
                            {messages.length === 0 && (
                                <div className="text-center text-zinc-400 text-sm mt-12">
                                    Start a conversation with {activeContact.name}
                                </div>
                            )}
                            {messages.map((msg) => {
                                const isMe = msg.senderId === user?.id;
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-[85%] sm:max-w-[70%] p-3 rounded-2xl text-sm shadow-sm relative group ${isMe
                                                ? 'bg-zinc-900 text-white rounded-tr-none'
                                                : 'bg-white border border-zinc-200 text-zinc-800 rounded-tl-none'
                                                }`}
                                        >
                                            <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                            <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 opacity-70 ${isMe ? 'text-zinc-300' : 'text-zinc-400'}`}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                {isMe && <span>{msg.isRead ? '✓✓' : '✓'}</span>}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-1 px-2 sm:p-2 bg-white border-t border-zinc-100">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-4xl mx-auto h-[48px] sm:h-[56px]">
                                <textarea
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 p-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none h-[34px] min-h-[34px] max-h-32 text-xs sm:text-sm outline-none transition-all"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="w-9 h-9 flex items-center justify-center bg-zinc-900 text-white rounded-lg hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-zinc-400">
                        Select a contact to start chatting
                    </div>
                )}
            </div>
        </div>
    );
}
