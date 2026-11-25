import { BadgeCheck, BriefcaseBusiness, GraduationCap, Info } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { certificates, education, roles, sourceNote, verifiedExperience } from '@/data/experience'
import { links } from '@/data/links'

export default function Experience() {
  return (
    <section id="experience" className="relative border-t border-white/10 bg-charcoal py-24 lg:py-36">
      <div className="shell">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4">
          <p className="eyebrow">
            <span className="mr-3 text-accent">05</span> Experience & Qualifications
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">Verified record</p>
        </div>

        <h2 className="display mb-14 text-[clamp(2.6rem,8.6vw,8.6rem)] lg:mb-20">
          <Reveal>
            <span className="block">THE RECORD.</span>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="block outline-text">NO FICTION.</span>
          </Reveal>
        </h2>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <BadgeCheck size={17} className="text-accent" />
              <p className="eyebrow">Published on source profile</p>
            </div>
            <div className="border-t border-white/10">
              {verifiedExperience.map((item, index) => (
                <Reveal key={item.label} delay={index * 0.05}>
                  <div className="grid grid-cols-[1fr_auto] gap-6 border-b border-white/10 py-6 sm:grid-cols-[0.6fr_1.4fr_auto]">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">{item.label}</p>
                    <div>
                      <p className="text-lg font-medium leading-snug text-paper sm:text-xl">{item.value}</p>
                      <p className="mt-1.5 text-sm text-white/45">{item.detail}</p>
                    </div>
                    <span className="font-mono text-[10px] text-accent">{item.year}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            {roles.length > 0 && (
              <div className="mt-14">
                <div className="mb-6 flex items-center gap-3">
                  <BriefcaseBusiness size={17} className="text-accent" />
                  <p className="eyebrow">Professional roles</p>
                </div>
                {roles.map((role) => (
                  <div key={`${role.title}-${role.organization}`} className="border-t border-white/10 py-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-xl font-medium">{role.title}</h3>
                      <span className="font-mono text-[10px] text-accent">{role.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{role.organization}</p>
                    <p className="mt-3 text-sm text-white/55">{role.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Reveal delay={0.1}>
              <div className="border border-white/10 bg-black/40 p-7">
                <div className="mb-5 flex items-center gap-3">
                  <Info size={16} className="text-accent" />
                  <p className="eyebrow">Source note</p>
                </div>
                <p className="text-sm leading-relaxed text-white/55">{sourceNote}</p>
              </div>
            </Reveal>

            {education.length > 0 && (
              <div className="border border-white/10 p-7">
                <div className="mb-5 flex items-center gap-3">
                  <GraduationCap size={16} className="text-accent" />
                  <p className="eyebrow">Education</p>
                </div>
                {education.map((item) => (
                  <div key={item.qualification} className="border-t border-white/10 py-4 first:border-0 first:pt-0">
                    <p className="text-lg">{item.qualification}</p>
                    <p className="mt-1 text-sm text-muted">{item.institution} · {item.period}</p>
                  </div>
                ))}
              </div>
            )}

            {certificates.length > 0 && (
              <div className="border border-white/10 p-7">
                <div className="mb-5 flex items-center gap-3">
                  <BadgeCheck size={16} className="text-accent" />
                  <p className="eyebrow">Certificates</p>
                </div>
                {certificates.map((item) => (
                  <div key={item.name} className="border-t border-white/10 py-4 first:border-0 first:pt-0">
                    <p className="text-lg">{item.name}</p>
                    <p className="mt-1 text-sm text-muted">{item.issuer} · {item.year}</p>
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noreferrer" className="link-underline mt-2 inline-block text-sm text-accent">
                        View credential ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            <Reveal delay={0.16}>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border border-white/15 p-6 transition-colors duration-500 hover:border-accent"
              >
                <div>
                  <p className="eyebrow mb-2">Verify on LinkedIn</p>
                  <p className="text-sm text-white/70">Public profile linked from Behance</p>
                </div>
                <span className="text-accent transition-transform duration-500 group-hover:translate-x-1">↗</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
