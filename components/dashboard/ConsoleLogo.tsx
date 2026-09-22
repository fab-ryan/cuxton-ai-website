import { getImageProps } from "next/image";
import s from "./dashboard.module.css";

/* ═══════════════════════════════════════════════════════════════════
   Horizontal console lockup: the lettermark beside the wordmark.

   Both halves are cut from CUXTONAI_Logo_2.png. The colour cut sits on
   the light theme; the "-reverse" cut keeps the amber node but turns
   the teal white, since teal on the navy ground has too little contrast.
   ═══════════════════════════════════════════════════════════════════ */

const { props: markLight } = getImageProps({ src: "/logo/cuxton-mark.png", alt: "", width: 177, height: 192 });
const { props: markDark } = getImageProps({ src: "/logo/cuxton-mark-reverse.png", alt: "", width: 177, height: 192 });
const { props: wordLight } = getImageProps({ src: "/logo/cuxton-wordmark.png", alt: "CuxtonAI", width: 442, height: 64 });
const { props: wordDark } = getImageProps({ src: "/logo/cuxton-wordmark-reverse.png", alt: "CuxtonAI", width: 442, height: 64 });

export default function ConsoleLogo({ label = "Console" }: { label?: string }) {
  return (
    <span className={s.logo}>
      <picture>
        <source media="(prefers-color-scheme: light)" srcSet={markLight.src} />
        <img {...markDark} alt="" className={s.logoMark} />
      </picture>
      <span className={s.logoText}>
        <picture>
          <source media="(prefers-color-scheme: light)" srcSet={wordLight.src} />
          <img {...wordDark} alt="CuxtonAI" className={s.logoWord} />
        </picture>
        <span className={s.logoLabel}>{label}</span>
      </span>
    </span>
  );
}
