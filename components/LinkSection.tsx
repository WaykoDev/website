import React from "react";

type LinkItem = {
  href: string;
  label: string;
  description?: string;
};

type LinkSectionProps = {
  title: string;
  items: LinkItem[];
};

export function LinkSection({ title, items }: LinkSectionProps) {
  return (
    <section className="space-y-5 pt-12 first:pt-6">
      <h3 className="text-lg font-semibold uppercase tracking-[0.3em] text-slate-300">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="group flex items-start gap-4 rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5 transition hover:-translate-y-1 hover:border-sky-400/70 hover:bg-slate-800/70"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-500/40 bg-sky-500/10 text-sky-300 transition-colors group-hover:border-sky-300/60 group-hover:text-sky-200">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </span>
              <div className="space-y-2">
                <p className="text-base font-semibold text-slate-100 transition-colors group-hover:text-sky-200">
                  {item.label}
                </p>
                {item.description ? (
                  <p className="text-sm text-slate-400">{item.description}</p>
                ) : null}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
