import { useState } from 'react';
import { Star, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, comment: string) => Promise<void>;
    tenantName: string;
}

export default function ReviewModal({ isOpen, onClose, onSubmit, tenantName }: ReviewModalProps) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) return;

        setIsSubmitting(true);
        try {
            await onSubmit(rating, comment);
            // Reset after success (optional, or rely on parent unmounting/closing)
            setRating(0);
            setComment('');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-zinc-900 rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"
                >
                    <div className="p-6 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Rate Experience</h2>
                            <p className="text-zinc-500 dark:text-zinc-400">
                                How was your experience with <span className="font-semibold text-indigo-600 dark:text-indigo-400">{tenantName}</span>?
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Star Rating */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="transition-transform hover:scale-110 focus:outline-none"
                                        >
                                            <Star
                                                size={32}
                                                className={`transition-colors ${star <= (hoveredRating || rating)
                                                    ? 'fill-amber-400 text-amber-400'
                                                    : 'fill-transparent text-zinc-300 dark:text-zinc-600'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 h-5">
                                    {(hoveredRating || rating) === 1 && "Poor"}
                                    {(hoveredRating || rating) === 2 && "Fair"}
                                    {(hoveredRating || rating) === 3 && "Good"}
                                    {(hoveredRating || rating) === 4 && "Very Good"}
                                    {(hoveredRating || rating) === 5 && "Excellent"}
                                </span>
                            </div>

                            {/* Comment */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Comments (Optional)
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Share details about payment timeliness, property care, etc."
                                    className="w-full h-32 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-shadow"
                                />
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3 rounded-xl font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    Skip
                                </button>
                                <button
                                    type="submit"
                                    disabled={rating === 0 || isSubmitting}
                                    className="px-6 py-3 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" /> Submitting...
                                        </>
                                    ) : (
                                        'Submit Rating'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
