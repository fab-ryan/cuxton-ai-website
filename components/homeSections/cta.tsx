import styles from '@/app/page.module.css'
import Link from 'next/link'
export const CTASection = () => {
    return (<section className={styles.cta}>
        <div className={styles.cta__image} />

        <div className={`container max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8 text-left ${styles.cta__container}`}>
            <h2 className={styles.cta__heading}>
                Where could AI create measurable value in your organisation?
            </h2>
            <p className={styles.cta__body}>
                Start with a focused discovery conversation. We&apos;ll discuss your objectives, current systems,
                data constraints and candidate workflows  without requiring confidential information in the first contact.
            </p>
            <div className={styles.cta__actions}>
                <Link href="/contact" className={`btn-primary ${styles.cta__actionPrimary}`}>
                    Book an AI Discovery Session</Link>
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