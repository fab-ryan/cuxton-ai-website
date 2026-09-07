import styles from '@/app/page.module.css'
import Link from 'next/link'
export const CTASection = () => {
    return (<section className={styles.cta}>
        <div className={styles.cta__image} />
        <div className={styles.cta__glow} />
        <div className="hex-grid absolute inset-0 pointer-events-none" />

        <div className={`container max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8 text-left ${styles.cta__container}`}>
            <div className={`section-label ${styles.cta__label}`}>
                Start the Conversation
            </div>
            <h2 className={styles.cta__heading}>
                Where could AI create measurable value in your organisation?
            </h2>
            <p className={styles.cta__body}>
                Start with a focused discovery conversation. We&apos;ll discuss your objectives, current systems,
                data constraints and candidate workflows  without requiring confidential information in the first contact.
            </p>
            <div className={styles.cta__actions}>
                <Link href="/contact" className={`btn-primary ${styles.cta__actionPrimary}`}>
                    Book an AI Discovery Session
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
                <Link href="/solutions" className={`btn-secondary ${styles.cta__actionSecondary}`}>
                    Explore Solutions
                </Link>
            </div>
            <p className={styles.cta__disclaimer}>
                No confidential or patient-identifiable data should be submitted through the public form.
            </p>
        </div>
    </section>)
}