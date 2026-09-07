import styles from '@/app/page.module.css'

export const InsightsSection = () => {
    return (<section className="section-py">
        <div className="section-container">
            <div className={styles.insights__header}>
                <div>
                    <div className="section-label">Insights</div>
                    <h2 className="section-heading">Practical thinking on<br />private and enterprise AI.</h2>
                </div>
            </div>

            <div className={styles.insights__grid}>
                {insights.map(item => (
                    <div key={item.title} className={`card-enterprise ${styles.cardAccent} ${styles.insights__card}`}>
                        <span className={`tag-teal ${styles.insights__cardTag}`}>{item.tag}</span>
                        <h3 className={styles.insights__cardTitle}>
                            {item.title}
                        </h3>
                        <div className={styles.insights__cardFooter}>
                            Coming soon
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>)
}

const insights = [
    { title: "Private AI vs public AI: how to choose the right deployment model", tag: "Architecture" },
    { title: "A framework for choosing your first enterprise AI use case", tag: "AI Strategy" },
    { title: "What an AI agent can safely automate inside an institution", tag: "AI Agents" },
    { title: "Why enterprise AI needs authorised knowledge and source attribution", tag: "Grounding" },
    { title: "Building an enterprise AI governance model", tag: "Governance" },
    { title: "On-premise vs private cloud vs isolated tenancy for AI", tag: "Architecture" },
];
