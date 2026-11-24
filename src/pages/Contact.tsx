import { useState, useEffect, useRef, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, Info, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Seo from "../components/Seo";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [appointmentType, setAppointmentType] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");


const formRef = useRef<HTMLFormElement>(null);
const pendingIdRef = useRef<string | null>(null);
const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (data.success === true) {
      setSubmitState("success");
      formRef.current?.reset();
      setAppointmentType("");
    } else {
      setSubmitState("error");
      setErrorMessage(
        "L'envoi a échoué. Veuillez réessayer."
      );
    }
  };

  window.addEventListener("message", handleMessage);

  return () => {
    window.removeEventListener("message", handleMessage);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
}, []);





const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (pendingIdRef.current) return;

  setSubmitState("loading");
  setErrorMessage("");

  const formData = new FormData(e.currentTarget);

  formData.set(
    "appointment_type",
    appointmentType === "domicile"
      ? "À domicile"
      : "Au showroom"
  );

  const requestId = crypto.randomUUID();
  formData.set("request_id", requestId);
  pendingIdRef.current = requestId;

  try {
    const postForm = document.createElement("form");

    postForm.method = "POST";
    postForm.action = "https://script.google.com/macros/s/AKfycbw201Tew-7x9Dz7aJuwfISTcPxhc3lGhm71VovfTwjfWavYOilyiTw-xPMk7H-kwzmJ/exec";
    postForm.target = "nuances-contact-target";
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

    timeoutRef.current = setTimeout(() => {
      if (pendingIdRef.current !== requestId) return;

      pendingIdRef.current = null;
      setSubmitState("error");
      setErrorMessage(
        "Confirmation indisponible. Vérifiez la réception " +
        "du message avant de réessayer pour éviter un doublon."
      );
    }, 30000);

  } catch {
    pendingIdRef.current = null;
    setSubmitState("error");
    setErrorMessage(
      "Impossible de lancer l'envoi. Veuillez réessayer."
    );
  }
};




  return (
    <div className="min-h-screen">
      <Seo
        title="Contact et rendez-vous — Nuances Décoration"
        description="Prenez rendez-vous au showroom ou à domicile avec Nuances Décoration à Marseille. Rideaux, voilages, stores et textiles sur mesure. 63 Av. de Montredon, 13008 Marseille."
        path="/contact"
      />
      <section className="px-6 md:px-12 py-16 md:py-20 bg-[var(--linen)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="font-['MaisonNeue'] font-thin text-[9px] tracking-[4px] uppercase text-[var(--primary)] mb-4 block">
              Contact
            </span>
            <h1 className="font-['FreeSerif'] font-black text-[38px] md:text-[52px] text-[var(--moka)] leading-[1.05] mb-6">
              Donnons vie
              <br />à votre projet
            </h1>
            <div className="w-16 h-[1px] bg-[var(--primary)] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <div>
              <h2 className="font-['FreeSerif'] font-black text-[32px] text-[var(--moka)] leading-[1.1] mb-8">
                Prenez rendez-vous
              </h2>

              {submitState === "success" && (
                <div className="mb-6 flex gap-3 bg-green-50 border border-green-200 px-4 py-4">
                  <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-[2px]" />
                  <p className="font-['MaisonNeue'] font-light text-[14px] text-green-800 leading-[1.6]">
                    Votre demande a bien été envoyée. Nous vous répondrons dans les 24 heures.
                  </p>
                </div>
              )}

              {submitState === "error" && (
                <div className="mb-6 flex gap-3 bg-red-50 border border-red-200 px-4 py-4">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-[2px]" />
                  <p className="font-['MaisonNeue'] font-light text-[14px] text-red-800 leading-[1.6]">
                    {errorMessage || "L'envoi a échoué. Veuillez réessayer ou nous appeler directement."}
                  </p>
                </div>
              )}

              <iframe
                name="nuances-contact-target"
                title="Confirmation de l'envoi"
                className="hidden"
                aria-hidden="true"
                tabIndex={-1}
              />
              
              <formref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-10000px]"
                />
                                <div>
                  <label className="block font-['MaisonNeue'] font-light text-[10px] tracking-[2px] uppercase text-[var(--warm)] mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    disabled={submitState === "loading"}
                    className="w-full border border-[var(--pale)] bg-white px-4 py-3 font-['MaisonNeue'] font-light text-[14px] text-[var(--charcoal)] transition-colors focus:outline-none focus:border-[var(--primary)] disabled:opacity-60"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label className="block font-['MaisonNeue'] font-light text-[10px] tracking-[2px] uppercase text-[var(--warm)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={submitState === "loading"}
                    className="w-full border border-[var(--pale)] bg-white px-4 py-3 font-['MaisonNeue'] font-light text-[14px] text-[var(--charcoal)] transition-colors focus:outline-none focus:border-[var(--primary)] disabled:opacity-60"
                    placeholder="jean.dupont@email.com"
                  />
                </div>

                <div>
                  <label className="block font-['MaisonNeue'] font-light text-[10px] tracking-[2px] uppercase text-[var(--warm)] mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    disabled={submitState === "loading"}
                    className="w-full border border-[var(--pale)] bg-white px-4 py-3 font-['MaisonNeue'] font-light text-[14px] text-[var(--charcoal)] transition-colors focus:outline-none focus:border-[var(--primary)] disabled:opacity-60"
                    placeholder="06 12 34 56 78"
                  />
                </div>

                <div>
                  <label className="block font-['MaisonNeue'] font-light text-[10px] tracking-[2px] uppercase text-[var(--warm)] mb-2">
                    Type de rendez-vous
                  </label>
                  <select
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value)}
                    required
                    disabled={submitState === "loading"}
                    className="w-full border border-[var(--pale)] bg-white px-4 py-3 font-['MaisonNeue'] font-light text-[14px] text-[var(--charcoal)] transition-colors focus:outline-none focus:border-[var(--primary)] disabled:opacity-60"
                  >
                    <option value="">Choisir un type de rendez-vous</option>
                    <option value="showroom">Au showroom</option>
                    <option value="domicile">À domicile</option>
                  </select>
                  {appointmentType === "domicile" && (
                    <div className="mt-3 flex gap-3 bg-[var(--grege-p)] border border-[var(--pale)] px-4 py-3">
                      <Info size={16} className="text-[var(--primary)] flex-shrink-0 mt-[2px]" />
                      <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.7]">
                        Le déplacement à domicile est un service payant. Des frais de déplacement vous seront communiqués lors de la confirmation de votre rendez-vous. Ils seront déduits d'un devis signé.
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-['MaisonNeue'] font-light text-[10px] tracking-[2px] uppercase text-[var(--warm)] mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    disabled={submitState === "loading"}
                    className="w-full border border-[var(--pale)] bg-white px-4 py-3 font-['MaisonNeue'] font-light text-[14px] text-[var(--charcoal)] transition-colors focus:outline-none focus:border-[var(--primary)] resize-none disabled:opacity-60"
                    placeholder="Décrivez-nous votre projet..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className="w-full font-['MaisonNeue'] font-light text-[10px] tracking-[3px] uppercase text-[var(--linen)] bg-[var(--moka)] py-4 px-8 cursor-pointer transition-colors hover:bg-[var(--charcoal)] border-none disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-3"
                >
                  {submitState === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer ma demande"
                  )}
                </button>
              </form>
            </div>

            <div className="flex flex-col">
              <h2 className="font-['FreeSerif'] font-black text-[32px] text-[var(--moka)] leading-[1.1] mb-8">
                Nos coordonnées
              </h2>

              {/* Coordonnées en 2 colonnes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-7 mb-8">
                <div className="flex gap-3 min-w-0">
                  <MapPin size={18} className="text-[var(--primary)] flex-shrink-0 mt-[3px]" />
                  <div className="min-w-0 flex-1">
                    <p className="font-['MaisonNeue'] font-light text-[10px] tracking-[2px] uppercase text-[var(--primary)] mb-1">
                      Adresse
                    </p>
                    <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.7]">
                      63 Av. de Montredon
                      <br />
                      13008 Marseille, France
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock size={18} className="text-[var(--primary)] flex-shrink-0 mt-[3px]" />
                  <div className="min-w-0 flex-1">
                    <p className="font-['MaisonNeue'] font-light text-[10px] tracking-[2px] uppercase text-[var(--primary)] mb-1">
                      Horaires
                    </p>
                    <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.7]">
                      <span className="whitespace-nowrap">Lun – Ven : 9h00 – 18h00</span>
                      <br />
                      <span className="whitespace-nowrap">Samedi : sur rendez-vous</span>
                      <br />
                      <span className="whitespace-nowrap">Dimanche : Fermé</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 min-w-0">
                  <Phone size={18} className="text-[var(--primary)] flex-shrink-0 mt-[3px]" />
                  <div className="min-w-0 flex-1">
                    <p className="font-['MaisonNeue'] font-light text-[10px] tracking-[2px] uppercase text-[var(--primary)] mb-1">
                      Téléphone
                    </p>
                    <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.7]">
                      07 59 57 40 98<br />06 03 65 79 97
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 min-w-0">
                  <Mail size={18} className="text-[var(--primary)] flex-shrink-0 mt-[3px]" />
                  <div className="min-w-0 flex-1">
                    <p className="font-['MaisonNeue'] font-light text-[10px] tracking-[2px] uppercase text-[var(--primary)] mb-1">
                      Email
                    </p>
                    <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.7] break-all">
                      contact@nuancesdecoration.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Carte — flex-1 pour remplir la hauteur restante jusqu'au bas du formulaire */}
              <div className="flex-1 relative overflow-hidden min-h-[220px]">
                <iframe
                  title="Localisation Nuance Décoration"
                  src="https://www.google.com/maps?q=63+Avenue+de+Montredon,+13008+Marseille,+France&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-14 md:py-16 bg-[var(--moka)] text-center">
        <p className="font-['FreeSerif'] italic font-normal text-[20px] md:text-[26px] text-[var(--linen)] leading-[1.6] max-w-3xl mx-auto">
          Nous répondons généralement dans les 24 heures. Pour une demande urgente, n'hésitez pas à nous
          appeler directement.
        </p>
      </section>
    </div>
  );
}
