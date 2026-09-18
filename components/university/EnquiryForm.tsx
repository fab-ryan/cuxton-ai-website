"use client";

import { useState } from "react";
import { PROGRAMS, UNIVERSITY_CONTACT } from "@/data/university";
import styles from "./enquiry.module.css";

/* There is no database and no server behind this site, so the form does
   the honest thing: it composes the message and hands it to the visitor's
   own mail client, addressed to the office that matches the topic. The
   helper text says so, because a form that silently discards what someone
   typed is worse than no form. */

const officeFor = (topic: string) => {
  if (topic === "Doctoral study") return UNIVERSITY_CONTACT.offices[2];
  if (topic === "Something else") return UNIVERSITY_CONTACT.offices[3];
  return UNIVERSITY_CONTACT.offices[0];
};

export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(UNIVERSITY_CONTACT.enquiryTopics[0]);
  const [program, setProgram] = useState("");
  const [message, setMessage] = useState("");

  const office = officeFor(topic);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Topic: ${topic}`,
      program ? `Programme: ${program}` : null,
      "",
      message,
    ].filter((line) => line !== null);

    const href = `mailto:${office.email}?subject=${encodeURIComponent(
      `${topic} enquiry`
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    window.location.href = href;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="enq-name">Your name</label>
          <input
            id="enq-name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="enq-email">Email address</label>
          <input
            id="enq-email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="enq-topic">What is this about?</label>
          <select
            id="enq-topic"
            className={`${styles.input} ${styles.select}`}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            {UNIVERSITY_CONTACT.enquiryTopics.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="enq-program">
            Programme <span className={styles.optional}>(optional)</span>
          </label>
          <select
            id="enq-program"
            className={`${styles.input} ${styles.select}`}
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          >
            <option value="">No particular programme</option>
            {PROGRAMS.map((p) => (
              <option key={p.slug} value={`${p.award} ${p.name}`}>
                {p.award} {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="enq-message">Your question</label>
        <textarea
          id="enq-message"
          className={`${styles.input} ${styles.textarea}`}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <div className={styles.foot}>
        <button type="submit" className={styles.submit}>
          Compose this enquiry
        </button>
        <p className={styles.note}>
          This opens your own email application with the message addressed to{" "}
          <strong>{office.email}</strong>. Nothing is sent or stored by this site.
        </p>
      </div>
    </form>
  );
}
