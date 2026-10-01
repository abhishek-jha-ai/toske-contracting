"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/config/site";
import { serviceLabels, type ServiceKey } from "@/data/projects";
import { trackEvent } from "@/lib/analytics";
import { onStartEstimate } from "@/lib/events";
import { submitEstimate } from "@/lib/leads";
import { ContactLink } from "./ContactLink";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

const serviceOptions = Object.entries(serviceLabels).map(([key, label]) => ({
  key: key as ServiceKey,
  label: label === "Custom Project" ? "Custom" : label,
}));

const stageOptions = [
  { value: "Ready to start", hint: "I’d like to get going soon" },
  { value: "Planning now", hint: "Gathering ideas and pricing" },
  { value: "Exploring options", hint: "Early days, just looking" },
];

const budgetOptions = ["Under $50k", "$50k – $100k", "$100k – $250k", "$250k+", "Not sure yet"];

const STEPS = ["Project", "Timing", "Budget", "Details"];

type Contact = { name: string; phone: string; email: string; zip: string; description: string };
const emptyContact: Contact = { name: "", phone: "", email: "", zip: "", description: "" };

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").replace(/^1(?=\d{10})/, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function EstimateWizard() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [service, setService] = useState<ServiceKey | null>(null);
  const [stage, setStage] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [contact, setContact] = useState<Contact>(emptyContact);
  const [errors, setErrors] = useState<Partial<Record<keyof Contact, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();

  const updateContact = (key: keyof Contact, value: string) => {
    setContact((c) => ({ ...c, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const markStarted = (source: string) => {
    if (started.current) return;
    started.current = true;
    trackEvent("estimate_started", { source });
  };

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  useEffect(
    () =>
      onStartEstimate((preselected) => {
        if (status === "sent") return;
        if (preselected) {
          setService(preselected);
          setDir(1);
          setStep((s) => (s === 0 ? 1 : s));
          markStarted("cta_preselected");
        }
      }),
    [status],
  );

  // Move focus to the step heading for screen-reader and keyboard users.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step, status]);

  const chooseService = (key: ServiceKey) => {
    markStarted("wizard");
    setService(key);
    trackEvent("service_selected", { service: key, source: "estimate_wizard" });
    go(1);
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!contact.name.trim()) e.name = "Please add your name.";
    if (contact.phone.replace(/\D/g, "").length !== 10) e.phone = "Please enter a 10-digit phone number.";
    if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = "That email doesn’t look quite right.";
    if (contact.zip && !/^\d{5}$/.test(contact.zip)) e.zip = "ZIP should be 5 digits.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!service || !stage || !validate()) return;
    setStatus("sending");
    try {
      await submitEstimate({
        service,
        stage,
        budget: budget ?? undefined,
        name: contact.name.trim(),
        phone: contact.phone,
        email: contact.email.trim() || undefined,
        zip: contact.zip || undefined,
        description: contact.description.trim() || undefined,
      });
      trackEvent("estimate_submitted", { service, stage, budget: budget ?? "skipped" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setStep(0);
    setService(null);
    setStage(null);
    setBudget(null);
    setContact(emptyContact);
    setErrors({});
    setStatus("idle");
    started.current = false;
  };

  const slide = {
    initial: (d: number) => (reduceMotion ? { opacity: 0 } : { opacity: 0, x: d * 28 }),
    animate: { opacity: 1, x: 0 },
    exit: (d: number) => (reduceMotion ? { opacity: 0 } : { opacity: 0, x: d * -28 }),
  };

  const firstName = contact.name.trim().split(/\s+/)[0];

  return (
    <section id="estimate" aria-labelledby="estimate-title" className="bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow text-gold-700">Free estimate</p>
          <h2 id="estimate-title" className="mt-3 font-serif text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.06] text-forest-900">
            Let’s talk about your project.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-stone">
            Answer a few quick questions — it takes about a minute. Prefer to talk directly? Reach out any way that suits you.
          </p>

          <ul className="mt-8 grid gap-3">
            <ContactRow channel="phone" icon={<PhoneIcon className="size-5" />} label="Call" value={site.contact.phoneDisplay} />
            <ContactRow channel="whatsapp" icon={<WhatsAppIcon className="size-5" />} label="WhatsApp" value="Chat on WhatsApp" />
            <ContactRow channel="email" icon={<MailIcon className="size-5" />} label="Email" value={site.contact.email} />
          </ul>
          <p className="mt-6 text-sm text-stone">Licensed General Contractor · Serving Pennsylvania & New Jersey</p>
        </div>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-xl border border-cream-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,42,34,0.35)]">
            {status !== "sent" && (
              <div className="border-b border-cream-200 px-6 pt-6 sm:px-9 sm:pt-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-forest-900">
                    Step {step + 1} <span className="font-normal text-stone">of {STEPS.length}</span>
                  </span>
                  {step > 0 && (
                    <button type="button" onClick={() => go(step - 1)} className="inline-flex items-center gap-1.5 py-1 font-semibold text-stone hover:text-forest-900">
                      <ArrowLeftIcon className="size-4" /> Back
                    </button>
                  )}
                </div>
                <div className="mt-4 grid grid-cols-4 gap-1.5 pb-6" aria-hidden>
                  {STEPS.map((s, i) => (
                    <span key={s} className="h-1 overflow-hidden rounded-full bg-cream-200">
                      <span
                        className="block h-full origin-left rounded-full bg-gold-500 transition-transform duration-500 ease-out-soft"
                        style={{ transform: `scaleX(${i <= step ? 1 : 0})` }}
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={`relative px-6 py-7 sm:px-9 sm:py-9 ${status !== "sent" && step < 3 ? "min-h-[480px] pb-28" : "min-h-[440px]"}`}>
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                {status === "sent" ? (
                  <motion.div key="sent" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-start py-6">
                    <span className="grid size-14 place-items-center rounded-full bg-forest-900 text-gold-300">
                      <CheckIcon className="size-7" />
                    </span>
                    <h3 ref={headingRef} tabIndex={-1} className="mt-6 font-serif text-[32px] leading-tight text-forest-900 outline-none">
                      Thank you{firstName ? `, ${firstName}` : ""}.
                    </h3>
                    <p className="mt-3 max-w-[460px] text-[17px] leading-relaxed text-stone">
                      Your {service ? serviceLabels[service].toLowerCase() : ""} project request has been received. Toske Contracting will
                      be in touch to set up a consultation.
                    </p>
                    {site.showDemoLabel && (
                      <p className="mt-4 rounded-md bg-cream-100 px-3 py-2 text-sm text-stone">
                        Demo note: requests aren’t delivered anywhere yet — this connects to email or a CRM at launch.
                      </p>
                    )}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <ContactLink
                        channel="whatsapp"
                        placement="estimate_success"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-forest-900 px-5 text-sm font-bold text-cream-50"
                      >
                        <WhatsAppIcon className="size-4 text-gold-300" /> Chat on WhatsApp now
                      </ContactLink>
                      <button type="button" onClick={reset} className="h-12 rounded-md px-5 text-sm font-semibold text-forest-900 underline-offset-4 hover:underline">
                        Start another request
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    custom={dir}
                    variants={slide}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step === 0 && (
                      <Step title="What are you planning?" headingRef={headingRef}>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {serviceOptions.map((o) => (
                            <Choice key={o.key} selected={service === o.key} onClick={() => chooseService(o.key)}>
                              {o.label}
                            </Choice>
                          ))}
                        </div>
                      </Step>
                    )}

                    {step === 1 && (
                      <Step title="Where are you in the process?" headingRef={headingRef} kicker={service ? serviceLabels[service] : undefined}>
                        <div className="grid gap-3">
                          {stageOptions.map((o) => (
                            <Choice
                              key={o.value}
                              selected={stage === o.value}
                              hint={o.hint}
                              onClick={() => {
                                setStage(o.value);
                                go(2);
                              }}
                            >
                              {o.value}
                            </Choice>
                          ))}
                        </div>
                      </Step>
                    )}

                    {step === 2 && (
                      <Step title="Approximate budget" subtitle="Optional — it just helps us prepare for the conversation." headingRef={headingRef}>
                        <div className="grid grid-cols-2 gap-3">
                          {budgetOptions.map((b) => (
                            <Choice
                              key={b}
                              selected={budget === b}
                              onClick={() => {
                                setBudget(b);
                                go(3);
                              }}
                            >
                              {b}
                            </Choice>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setBudget(null);
                            go(3);
                          }}
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-stone underline-offset-4 hover:text-forest-900 hover:underline"
                        >
                          Skip this step <ArrowRightIcon className="size-3.5" />
                        </button>
                      </Step>
                    )}

                    {step === 3 && (
                      <Step title="Where can we reach you?" headingRef={headingRef}>
                        <form noValidate onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                          <Field label="Name" required error={errors.name} className="sm:col-span-2">
                            <input
                              name="name"
                              autoComplete="name"
                              value={contact.name}
                              onChange={(e) => updateContact("name", e.target.value)}
                            />
                          </Field>
                          <Field label="Phone" required error={errors.phone}>
                            <input
                              name="phone"
                              type="tel"
                              inputMode="tel"
                              autoComplete="tel-national"
                              placeholder="(555) 555-5555"
                              value={contact.phone}
                              onChange={(e) => updateContact("phone", formatPhone(e.target.value))}
                            />
                          </Field>
                          <Field label="Email" error={errors.email}>
                            <input
                              name="email"
                              type="email"
                              inputMode="email"
                              autoComplete="email"
                              value={contact.email}
                              onChange={(e) => updateContact("email", e.target.value)}
                            />
                          </Field>
                          <Field label="ZIP code" error={errors.zip}>
                            <input
                              name="zip"
                              inputMode="numeric"
                              autoComplete="postal-code"
                              maxLength={5}
                              value={contact.zip}
                              onChange={(e) => updateContact("zip", e.target.value.replace(/\D/g, "").slice(0, 5))}
                            />
                          </Field>
                          <Field label="Project description" className="sm:col-span-2">
                            <textarea
                              name="description"
                              rows={3}
                              placeholder="A few words about the space and what you’d like to change"
                              value={contact.description}
                              onChange={(e) => updateContact("description", e.target.value)}
                            />
                          </Field>

                          <div className="sm:col-span-2">
                            <button
                              type="submit"
                              disabled={status === "sending"}
                              className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-gold-400 px-6 text-[15px] font-bold text-forest-950 transition-colors hover:bg-gold-300 disabled:opacity-70"
                            >
                              {status === "sending" ? "Sending…" : "Request My Consultation"}
                              {status !== "sending" && <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />}
                            </button>
                            {status === "error" && (
                              <p role="alert" className="mt-3 text-sm text-red-700">
                                Something went wrong sending your request. Please try again, or call {site.contact.phoneDisplay}.
                              </p>
                            )}
                            <p className="mt-3 text-center text-xs text-stone">
                              Your details are only used to respond to your inquiry.
                            </p>
                          </div>
                        </form>
                      </Step>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              {status !== "sent" && step < 3 && (
                <p className="absolute inset-x-6 bottom-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-cream-200 pt-5 text-[13px] text-stone sm:inset-x-9 sm:bottom-8">
                  <span className="inline-flex items-center gap-1.5"><CheckIcon className="size-4 text-gold-600" /> Free estimate</span>
                  <span className="inline-flex items-center gap-1.5"><CheckIcon className="size-4 text-gold-600" /> About a minute</span>
                  <span className="inline-flex items-center gap-1.5"><CheckIcon className="size-4 text-gold-600" /> PA & NJ</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  title,
  subtitle,
  kicker,
  headingRef,
  children,
}: {
  title: string;
  subtitle?: string;
  kicker?: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  children: ReactNode;
}) {
  return (
    <fieldset>
      <legend className="block w-full">
        {kicker && <span className="eyebrow mb-2 block text-[11px] text-gold-700">{kicker}</span>}
        <h3 ref={headingRef} tabIndex={-1} className="font-serif text-[28px] leading-tight text-forest-900 outline-none sm:text-[32px]">
          {title}
        </h3>
      </legend>
      {subtitle && <p className="mt-2 text-[15px] text-stone">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </fieldset>
  );
}

function Choice({
  selected,
  hint,
  onClick,
  children,
}: {
  selected: boolean;
  hint?: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`group flex min-h-[60px] items-center justify-between gap-3 rounded-lg border px-4 py-3.5 text-left transition-colors duration-200 ${
        selected
          ? "border-forest-900 bg-forest-900 text-cream-50"
          : "border-cream-300 bg-cream-50 text-forest-900 hover:border-forest-700/50 hover:bg-white"
      }`}
    >
      <span>
        <span className="block text-[16px] font-semibold">{children}</span>
        {hint && <span className={`mt-0.5 block text-sm ${selected ? "text-cream-100/75" : "text-stone"}`}>{hint}</span>}
      </span>
      <span
        className={`grid size-6 shrink-0 place-items-center rounded-full border transition-colors ${
          selected ? "border-gold-400 bg-gold-400 text-forest-950" : "border-cream-300 text-transparent group-hover:border-forest-700/40"
        }`}
      >
        <CheckIcon className="size-3.5" />
      </span>
    </button>
  );
}

function Field({
  label,
  required,
  error,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold text-forest-900">
        {label} {required ? <span className="text-gold-700">*</span> : <span className="font-normal text-stone">(optional)</span>}
      </span>
      <span
        className={`block rounded-md border bg-cream-50 transition-colors focus-within:border-forest-800 focus-within:bg-white [&>input]:h-12 [&>*]:w-full [&>*]:bg-transparent [&>*]:px-3.5 [&>*]:text-[16px] [&>*]:text-ink [&>*]:outline-none [&>*]:placeholder:text-stone/60 [&>textarea]:resize-none [&>textarea]:py-3 ${
          error ? "border-red-600" : "border-cream-300"
        }`}
      >
        {children}
      </span>
      {error && <span className="mt-1.5 block text-sm text-red-700">{error}</span>}
    </label>
  );
}

function ContactRow({
  channel,
  icon,
  label,
  value,
}: {
  channel: "phone" | "whatsapp" | "email";
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li>
      <ContactLink
        channel={channel}
        placement="estimate_section"
        className="group flex items-center gap-4 rounded-lg border border-cream-200 bg-white p-4 transition-colors hover:border-forest-800/40"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest-900 text-gold-300">{icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-bold uppercase tracking-[0.16em] text-stone">{label}</span>
          <span className="block truncate text-[16px] font-semibold text-forest-900">{value}</span>
        </span>
        <ArrowRightIcon className="size-4 text-gold-600 transition-transform group-hover:translate-x-0.5" />
      </ContactLink>
    </li>
  );
}
