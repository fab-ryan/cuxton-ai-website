/* Single source for CuxtonAI's contact details. The company page's contact
   section and the site footer both read from here, so a change made once
   lands everywhere. */

export type SocialProfile = {
  id: "linkedin" | "x" | "github";
  label: string;
  href: string;
};

export type CompanyContact = {
  legalName: string;
  office: {
    label: string;
    lines: string[];
    country: string;
    /* Google Maps: directions, the viewer embedded on /contact, and the
       full map. The embed sets Google's own cookies, while /cookies still
       promises "essential cookies only" — keep the two in step. */
    mapHref: string;
    mapEmbedSrc: string;
    mapViewHref: string;
    /* Centre of the postcode, for a coordinate readout. */
    geo: { lat: number; lon: number };
  };
  email: string;
  /* No number has been supplied yet. While this is null the site offers a
     call-back through the contact form instead of printing a number. */
  phone: { display: string; href: string } | null;
  socials: SocialProfile[];
};

const officeLines = ["Suite RAO1", "195-197 Wood Street", "London", "E17 3NU"];

/* Street address without the suite: Google geocodes this cleanly, while
   "Suite RAO1" means nothing to it. */
const mapQuery = encodeURIComponent(officeLines.slice(1).join(", "));

/* Centre of postcode E17 3NU (postcodes.io, ONS data). A UK postcode covers
   only a handful of addresses, so this sits close to, but not exactly on,
   the building. */
const officeGeo = { lat: 51.585813, lon: -0.001676 };

export const companyContact: CompanyContact = {
  legalName: "CuxtonAI Ltd",
  office: {
    label: "Office Address",
    lines: officeLines,
    country: "United Kingdom",
    mapHref: `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`,
    mapEmbedSrc: `https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`,
    mapViewHref: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
    geo: officeGeo,
  },
  email: "info@cuxtonai.com",
  phone: null,
  /* These still point at each network's home page — swap in the real
     profile URLs once they exist. */
  socials: [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/company/cuxtonai",
    },
    { id: "x", label: "X", href: "https://x.com/cuxtonai" },
    { id: "github", label: "GitHub", href: "https://github.com/cuxtonai" },
  ],
};
