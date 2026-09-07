import Link from "next/link"
import s from "./fourLayer.module.css"
import Reveal from "../Reveal"

export const FourLayersSection = () => {
    return (<section className={`section-py ${s.section}`} id="architecture">
        <div className={s.bgGrid} aria-hidden="true" />
        <div className="container max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8 mt-8">
            <Reveal className={s.header}>
                <div className="section-label">Architecture</div>
                <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
                    Four layers. One controlled environment.
                </h2>
                <p className="section-sub">
                    Every deployment is organised around the same four layers  so responsibility, access
                    and data flow stay legible as the system grows.
                </p>
            </Reveal>

            <div className={s.stack}>
                <div className={s.spine} aria-hidden="true">
                    <span className={s.spineFlow} />
                    <span className={`${s.spineFlow} ${s.spineFlowDelay}`} />
                </div>

                {fourLayers.map((l, i) => (
                    <Reveal
                        key={l.label}
                        delay={i * 120}
                        className={`${s.row} ${i % 2 === 1 ? s.rowReverse : ""}`}
                    >
                        <div className={s.cardWrap}>
                            <div className={`card-enterprise ${s.card}`}>
                                <span className={s.cornerTl} aria-hidden="true" />
                                <span className={s.cornerBr} aria-hidden="true" />
                                <span className={s.tag}>LAYER 0{i + 1}</span>
                                <h3 className={s.title}>{l.label}</h3>
                                <p className={s.body}>{l.desc}</p>
                            </div>
                        </div>

                        <div className={`${s.node} ${s[`nodeColor${i + 1}`]}`}>
                            <span className={s.nodeRing} aria-hidden="true" />
                            <span className={s.nodeIcon}>{l.icon}</span>
                        </div>

                        <div className={s.spacer} aria-hidden="true" />
                    </Reveal>
                ))}

                <Reveal delay={fourLayers.length * 120} className={s.capstoneRow}>
                    <div className={s.capstoneNode}>
                        <span className={s.nodeIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3z" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                        </span>
                    </div>
                    <div className={`card-enterprise ${s.capstoneCard}`}>
                        <span className={s.tag}>OUTCOME</span>
                        <h3 className={s.title}>One controlled environment</h3>
                        <p className={s.body}>
                            Every layer operates inside the same governance boundary  access, audit
                            and data flow stay legible as the system scales.
                        </p>
                    </div>
                </Reveal>
            </div>

            <div className={s.footer}>
                <Link href="/technology" className="btn-secondary">
                    Explore the technology approach
                </Link>
            </div>
        </div>
    </section>)

}

const fourLayers = [
    {
        label: "Organisation",
        desc: "People, teams, workflows and policies that define what the system is for.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        label: "AI Infrastructure",
        desc: "Selected models, compute and security controls, sized to the deployment.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" />
            </svg>
        ),
    },
    {
        label: "Secure Data & Knowledge",
        desc: "Databases, documents, permissions and retrieval  grounded and access-controlled.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
            </svg>
        ),
    },
    {
        label: "AI Applications",
        desc: "Assistants, agents, automations and analytics used day to day.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" /><path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
        ),
    },
];
