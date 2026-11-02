'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertCircle, ArrowUpRight, Check, Copy, Facebook, MessageCircle, Phone, Send } from 'lucide-react';

type CopyStatus = 'idle' | 'copied' | 'error';

interface ContactCardData {
  id: 'facebook' | 'telegram' | 'viber';
  title: string;
  subtitle: string;
  description: string;
  accent: 'facebook' | 'telegram' | 'viber';
}

const contactCards: ContactCardData[] = [
  { id: 'facebook', title: 'Facebook', subtitle: 'Social & Updates', description: 'Follow along for updates, new work, and a little life outside the code.', accent: 'facebook' },
  { id: 'telegram', title: 'Telegram', subtitle: '@kito_13', description: 'For a quick question or a project idea, send me a direct message.', accent: 'telegram' },
  { id: 'viber', title: 'Viber & Phone', subtitle: '+989958188804', description: 'Reach me on Viber or call directly. Happy to talk through the details.', accent: 'viber' },
];

function CopyControl({ value, label, status, onCopy }: { value: string; label: string; status: CopyStatus; onCopy: (value: string) => void }) {
  const copied = status === 'copied';
  const text = copied ? 'Copied!' : status === 'error' ? 'Copy unavailable' : label;
  return <div className="contact-copy-wrap">
    <button className={`contact-copy ${copied ? 'is-copied' : ''} ${status === 'error' ? 'is-error' : ''}`} type="button" aria-label={`${label}: copy ${value}`} aria-live="polite" onClick={() => onCopy(value)}>
      {copied ? <Check size={14} aria-hidden="true" /> : status === 'error' ? <AlertCircle size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      <span>{text}</span>
    </button>
  </div>;
}

export default function ContactInfoHub() {
  const [telegramStatus, setTelegramStatus] = useState<CopyStatus>('idle');
  const [phoneStatus, setPhoneStatus] = useState<CopyStatus>('idle');
  const telegramTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phoneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (telegramTimer.current) clearTimeout(telegramTimer.current);
    if (phoneTimer.current) clearTimeout(phoneTimer.current);
  }, []);

  const copyValue = async (value: string, setStatus: (status: CopyStatus) => void, timer: { current: ReturnType<typeof setTimeout> | null }) => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), 1800);
  };

  return <div className="contact-hub-grid" aria-label="Social and direct contact options">
    {contactCards.map((card) => <article className={`contact-hub-card contact-hub-${card.accent}`} key={card.id}>
      <div className="contact-hub-top">
        <span className="contact-hub-icon" aria-hidden="true">
          {card.id === 'facebook' ? <Facebook size={19} /> : card.id === 'telegram' ? <Send size={19} /> : <Phone size={19} />}
        </span>
        <span className="contact-hub-subtitle">{card.subtitle}</span>
      </div>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <div className="contact-hub-actions">
        {card.id === 'facebook' ? <a className="contact-hub-primary" href="https://www.facebook.com/share/19j9J8VQPU/" target="_blank" rel="noopener noreferrer" aria-label="Open Facebook profile in a new tab">Visit Facebook <ArrowUpRight size={14} /></a> : null}
        {card.id === 'telegram' ? <>
          <a className="contact-hub-primary" href="https://t.me/kito_13" target="_blank" rel="noopener noreferrer" aria-label="Open Telegram chat with Kito">Message on Telegram <ArrowUpRight size={14} /></a>
          <CopyControl value="@kito_13" label="Copy Telegram handle" status={telegramStatus} onCopy={(value) => copyValue(value, setTelegramStatus, telegramTimer)} />
        </> : null}
        {card.id === 'viber' ? <>
          <div className="contact-hub-phone-actions">
            <a className="contact-hub-primary" href="viber://chat?number=%2B989958188804" aria-label="Start a Viber chat">Viber chat <MessageCircle size={14} /></a>
            <a className="contact-hub-call" href="tel:+989958188804" aria-label="Call plus 98 995 818 8804">Call <Phone size={13} /></a>
          </div>
          <CopyControl value="+989958188804" label="Copy phone number" status={phoneStatus} onCopy={(value) => copyValue(value, setPhoneStatus, phoneTimer)} />
        </> : null}
      </div>
    </article>)}
  </div>;
}
