import React, { useState } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';

interface SuggestionBoxProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuggestionBox: React.FC<SuggestionBoxProps> = ({ isOpen, onClose }) => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'arnovisua@gmail.com'; // Fallback for dev
            const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    message,
                    email: email || 'Anonymous',
                    _subject: "New Suggestion for VibeCine"
                })
            });

            if (response.ok) {
                setStatus('success');
                setMessage('');
                setEmail('');
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                }, 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(5px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }} onClick={onClose}>
            <div
                className="glass"
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    padding: '2rem',
                    borderRadius: '1.5rem',
                    position: 'relative',
                    background: 'var(--bg-card)'
                }}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer'
                    }}
                >
                    <X size={24} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        padding: '1rem',
                        borderRadius: '50%',
                        background: 'rgba(var(--primary-rgb), 0.1)',
                        color: 'var(--primary)',
                        marginBottom: '1rem'
                    }}>
                        <MessageSquare size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>We value your feedback</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Have a suggestion or found a bug? Let us know!
                    </p>
                </div>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0', color: '#4ADE80' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Thank You!</h3>
                        <p>Your suggestion has been sent successfully.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                Your Message
                            </label>
                            <textarea
                                required
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="What's on your mind?"
                                style={{
                                    width: '100%',
                                    minHeight: '120px',
                                    padding: '1rem',
                                    borderRadius: '0.75rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'var(--text-primary)',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                Email (Optional)
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="If you'd like a response"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.75rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        {status === 'error' && (
                            <p style={{ color: '#EF4444', fontSize: '0.9rem', textAlign: 'center' }}>
                                Something went wrong. Please try again.
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                background: 'var(--primary)',
                                color: 'white',
                                fontWeight: 'bold',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                opacity: status === 'submitting' ? 0.7 : 1
                            }}
                        >
                            {status === 'submitting' ? (
                                'Sending...'
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send Suggestion
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SuggestionBox;
