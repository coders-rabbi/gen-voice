import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | Gen Voice",
  description:
    "How Gen Voice collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "November 14, 2026";
const SITE_NAME = "Gen Voice";
const SITE_URL = "https://www.genvoice.news";
const CONTACT_EMAIL = "privacy@genvoice.news"; // TODO: replace with your real email

const linkClass =
  "text-blue-700 underline underline-offset-4 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:text-blue-400 dark:hover:text-blue-300";

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className={linkClass}>
    {children}
  </a>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="my-3">{children}</p>
);

const UL = ({ children }: { children: ReactNode }) => (
  <ul className="my-3 list-disc space-y-2 pl-5">{children}</ul>
);

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <P>We collect only what we need to run the site.</P>
        <UL>
          <li>
            <strong>Account information:</strong> your name, email address, and
            password when you register or log in.
          </li>
          <li>
            <strong>Content you submit:</strong> news posts, facts, images,
            video links, and edits submitted by reporters and editors.
          </li>
          <li>
            <strong>Usage and device data:</strong> pages visited, browser type,
            device type, approximate location (from IP address), and the date
            and time of your visit.
          </li>
          <li>
            <strong>Messages:</strong> anything you send us through a contact
            form or by email.
          </li>
        </UL>
        <P>You can read news on {SITE_NAME} without creating an account.</P>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How we use your information",
    body: (
      <UL>
        <li>To create and manage your account and keep you signed in.</li>
        <li>
          To review, publish, and attribute news content submitted by reporters.
        </li>
        <li>To operate, maintain, and improve the website.</li>
        <li>To respond to your questions and requests.</li>
        <li>
          To protect the site against fraud, abuse, and security incidents.
        </li>
        <li>To meet our legal obligations.</li>
      </UL>
    ),
  },
  {
    id: "cookies-and-storage",
    title: "Cookies and local storage",
    body: (
      <>
        <P>We use a small number of cookies and browser storage items:</P>
        <UL>
          <li>
            <strong>Authentication cookie:</strong> a secure, httpOnly cookie
            that keeps you signed in. It is removed when you log out.
          </li>
          <li>
            <strong>Local storage:</strong> a short-lived access token stored in
            your browser so we can verify requests to your account.
          </li>
          <li>
            <strong>Analytics and advertising cookies:</strong> if we enable
            analytics or ads, they may set their own cookies.
            {/* TODO: remove if not used */}
          </li>
        </UL>
        <P>
          You can clear or block cookies in your browser settings. Some
          features, such as staying signed in, will not work without them.
        </P>
      </>
    ),
  },
  {
    id: "sharing",
    title: "When we share information",
    body: (
      <>
        <P>We do not sell your personal information. We share it only:</P>
        <UL>
          <li>
            With service providers that host or support the site (for example
            hosting, database, and email services), under confidentiality
            obligations.
          </li>
          <li>
            When required by law, court order, or a lawful request from a
            government authority.
          </li>
          <li>
            To protect the rights, safety, or property of {SITE_NAME}, our
            users, or the public.
          </li>
        </UL>
        <P>
          The name of a reporter may appear publicly alongside the news they
          publish.
        </P>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party content and links",
    body: (
      <P>
        Some news posts embed content such as YouTube videos or link to other
        websites. These third parties have their own privacy policies, and we
        are not responsible for their practices. Please review their policies
        before sharing information with them.
      </P>
    ),
  },
  {
    id: "security",
    title: "Data security",
    body: (
      <P>
        We use reasonable technical and organizational measures to protect your
        information, including encrypted connections (HTTPS) and restricted
        access to our systems. No method of transmission or storage is
        completely secure, so we cannot guarantee absolute security.
      </P>
    ),
  },
  {
    id: "retention",
    title: "How long we keep information",
    body: (
      <P>
        We keep account information for as long as your account is active. Posts
        that have been published may remain on the site as part of our news
        archive. You can ask us to delete your account at any time, and we will
        remove or anonymize your personal information unless we must keep it to
        meet a legal obligation.
      </P>
    ),
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    body: (
      <>
        <P>You can ask us to:</P>
        <UL>
          <li>Show you the personal information we hold about you.</li>
          <li>Correct information that is wrong or out of date.</li>
          <li>Delete your account and personal information.</li>
        </UL>
        <P>
          To make a request, email us at{" "}
          <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>. We may need
          to confirm your identity first.
        </P>
      </>
    ),
  },
  {
    id: "children",
    title: "Children’s privacy",
    body: (
      <P>
        {SITE_NAME} is not directed to children under 13, and we do not
        knowingly collect their personal information. If you believe a child has
        given us personal information, contact us and we will delete it.
      </P>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <P>
        We may update this policy from time to time. When we do, we will change
        the “Last updated” date at the top of this page. If the changes are
        significant, we will also post a notice on the site.
      </P>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <P>
        If you have questions about this policy, write to us at{" "}
        <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>, or visit{" "}
        <A href={SITE_URL}>{SITE_URL}</A>.
      </P>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-12 font-serif text-[1.0625rem] leading-7 text-gray-900 dark:text-gray-100">
      <h1 className="mb-2 text-4xl font-bold leading-tight">Privacy Policy</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Last updated: {LAST_UPDATED}
      </p>

      <P>
        This policy explains what personal information {SITE_NAME} (
        <A href={SITE_URL}>{SITE_URL}</A>) collects, how we use it, and the
        choices you have. By using the site, you agree to the practices
        described here.
      </P>

      <nav
        aria-label="On this page"
        className="my-10 border-l-4 border-gray-900 py-1 pl-4 font-sans text-[0.95rem] dark:border-gray-100"
      >
        <ul className="space-y-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={linkClass}>
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-6">
          <h2 className="mb-2 mt-10 text-2xl font-semibold">{s.title}</h2>
          {s.body}
        </section>
      ))}
    </main>
  );
}
