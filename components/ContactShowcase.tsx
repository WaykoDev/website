import React from "react";

type SocialLink = {
  label: string;
  href: string;
  handle?: string;
  icon?: "linkedin" | "x" | "default";
};

type ContactShowcaseProps = {
  email: string;
  socials: SocialLink[];
};

export function ContactShowcase({ email, socials }: ContactShowcaseProps) {
  return (
    <section className="relative mx-auto mt-12 max-w-4xl px-4 sm:px-6">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl"
      >
        <div className="animate-pulseGlow bg-gradient-to-r from-sky-500/30 via-purple-500/20 to-cyan-400/30" />
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-900/75 shadow-[0_20px_80px_-40px_rgba(56,189,248,0.35)] backdrop-blur">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_55%)]"
        />

        <div className="relative grid gap-10 p-8 sm:p-12">
          <header className="space-y-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-sky-200">
              <PulseDot />
              Reach Out
            </span>
            <h1 className="text-3xl font-semibold text-slate-100 sm:text-4xl">
              Let&apos;s build something together
            </h1>
            <p className="mx-auto max-w-2xl text-base text-slate-400 sm:text-lg">
              I’m always excited to connect about security research, offensive
              tooling, and collaborative projects. Drop me a line or reach out
              on the platforms below.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative overflow-hidden rounded-2xl border border-sky-400/20 bg-slate-900/60 p-6 shadow-[0_10px_40px_-20px_rgba(56,189,248,0.6)] transition-transform duration-500 hover:-translate-y-1 hover:border-sky-400/40">
              <div
                aria-hidden
                className="absolute -left-24 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-sky-500/20 blur-3xl"
              />
              <div className="relative flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-200 shadow-[0_8px_26px_-12px_rgba(56,189,248,0.45)]">
                    <MailIcon className="h-6 w-6 animate-float" />
                  </span>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-sky-300">
                      Email
                    </p>
                    <p className="text-xl font-semibold text-slate-50">
                      Let&apos;s talk directly
                    </p>
                  </div>
                </div>
                <a
                  href={`mailto:${email}`}
                  className="group inline-flex max-w-fit items-center gap-3 rounded-full border border-sky-400/20 bg-slate-900/80 px-5 py-2 text-base font-medium text-sky-100 transition-all duration-300 hover:border-sky-400/60 hover:bg-slate-900 hover:text-sky-200"
                >
                  <span>{email}</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-sky-200 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </span>
                </a>
                <p className="max-w-md text-sm text-slate-400">
                  Prefer encrypted channels? Ask for my PGP key in your first
                  message and we’ll switch things up.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  className="group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/70 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/90"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/10 to-sky-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="relative flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-200 transition duration-300 group-hover:border-sky-400/50 group-hover:text-sky-100">
                      <SocialIcon icon={social.icon} />
                    </span>
                    <div className="flex flex-1 flex-col">
                      <p className="text-base font-semibold text-slate-100 transition-colors duration-300 group-hover:text-sky-100">
                        {social.label}
                      </p>
                      {social.handle ? (
                        <span className="text-sm text-slate-400 transition-colors duration-300 group-hover:text-sky-200">
                          {social.handle}
                        </span>
                      ) : null}
                    </div>
                    <ArrowIcon className="h-4 w-4 text-slate-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-sky-200" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect
        width="18"
        height="14"
        x="3"
        y="5"
        rx="2"
      />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function PulseDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-[ping_2s_linear_infinite] rounded-full bg-sky-300/70 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-200" />
    </span>
  );
}

function SocialIcon({ icon = "default" }: { icon?: SocialLink["icon"] }) {
  if (icon === "linkedin") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 8.75h3.96V21H3V8.75ZM9.96 8.75H14v1.68h.06c.56-1.06 1.92-2.18 3.95-2.18 4.22 0 5 2.78 5 6.4V21h-3.96v-5.7c0-1.36-.03-3.11-1.9-3.11-1.9 0-2.19 1.48-2.19 3v5.8H9.96V8.75Z" />
      </svg>
    );
  }

  if (icon === "x") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M18.244 3h3.308l-7.227 8.26L22 21h-5.563l-4.35-5.66L7 21H3.69l7.73-8.835L2 3h5.687l3.96 5.205L18.243 3Zm-1.103 16.146h1.833L6.94 4.176H4.972Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M18 8a6 6 0 0 1-6 6" />
      <path d="M12 14a6 6 0 0 1-6-6" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}
