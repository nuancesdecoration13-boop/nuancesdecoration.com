import { useEffect, useRef, useState, type FormEvent } from 'react';
import { X, Info, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

type CatId = 'types' | 'tissus' | 'pose';
type Item = { k: string; name: string; more?: string };

// Line illustrations (static, trusted markup) used in the image tiles
const ICONS: Record<string, string> = {
  bateau: "<svg viewBox=\"0 0 240 200\" width=\"88%\" height=\"88%\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"#7B514A\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g stroke=\"#B89A8E\" stroke-width=\"2\"><rect x=\"56\" y=\"34\" width=\"128\" height=\"150\" fill=\"#FBF9F5\"></rect><path d=\"M120 34 V184 M56 112 H184\"></path></g><path d=\"M46 28 H194\" stroke-width=\"4\"></path><path d=\"M50 30 H190 V120 H50 Z\" fill=\"#F6F4F0\"></path><path d=\"M50 52 H190 M50 74 H190 M50 96 H190\" stroke-width=\"2\"></path><path d=\"M48 120 H192\" stroke-width=\"3.5\"></path><path d=\"M164 30 V150\" stroke=\"#B89A8E\" stroke-width=\"1.5\"></path><circle cx=\"164\" cy=\"154\" r=\"3.5\" stroke=\"#B89A8E\" stroke-width=\"1.5\"></circle></g></svg>",
  enrouleur: "<svg viewBox=\"0 0 240 200\" width=\"88%\" height=\"88%\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"#7B514A\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g stroke=\"#B89A8E\" stroke-width=\"2\"><rect x=\"56\" y=\"34\" width=\"128\" height=\"150\" fill=\"#FBF9F5\"></rect><path d=\"M120 34 V184 M56 112 H184\"></path></g><rect x=\"44\" y=\"22\" width=\"152\" height=\"12\" rx=\"6\" fill=\"#F6F4F0\"></rect><path d=\"M50 34 V128 H190 V34\" fill=\"#F6F4F0\"></path><path d=\"M48 128 H192\" stroke-width=\"3.5\"></path><path d=\"M202 28 V150\" stroke=\"#B89A8E\" stroke-width=\"1.5\" stroke-dasharray=\"2 5\"></path></g></svg>",
  venitien: "<svg viewBox=\"0 0 240 200\" width=\"88%\" height=\"88%\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"#7B514A\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g stroke=\"#B89A8E\" stroke-width=\"2\"><rect x=\"56\" y=\"34\" width=\"128\" height=\"150\" fill=\"#FBF9F5\"></rect><path d=\"M120 34 V184 M56 112 H184\"></path></g><rect x=\"46\" y=\"24\" width=\"148\" height=\"12\" rx=\"2\" fill=\"#F6F4F0\"></rect><path d=\"M50 38 H190 V134 H50 Z\" fill=\"#F6F4F0\" stroke=\"none\"></path><path d=\"M52 44 H188\" stroke-width=\"3\"></path><path d=\"M52 54 H188\" stroke-width=\"3\"></path><path d=\"M52 64 H188\" stroke-width=\"3\"></path><path d=\"M52 74 H188\" stroke-width=\"3\"></path><path d=\"M52 84 H188\" stroke-width=\"3\"></path><path d=\"M52 94 H188\" stroke-width=\"3\"></path><path d=\"M52 104 H188\" stroke-width=\"3\"></path><path d=\"M52 114 H188\" stroke-width=\"3\"></path><path d=\"M52 124 H188\" stroke-width=\"3\"></path><path d=\"M52 134 H188\" stroke-width=\"3\"></path><path d=\"M84 36 V136 M156 36 V134\" stroke=\"#B89A8E\" stroke-width=\"1.2\"></path><path d=\"M50 138 H190\" stroke-width=\"3.5\"></path><path d=\"M200 30 V120\" stroke=\"#B89A8E\" stroke-width=\"1.5\"></path><path d=\"M196 120 H204\" stroke=\"#B89A8E\" stroke-width=\"2\"></path></g></svg>",
  japonais: "<svg viewBox=\"0 0 240 200\" width=\"88%\" height=\"88%\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"#7B514A\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M28 24 H212\" stroke-width=\"4\"></path><path d=\"M28 31 H212\" stroke=\"#B89A8E\" stroke-width=\"1.5\"></path><path d=\"M38 33 H96 V180 H38 Z\" fill=\"#F6F4F0\"></path><path d=\"M91 33 H149 V180 H91 Z\" fill=\"#F6F4F0\"></path><path d=\"M144 33 H202 V180 H144 Z\" fill=\"#F6F4F0\"></path><path d=\"M36 180 H98 M89 180 H151 M142 180 H204\" stroke-width=\"3.5\"></path><path d=\"M54 70 H80 M54 110 H80 M160 70 H186 M160 130 H186\" stroke=\"#B89A8E\" stroke-width=\"1.2\" stroke-opacity=\"0.6\"></path></g></svg>",
  face: "<svg viewBox=\"0 0 240 200\" width=\"88%\" height=\"88%\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"#7B514A\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 186 H220\" stroke=\"#B89A8E\" stroke-width=\"2\"></path><g stroke=\"#B89A8E\" stroke-width=\"2\"><rect x=\"76\" y=\"60\" width=\"88\" height=\"126\" fill=\"#FBF9F5\"></rect><rect x=\"84\" y=\"68\" width=\"72\" height=\"118\" stroke-opacity=\"0.6\"></rect></g><path d=\"M60 44 H180\" stroke-width=\"4\"></path><path d=\"M66 40 V48 M174 40 V48\" stroke-width=\"2\"></path><path d=\"M64 46 H176 V124 H64 Z\" fill=\"#F6F4F0\"></path><path d=\"M64 70 H176 M64 94 H176\" stroke=\"#B89A8E\" stroke-width=\"1.5\"></path><path d=\"M62 124 H178\" stroke-width=\"3.5\"></path></g></svg>",
  tableau: "<svg viewBox=\"0 0 240 200\" width=\"88%\" height=\"88%\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"#7B514A\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 186 H220\" stroke=\"#B89A8E\" stroke-width=\"2\"></path><g stroke=\"#B89A8E\" stroke-width=\"2\"><rect x=\"54\" y=\"28\" width=\"132\" height=\"158\" fill=\"#FBF9F5\"></rect><rect x=\"64\" y=\"38\" width=\"112\" height=\"148\" stroke-opacity=\"0.6\"></rect></g><path d=\"M66 44 H174\" stroke-width=\"4\"></path><path d=\"M68 46 H172 V124 H68 Z\" fill=\"#F6F4F0\"></path><path d=\"M68 72 H172 M68 98 H172\" stroke=\"#B89A8E\" stroke-width=\"1.5\"></path><path d=\"M66 124 H174\" stroke-width=\"3.5\"></path></g></svg>",
  plafond: "<svg viewBox=\"0 0 240 200\" width=\"88%\" height=\"88%\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"#7B514A\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 22 H220\" stroke=\"#B89A8E\" stroke-width=\"2.5\"></path><path d=\"M20 22 H220\" stroke=\"#B89A8E\" stroke-width=\"10\" stroke-opacity=\"0.15\"></path><path d=\"M20 186 H220\" stroke=\"#B89A8E\" stroke-width=\"2\"></path><g stroke=\"#B89A8E\" stroke-width=\"2\"><rect x=\"76\" y=\"60\" width=\"88\" height=\"126\" fill=\"#FBF9F5\"></rect><rect x=\"84\" y=\"68\" width=\"72\" height=\"118\" stroke-opacity=\"0.6\"></rect></g><path d=\"M74 24 V30 M166 24 V30\" stroke-width=\"2\"></path><path d=\"M68 32 H172\" stroke-width=\"4\"></path><path d=\"M70 34 H170 V118 H70 Z\" fill=\"#F6F4F0\"></path><path d=\"M70 58 H170 M70 82 H170\" stroke=\"#B89A8E\" stroke-width=\"1.5\"></path><path d=\"M68 118 H172\" stroke-width=\"3.5\"></path></g></svg>",
};

const DATA: Record<CatId, Item[]> = {
  types: [
    { k: 'bateau', name: 'Store bateau' },
    { k: 'enrouleur', name: 'Store enrouleur' },
    { k: 'venitien', name: 'Store vénitien' },
    { k: 'japonais', name: 'Panneaux japonais' },
  ],
  tissus: [
    { k: 'transparent', name: 'Transparent' },
    { k: 'tamisant', name: 'Tamisant' },
    { k: 'obscurcissant', name: 'Obscurcissant' },
    { k: 'occultant', name: 'Occultant' },
    { k: 'thermique', name: 'Thermique' },
  ],
  pose: [
    { k: 'face', name: 'Murale' },
    { k: 'tableau', name: 'Dans la baie' },
    { k: 'plafond', name: 'Au plafond' },
  ],
};

const LABELS: Record<CatId, string> = { types: 'Type de store', tissus: 'Tissu', pose: 'Pose' };

const TONES = [
  { id: 'naturel', name: 'Tons naturels', word: 'tons naturels', bg: 'conic-gradient(#FFFFFF 0 33%, #EFE8DA 0 66%, #C6AD8A 0)' },
  { id: 'pastel', name: 'Tons pastels', word: 'tons pastels', bg: 'conic-gradient(#D6B2A7 0 33%, #A9B39B 0 66%, #A7B4BD 0)' },
  { id: 'vif', name: 'Tons vifs', word: 'tons vifs', bg: 'conic-gradient(#B4552F 0 25%, #D19A2A 0 50%, #4F7A52 0 75%, #2F5D8A 0)' },
  { id: 'fonce', name: 'Tons foncés', word: 'tons foncés', bg: 'conic-gradient(#3D2314 0 33%, #2B3442 0 66%, #4A4A48 0)' },
];

const LABEL = "font-['MaisonNeue'] font-bold text-[10px] tracking-[2px] uppercase text-[var(--moka)]";
const BTN_DARK =
  "w-full font-['MaisonNeue'] font-bold text-[12px] tracking-[2.5px] uppercase text-[var(--linen)] bg-[var(--moka)] border-none py-4 px-6 cursor-pointer transition-colors hover:bg-[var(--charcoal)] disabled:opacity-60";
const FIELD =
  "w-full border border-[var(--pale)] bg-white px-4 py-3 font-['MaisonNeue'] font-light text-[14px] text-[var(--charcoal)] focus:outline-none focus:border-[var(--primary)]";
const FIELD_LABEL = "block font-['MaisonNeue'] font-light text-[10px] tracking-[2px] uppercase text-[var(--warm)] mb-2";

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

function AppointmentModal({ summary, onClose }: { summary: string; onClose: () => void }) {
  const [rdv, setRdv] = useState('');
  const pendingIdRef = useRef<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [state, setState] = useState<SubmitState>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  
useEffect(() => {
  const handleMessage = (event: MessageEvent) => {
    const origineValide =
      event.origin === "https://script.google.com" ||
      /^https:\/\/([a-z0-9-]+\.)*googleusercontent\.com$/i.test(
        event.origin
      );

    if (!origineValide) return;

    const data = event.data;

    if (
      data?.type !== "nuances-contact-result" ||
      !pendingIdRef.current ||
      data.requestId !== pendingIdRef.current
    ) {
      return;
    }

    pendingIdRef.current = null;

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (data.success === true) {
      setState("success");
    } else {
      setState("error");
      setError(
        "L'envoi a échoué. Veuillez réessayer."
      );
    }
  };

  window.addEventListener("message", handleMessage);

  return () => {
    window.removeEventListener("message", handleMessage);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
  };
}, []);



const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (pendingIdRef.current) return;

  if (!rdv) {
    setState("error");
    setError(
      "Choisissez un type de rendez-vous : au showroom ou à domicile."
    );
    return;
  }

  setState("loading");
  setError("");

  const formData = new FormData(e.currentTarget);

  const details = String(formData.get("message") || "").trim();

  const message =
    "Demande depuis la page Stores\n" +
    "Sélection : " + summary + "\n\n" +
    (details || "Pas de précision ajoutée.");

  formData.set(
    "appointment_type",
    rdv === "domicile" ? "À domicile" : "Au showroom"
  );

  formData.set("message", message);

  const requestId = crypto.randomUUID();
  formData.set("request_id", requestId);
  pendingIdRef.current = requestId;

  try {
    const postForm = document.createElement("form");

    postForm.method = "POST";
    postForm.action =
    "https://script.google.com/macros/s/AKfycbw201Tew-7x9Dz7aJuwfISTcPxhc3lGhm71VovfTwjfWavYOilyiTw-xPMk7H-kwzmJ/exec";
    postForm.target = "nuances-stores-target";
    postForm.style.display = "none";

    formData.forEach((value, key) => {
      if (typeof value !== "string") return;

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;

      postForm.appendChild(input);
    });

    document.body.appendChild(postForm);

    try {
      postForm.submit();
    } finally {
      postForm.remove();
    }

    timeoutRef.current = window.setTimeout(() => {
      if (pendingIdRef.current !== requestId) return;

      pendingIdRef.current = null;
      setState("error");
      setError(
        "Confirmation indisponible. Vérifiez votre boîte Gmail " +
        "avant de réessayer pour éviter un doublon."
      );
    }, 30000);

  } catch {
    pendingIdRef.current = null;
    setState("error");
    setError(
      "Impossible de lancer l'envoi. Veuillez réessayer."
    );
  }
};


  return (
    <div className="fixed inset-0 z-[200] bg-black/45 flex items-start justify-center p-3 md:p-10 overflow-y-auto" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rdv-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[560px] bg-white px-5 pt-8 pb-6 md:px-11 md:pt-11 md:pb-9"
      >
        
<button type="button" aria-label="Fermer" onClick={onClose} className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--moka)]">
  <X size={18} />
</button>

<iframe
  name="nuances-stores-target"
  title="Confirmation de l'envoi"
  className="hidden"
  aria-hidden="true"
  tabIndex={-1}
/>

{state === 'success' ? (

          <div className="flex flex-col items-center text-center gap-3.5 pt-6 pb-2">
            <CheckCircle2 size={40} strokeWidth={1.4} className="text-[var(--primary)]" />
            <h2 className="font-['FreeSerif'] font-black text-[28px] text-[var(--moka)] leading-[1.15] m-0">Demande envoyée</h2>
            <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.7] max-w-[380px] m-0">
              Merci. Nous avons bien reçu votre demande et votre sélection, nous vous recontactons pour fixer le rendez-vous.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 font-['MaisonNeue'] font-bold text-[10px] tracking-[2.5px] uppercase text-[var(--moka)] bg-transparent border border-[var(--moka)] py-3.5 px-7 cursor-pointer transition-colors hover:bg-[var(--moka)] hover:text-[var(--linen)]"
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <h2 id="rdv-title" className="font-['FreeSerif'] font-black text-[26px] md:text-[30px] text-[var(--moka)] leading-[1.15] m-0">
              Prendre rendez-vous
            </h2>
            <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.7] mt-2 mb-5">
              Laissez-nous vos coordonnées, nous vous rappelons pour fixer le rendez-vous.
            </p>
            <div className="bg-[var(--linen)] px-5 py-4 mb-6">
              <p className={`${LABEL} m-0 mb-1.5`}>Votre store sur mesure</p>
              <p className="font-['MaisonNeue'] font-light text-[14px] text-[var(--moka)] m-0">{summary}</p>
              
            </div>

            {state === 'error' && (
              <div className="flex gap-3 bg-red-50 border border-red-200 px-4 py-3 mb-5">
                <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-[2px]" />
                <p className="font-['MaisonNeue'] font-light text-[13px] text-red-800 leading-[1.6] m-0">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
              
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-10000px]"
            />

              <div>
                <label htmlFor="rdv-name" className={FIELD_LABEL}>Nom complet</label>
                <input id="rdv-name" type="text" name="name" required placeholder="Jean Dupont" disabled={state === 'loading'} className={FIELD} />
              </div>
              <div>
                <label htmlFor="rdv-email" className={FIELD_LABEL}>Email</label>
                <input id="rdv-email" type="email" name="email" required placeholder="jean.dupont@email.com" disabled={state === 'loading'} className={FIELD} />
              </div>
              <div>
                <label htmlFor="rdv-phone" className={FIELD_LABEL}>Téléphone</label>
                <input id="rdv-phone" type="tel" name="phone" required placeholder="06 12 34 56 78" disabled={state === 'loading'} className={FIELD} />
              </div>
              <div>
                <span className={FIELD_LABEL}>Type de rendez-vous</span>
                <div role="group" aria-label="Type de rendez-vous" className="grid grid-cols-2 gap-2">
                  {[['showroom', 'Au showroom'], ['domicile', 'À domicile']].map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={rdv === id}
                      onClick={() => setRdv(id)}
                      className={`min-h-[44px] font-['MaisonNeue'] font-light text-[13px] cursor-pointer border transition-colors ${
                        rdv === id ? 'bg-[#A0716B] border-[#A0716B] text-white' : 'bg-white border-[var(--pale)] text-[var(--moka)]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {rdv === 'domicile' && (
                  <div className="mt-3 flex gap-3 bg-[var(--grege-p)] border border-[var(--pale)] px-4 py-3">
                    <Info size={16} className="text-[var(--primary)] flex-shrink-0 mt-[2px]" />
                    <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.7] m-0">
                      Le déplacement à domicile est un service payant. Des frais de déplacement vous seront communiqués lors de la confirmation de votre rendez-vous.
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="rdv-message" className={FIELD_LABEL}>Précisions (facultatif)</label>
                <textarea
                  id="rdv-message"
                  name="message"
                  rows={3}
                  placeholder="Nombre de fenêtres, dimensions approximatives, délai souhaité…"
                  disabled={state === 'loading'}
                  className={`${FIELD} resize-y`}
                />
              </div>
              <button type="submit" disabled={state === 'loading'} className={`${BTN_DARK} flex items-center justify-center gap-2`}>
                {state === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer ma demande'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function StoresConfigurator() {
  const [sel, setSel] = useState<Record<CatId, string>>({ types: 'bateau', tissus: 'tamisant', pose: 'face' });
  const [tone, setTone] = useState('naturel');
  const [open, setOpen] = useState(false);

  const find = (id: CatId) => DATA[id].find((x) => x.k === sel[id])!;
  const toneObj = TONES.find((t) => t.id === tone) ?? TONES[0];
  const value = (id: CatId) => (id === 'tissus' ? `${find(id).name}, ${toneObj.word}` : find(id).name);
  const order: CatId[] = ['types', 'tissus', 'pose'];
  const summary = order.map(value).join(' · ');
  const pick = (id: CatId, k: string) => setSel((s) => ({ ...s, [id]: k }));

  const tiles = (id: CatId) => (
    <div className="flex flex-wrap gap-2">
      {DATA[id].map((it) => {
        const on = sel[id] === it.k;
        return (
          <button
            key={it.k}
            type="button"
            aria-pressed={on}
            aria-label={it.name}
            title={it.name}
            onClick={() => pick(id, it.k)}
            className="flex flex-col gap-[5px] p-0 bg-transparent border-none cursor-pointer"
          >
            <span
              className="w-[60px] h-[50px] md:w-[68px] md:h-[56px] bg-[#EFEAE3] flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: ICONS[it.k] }}
            />
            <span className={`block h-[2px] ${on ? 'bg-[#A0716B]' : 'bg-transparent'}`} />
          </button>
        );
      })}
    </div>
  );

  const card = (
    <div className="bg-white px-4 pt-6 pb-[22px] md:px-10 md:pt-9 md:pb-[30px] flex flex-col">
      <h2 className="font-['FreeSerif'] font-black text-[26px] md:text-[32px] text-[var(--moka)] leading-[1.15] m-0 mb-[18px]">
        Votre store sur mesure
      </h2>

      {order.map((id) => (
        <div key={id} className="py-3.5 md:py-4 border-t border-[#EDE6DE] flex flex-col gap-2.5">
          <p className="m-0 font-['MaisonNeue'] font-light text-[13px] text-[var(--moka)]">
            <span className={LABEL}>{LABELS[id]} :</span> {value(id)}
          </p>
          {id === 'tissus' ? (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2.5">
              <div className="relative inline-flex">
                <select
                  aria-label="Type de tissu"
                  value={sel.tissus}
                  onChange={(e) => pick('tissus', e.target.value)}
                  className="appearance-none min-h-[40px] min-w-[170px] pl-4 pr-10 font-['MaisonNeue'] font-light text-[13px] text-[var(--moka)] bg-white border border-[#D9CFC4] rounded-none cursor-pointer"
                >
                  {DATA.tissus.map((t) => (
                    <option key={t.k} value={t.k}>{t.name}</option>
                  ))}
                </select>
                <svg viewBox="0 0 12 8" width="12" height="8" aria-hidden="true" className="absolute right-[15px] top-1/2 -mt-1 pointer-events-none">
                  <path d="M1 1.5 L6 6.5 L11 1.5" fill="none" stroke="#3D2314" strokeWidth="1.4" />
                </svg>
              </div>
              <span aria-hidden="true" className="w-px h-10 bg-[#D9CFC4] mx-1.5" />
              <div role="group" aria-label="Couleur du tissu" className="flex flex-col gap-0.5">
                <span aria-live="polite" className="font-['MaisonNeue'] font-light text-[12px] leading-[1.2] text-[#7B514A] pl-1">{toneObj.name}</span>
                <div className="flex items-center gap-0.5">
                  {TONES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={t.id === tone}
                      aria-label={t.name}
                      title={t.name}
                      onClick={() => setTone(t.id)}
                      className="w-[34px] h-[34px] p-[3px] bg-transparent rounded-full cursor-pointer"
                      style={{ border: `1.5px solid ${t.id === tone ? '#A0716B' : 'transparent'}` }}
                    >
                      <span className="block w-full h-full rounded-full border border-[#D9CFC4]" style={{ background: t.bg }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            tiles(id)
          )}
        </div>
      ))}

      <div className="border-t border-[#EDE6DE] pt-[18px]">
        <div className="bg-[var(--linen)] px-4 py-[18px] md:px-6 md:py-5 mb-[18px]">
          <p className={`${LABEL} m-0 mb-1.5`}>Récapitulatif de votre sélection</p>
          <p className="m-0 font-['MaisonNeue'] font-light text-[14px] text-[var(--moka)]">{summary}</p>
        </div>
        <button type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className={BTN_DARK}>
          Prendre rendez-vous
        </button>
        <div className="grid grid-cols-3 mt-4 text-center font-['MaisonNeue'] font-light text-[11px] md:text-[13px] leading-[1.4] text-[var(--moka)]">
          <span className="px-1.5 py-0.5">Conseils à domicile</span>
          <span className="px-1.5 py-0.5 border-x border-[#D9CFC4]">Prise de mesures</span>
          <span className="px-1.5 py-0.5">Confection et pose</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-[var(--linen)] px-0 pt-2 pb-8 md:px-12 md:pt-14 md:pb-16">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 items-stretch">
        <img
          src={`${import.meta.env.BASE_URL}config-store-bateau.jpg`}
          alt="Store bateau sur mesure en lin naturel au-dessus d'un évier de cuisine"
          className="hidden md:block w-full h-full min-h-[420px] object-cover"
          loading="lazy"
        />
        {card}
      </div>
      {open && <AppointmentModal summary={summary} onClose={() => setOpen(false)} />}
    </section>
  );
}
