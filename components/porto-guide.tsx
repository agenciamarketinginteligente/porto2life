'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowDown,
  ArrowUpRight,
  Baby,
  BedDouble,
  Bike,
  CalendarDays,
  Camera,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock3,
  Coffee,
  Dumbbell,
  ExternalLink,
  Gamepad2,
  KeyRound,
  LockKeyhole,
  MapPin,
  Maximize2,
  Martini,
  MessageCircle,
  Palmtree,
  PawPrint,
  Phone,
  PlugZap,
  Sailboat,
  Scissors,
  ShoppingBasket,
  ShowerHead,
  Sparkles,
  Sun,
  Utensils,
  Waves,
  X,
} from 'lucide-react';

const links = {
  roomService: 'https://porto2life.meucardapio.info/roomservice.php',
  okae: 'https://reservation-widget.tagme.com.br/smartlink/6942a933e74df40109a2b601',
  resortInstagram: 'https://www.instagram.com/porto2liferesort/',
  portoRaiz: 'https://www.instagram.com/portorainzmamitaria/',
  floricultura: 'https://www.instagram.com/floriculturaspeciale/',
  transfers: 'https://wa.me/5581986555580',
  ndTour: 'https://www.instagram.com/ndtour1/',
  hostWhatsApp: 'https://wa.me/5551982073632',
  hostInstagram: 'https://www.instagram.com/2liferesortmuroalto?exln=N2o3empleHF1N3Ro',
  emporioMuroAlto: 'https://share.google/u8V46PlRjRO8SYbGT',
  arcoVita: 'https://share.google/a4pp4xt5JTykIyDS7',
  spaWhatsApp: 'https://wa.me/5581989028947',
  resortLocation: 'https://www.google.com/maps/dir//porto+2+life+resort/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x7aaed83f0288801:0x3dae7d8a30bbfe5f?sa=X&ved=1t:155782&ictx=111',
};

const navItems = [
  { href: '#chegada', label: 'Chegada', icon: KeyRound },
  { href: '#apartamento', label: 'Apto', icon: BedDouble },
  { href: '#gastronomia', label: 'Comer', icon: Utensils },
  { href: '#lazer', label: 'Lazer', icon: Waves },
  { href: '#contatos', label: 'Contatos', icon: Phone },
];

const menuPages = [
  { src: '/restaurante-alacarte-foto.webp', label: 'Restaurante à la carte', alt: 'Prato servido no restaurante à la carte do resort' },
  { src: '/menu-alacarte-1.webp', label: 'Pratos principais', alt: 'Cardápio de pratos principais do restaurante à la carte' },
  { src: '/menu-alacarte-2.webp', label: 'Massas, risotos e menu infantil', alt: 'Cardápio de massas, risotos, grelhados e menu infantil' },
  { src: '/menu-alacarte-3.webp', label: 'Sobremesas', alt: 'Cardápio de sobremesas do restaurante' },
  { src: '/menu-alacarte-4.webp', label: 'Drinks autorais e cervejas', alt: 'Cardápio de drinks autorais, combos e cervejas' },
  { src: '/menu-alacarte-5.webp', label: 'Drinks clássicos e não alcoólicos', alt: 'Cardápio de drinks clássicos e bebidas não alcoólicas' },
  { src: '/menu-alacarte-6.webp', label: 'Destilados', alt: 'Cardápio de destilados do restaurante' },
  { src: '/menu-alacarte-7.webp', label: 'Cafeteria', alt: 'Cardápio da cafeteria' },
  { src: '/menu-alacarte-8.webp', label: 'Buffet', alt: 'Cardápio com valores do café da manhã, almoço e jantar em buffet' },
];

const barMenuPages = [
  { src: '/bar-piscina-praia-foto.webp', label: 'Bar da piscina', alt: 'Área do bar e mesas à beira da piscina do resort' },
  { src: '/bar-cardapio-1.webp', label: 'Bebidas', alt: 'Cardápio de bebidas do bar da piscina e praia' },
  { src: '/bar-cardapio-2.webp', label: 'Lanches e petiscos', alt: 'Cardápio de lanches, petiscos, sanduíches e combos do bar' },
];

const spaPages = [
  { src: '/salao-beleza-foto.webp', label: 'Salão de beleza', alt: 'Interior do salão de beleza do resort com vista para as piscinas' },
  { src: '/spa-cardapio-1.webp', label: 'Massagens e rituais', alt: 'Tabela de preços de massagens e rituais do spa' },
  { src: '/spa-cardapio-2.webp', label: 'Serviços do salão', alt: 'Tabela de preços dos serviços do salão de beleza' },
];

const resortMapPages = [
  { src: '/mapa-resort.webp', label: 'Mapa do resort', alt: 'Mapa aéreo do resort com blocos e áreas numeradas' },
  { src: '/mapa-resort-legenda.webp', label: 'Legenda e locais', alt: 'Legenda do mapa com a descrição dos locais numerados do resort' },
];

const apartmentSlides = [
  { src: '/apartment.webp?v=3', alt: 'Vista da varanda do apartamento para a piscina' },
  { src: '/apartamento-camas-solteiro.webp', alt: 'Quarto com duas camas de solteiro e saída para a piscina' },
  { src: '/apartamento-cama-casal.webp', alt: 'Quarto com cama de casal, televisão e saída para a piscina' },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function assetPath(src: string) {
  return src.startsWith('/') ? `${basePath}${src}` : src;
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.unobserve(node);
        }
      },
      { threshold: 0.14 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
}) {
  return (
    <div className="mb-5">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="max-w-[16ch] text-balance text-[clamp(2rem,10vw,3.3rem)] font-extrabold leading-[0.93] tracking-[-0.055em] text-white">
        {title}
      </h2>
      {description ? (
        <div className="mt-3 max-w-xl text-sm leading-6 text-slate-300">{description}</div>
      ) : null}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
  accent = false,
}: {
  icon: typeof KeyRound;
  title: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={`glass-card p-4 ${accent ? 'cyan-card' : ''}`}>
      <div className="flex items-start gap-3">
        <span className="icon-orb mt-0.5" aria-hidden="true">
          <Icon className="size-[18px]" strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <div className="mt-1.5 text-sm leading-5 text-slate-300">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ExpandableInfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof KeyRound;
  title: string;
  children: ReactNode;
}) {
  return (
    <Accordion className="glass-card overflow-hidden">
      <AccordionItem value="details" className="border-0">
        <AccordionTrigger className="px-4 py-4 text-white hover:no-underline">
          <span className="flex items-center gap-3 pr-3">
            <span className="icon-orb" aria-hidden="true">
              <Icon className="size-[18px]" strokeWidth={1.8} />
            </span>
            <span className="text-sm font-bold">{title}</span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4 pl-16 text-[12px] leading-5 text-slate-300">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function ActionLink({
  href,
  icon: Icon,
  label,
  note,
}: {
  href: string;
  icon: typeof KeyRound;
  label: string;
  note?: string;
}) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="action-link group"
    >
      <span className="icon-orb">
        <Icon className="size-[18px]" strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-white">{label}</span>
        {note ? <span className="mt-0.5 block text-xs text-slate-400">{note}</span> : null}
      </span>
      {external ? (
        <ExternalLink className="size-4 text-cyan-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : (
        <ChevronRight className="size-4 text-cyan-300 transition-transform group-hover:translate-x-1" />
      )}
    </a>
  );
}

function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`photo-frame ${className}`}>
      <img src={assetPath(src)} alt={alt} className="h-full w-full object-cover" />
      <span className="photo-sheen" aria-hidden="true" />
    </div>
  );
}

function ApartmentCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((slide) => (slide + 1) % apartmentSlides.length);
    }, 5200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="apartment-carousel photo-frame mb-3 aspect-[4/3]"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Fotos do apartamento"
    >
      {apartmentSlides.map((slide, index) => (
        <img
          key={slide.src}
          src={assetPath(slide.src)}
          alt={index === current ? slide.alt : ''}
          aria-hidden={index !== current}
          className={`apartment-slide ${index === current ? 'is-active' : ''}`}
        />
      ))}
      <span className="photo-sheen" aria-hidden="true" />
    </div>
  );
}

function ExpandablePhoto({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative mt-3 block w-full overflow-hidden rounded-xl border border-cyan-300/15 bg-slate-950/40 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        aria-label="Ampliar foto do café continental"
      >
        <img src={assetPath(src)} alt={alt} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-slate-950/75 px-2.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">
          <Maximize2 className="size-3.5" aria-hidden="true" />
          Ampliar foto
        </span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada do café continental"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-3 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            aria-label="Fechar foto ampliada"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <img
            src={assetPath(src)}
            alt={alt}
            className="max-h-[90dvh] max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}

function ImageGallery({
  pages,
  galleryName,
}: {
  pages: Array<{ src: string; label: string; alt: string }>;
  galleryName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const activePage = pages[activeIndex];

  const showPrevious = () => setActiveIndex((index) => (index - 1 + pages.length) % pages.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % pages.length);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-xl border border-cyan-300/15 bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        aria-label={`Ampliar página ${activeIndex + 1} de ${galleryName}: ${activePage.label}`}
      >
        <img src={assetPath(activePage.src)} alt={activePage.alt} className="aspect-[4/3] w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
        <span className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-slate-950/80 px-2.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">
          <Maximize2 className="size-3.5" aria-hidden="true" />
          Ampliar
        </span>
      </button>

      <div className="mt-2 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={showPrevious}
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/15 bg-white/5 text-cyan-300 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          aria-label="Página anterior do cardápio"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <p className="min-w-0 text-center text-[11px] leading-4 text-slate-400">
          <strong className="block text-white">{activePage.label}</strong>
          Página {activeIndex + 1} de {pages.length}
        </p>
        <button
          type="button"
          onClick={showNext}
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/15 bg-white/5 text-cyan-300 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          aria-label="Próxima página do cardápio"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${galleryName} ampliado: ${activePage.label}`}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/95 p-3 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            aria-label="Fechar cardápio ampliado"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <div className="flex max-h-[82dvh] w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <img src={assetPath(activePage.src)} alt={activePage.alt} className="max-h-[82dvh] max-w-full rounded-xl object-contain shadow-2xl" />
          </div>
          <div className="mt-3 flex items-center gap-4" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={showPrevious} className="flex size-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25" aria-label="Página anterior">
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <span className="min-w-24 text-center text-xs font-bold text-white">{activeIndex + 1} de {pages.length}</span>
            <button type="button" onClick={showNext} className="flex size-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25" aria-label="Próxima página">
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DetailAccordion({
  items,
}: {
  items: Array<{ value: string; icon: typeof KeyRound; title: string; content: ReactNode }>;
}) {
  return (
    <Accordion className="glass-card overflow-hidden px-4" defaultValue={[items[0].value]}>
      {items.map(({ value, icon: Icon, title, content }) => (
        <AccordionItem key={value} value={value} className="border-cyan-300/10 last:border-0">
          <AccordionTrigger className="py-4 text-white hover:no-underline">
            <span className="flex items-center gap-3 pr-3">
              <span className="icon-orb size-9">
                <Icon className="size-[17px]" strokeWidth={1.8} />
              </span>
              <span className="text-sm font-bold">{title}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pl-12 pr-1 text-sm leading-6 text-slate-300">
            {content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function PortoGuide() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#020d1d] text-white">
      <header className={`topbar ${scrolled ? 'topbar-scrolled' : ''}`}>
        <a href="#inicio" className="brand-mark" aria-label="Voltar ao início">
          PORTO <strong>2</strong> LIFE
        </a>
        <a href="#contatos" className="header-contact">
          <Phone className="size-3.5" /> Contatos
        </a>
      </header>

      <section id="inicio" className="hero-section scroll-mt-20">
        <img
          src={assetPath('/hero.webp')}
          alt="Vista aérea do Porto 2 Life, entre o mar e o resort"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="hero-overlay" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex min-h-[88svh] w-full max-w-3xl flex-col justify-end px-5 pb-10 pt-28 sm:px-8">
          <div className="hero-kicker">
            <Sparkles className="size-3.5" /> Guia de experiência
          </div>
          <h1 className="mt-4 text-[clamp(3.4rem,17vw,7.6rem)] font-black leading-[0.78] tracking-[-0.075em]">
            Porto <span className="text-cyan-400">2</span>
            <br />
            Life
          </h1>
          <p className="mt-6 max-w-md text-base leading-6 text-slate-200 sm:text-lg">
            Seja muito bem-vindo ao <strong className="text-white">apto 134, bloco 2</strong>.
            Seu guia rápido para aproveitar cada momento.
          </p>
          <a
            href={links.resortLocation}
            target="_blank"
            rel="noreferrer"
            className="group mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/25 bg-slate-950/45 px-3.5 py-2 text-sm text-slate-200 shadow-[0_8px_30px_rgba(0,0,0,.2)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-slate-950/65"
            aria-label="Abrir a localização do Porto 2 Life na Praia de Muro Alto"
          >
            <MapPin className="size-4 text-cyan-300" aria-hidden="true" />
            <span><strong className="font-extrabold text-white">Praia de Muro Alto</strong>, Pernambuco</span>
            <ExternalLink className="size-3.5 text-cyan-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <div className="mt-6 grid grid-cols-2 gap-2.5">
            <div className="time-card">
              <KeyRound className="size-5 text-cyan-300" />
              <span><strong>Check-in</strong><small>a partir das 15h</small></span>
            </div>
            <div className="time-card">
              <ArrowUpRight className="size-5 text-cyan-300" />
              <span><strong>Check-out</strong><small>até as 11h</small></span>
            </div>
          </div>
          <a href="#atalhos" className="mt-7 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.17em] text-cyan-200">
            Explorar o guia <ArrowDown className="size-4 animate-bounce" />
          </a>
        </div>
      </section>

      <nav id="atalhos" aria-label="Atalhos do guia" className="quick-nav scroll-mt-24">
        <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-3 sm:px-8">
          {navItems.map(({ href, label, icon: Icon }) => (
            <a key={href} href={href} className="nav-pill">
              <Icon className="size-4" /> {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto w-full max-w-3xl px-4 pb-24 sm:px-8">
        <section id="chegada" className="section-block scroll-mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Prepare-se"
              title="Antes da chegada"
              description="O essencial para um check-in tranquilo, sem surpresas na recepção."
            />
            <div className="grid gap-2.5 sm:grid-cols-2">
              <InfoCard icon={CalendarDays} title="Documentos">
                Leve documento oficial com foto de todas as pessoas que farão o check-in.
              </InfoCard>
              <ExpandableInfoCard icon={CircleAlert} title="Menores de 18 anos">
                <p>Devem apresentar documento oficial com foto que comprove identidade e filiação. Sem os pais ou responsável, também é necessária autorização de hospedagem por escrito, assinada pelos pais, com firmas reconhecidas por autenticidade em cartório.</p>
              </ExpandableInfoCard>
              <InfoCard icon={Baby} title="Viajando com um bebê?">
                <p>No check-in, solicite à recepção um berço para o apartamento.</p>
                <p className="mt-3 text-slate-400">Sujeito a disponibilidade.</p>
              </InfoCard>
              <InfoCard icon={PawPrint} title="Pet friendly 🐾">
                <p>Permitidos cães de até 10 kg. Consulte taxas e regras diretamente com o resort.</p>
              </InfoCard>
              <InfoCard icon={CarFront} title="Estacionamento">
                Uma vaga está incluída por apartamento. Consulte a recepção para veículos adicionais.
              </InfoCard>
              <ExpandableInfoCard icon={KeyRound} title="Pulseira e consumo">
                <p>A pulseira funciona como chave do apartamento e registra todos os seus consumos no resort. O pagamento é realizado ao final da hospedagem.</p>
                <p className="mt-3"><strong className="text-white">Nossa dica:</strong> na véspera do check-out, passe na recepção para conferir os lançamentos com calma. Assim, você evita dúvidas e agiliza sua saída.</p>
              </ExpandableInfoCard>
              <InfoCard icon={PlugZap} title="Informação elétrica" accent>
                Todo o resort utiliza <strong className="text-white">220 V</strong>.
              </InfoCard>
            </div>
          </Reveal>
        </section>

        <section id="apartamento" className="section-block scroll-mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Apto 134 • Bloco 2"
              title="Seu apartamento"
              description="Conforto com varanda e saída para a piscina."
            />
            <ApartmentCarousel />
            <DetailAccordion
              items={[
                {
                  value: 'seguranca',
                  icon: LockKeyhole,
                  title: 'Segurança na varanda',
                  content: <>A varanda tem uma portinha com chave. Com crianças, mantenha-a trancada e guarde a chave com você. A piscina tem escada, mas é funda.</>,
                },
                {
                  value: 'itens-basicos',
                  icon: Utensils,
                  title: 'Itens básicos do apartamento',
                  content: (
                    <>
                      <p>O apartamento conta com frigobar, pratos e talheres para sua comodidade.</p>
                      <p className="mt-3">Secador de cabelo e cofre não ficam disponíveis no quarto, mas podem ser solicitados por empréstimo na recepção, conforme a disponibilidade.</p>
                    </>
                  ),
                },
                {
                  value: 'cafe',
                  icon: Coffee,
                  title: 'Cafeteira 3 Corações',
                  content: (
                    <>
                      <p>O quarto tem cafeteira, mas o resort não fornece cápsulas. Você pode levar suas cápsulas de casa ou comprar nos mercados das redondezas.</p>
                      <p className="mt-3"><strong className="text-white">Observação:</strong> você também pode pedir uma térmica de café pelo serviço de quarto.</p>
                    </>
                  ),
                },
                {
                  value: 'limpeza',
                  icon: ShowerHead,
                  title: 'Camareira e limpeza',
                  content: <>Há serviço diário. Use a plaquinha da porta para solicitar a limpeza e deixe no chão as toalhas que deseja trocar.</>,
                },
                {
                  value: 'mercado-gav',
                  icon: Clock3,
                  title: 'Mercado 24h GAV',
                  content: <>O resort conta com um mercado 24 horas para compras rápidas durante a estadia. Lá você encontra bebidas, água, lanches e itens básicos de higiene.</>,
                },
                {
                  value: 'mercado',
                  icon: ShoppingBasket,
                  title: 'Onde fazer suas compras',
                  content: (
                    <div className="space-y-5">
                      <div>
                        <p><strong className="text-white">Empório Muro Alto:</strong> a opção mais próxima do resort, prática para compras rápidas e itens do dia a dia.</p>
                        <a
                          href={links.emporioMuroAlto}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-2 font-bold text-cyan-300 underline decoration-cyan-300/40 underline-offset-4 transition-colors hover:text-cyan-200"
                        >
                          <MapPin className="size-4" aria-hidden="true" />
                          Abrir no mapa
                          <ExternalLink className="size-3.5" aria-hidden="true" />
                        </a>
                      </div>
                      <div className="border-t border-cyan-300/10 pt-4">
                        <p><strong className="text-white">Atacarejo Arco-Vita — Nossa Senhora do Ó:</strong> fica um pouco mais longe, mas costuma ter preços mais baixos. Uma boa opção para compras maiores durante a estadia.</p>
                        <a
                          href={links.arcoVita}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-2 font-bold text-cyan-300 underline decoration-cyan-300/40 underline-offset-4 transition-colors hover:text-cyan-200"
                        >
                          <MapPin className="size-4" aria-hidden="true" />
                          Abrir no mapa
                          <ExternalLink className="size-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              <ExpandableInfoCard icon={Utensils} title="Serviço de quarto">
                <p>O atendimento funciona 24 horas, mas os pedidos de lanches e pratos têm horários específicos, com encerramento entre 22h e 23h, conforme a opção.</p>
                <p className="mt-3">
                  Consulte o cardápio digital{' '}
                  <a
                    href={links.roomService}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-cyan-300 transition-colors hover:text-cyan-200"
                  >
                    clicando aqui
                  </a>
                  . Antes de pedir, ligue para confirmar os horários e a disponibilidade dos itens.
                </p>
              </ExpandableInfoCard>
              <InfoCard icon={Waves} title="Toalhas de praia e piscina">
                <p>O resort disponibiliza uma toalha de praia por hóspede. Você receberá um cartão para trocar pela toalha no ponto de retirada, na área da piscina.</p>
              </InfoCard>
              <InfoCard icon={Phone} title="Recepção 6001">
                <p>Atendimento 24 horas.</p>
              </InfoCard>
            </div>
          </Reveal>
        </section>

        <section id="gastronomia" className="section-block scroll-mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Sabores do resort"
              title="Gastronomia"
              description={
                <>
                  <p>No check-in, você pode contratar café da manhã, meia pensão ou pensão completa, conforme sua preferência.</p>
                  <p className="mt-3">Se preferir mais flexibilidade, também pode optar por refeições avulsas no restaurante. Consulte os valores e o que está incluído em cada opção antes de contratar.</p>
                </>
              }
            />
            <Photo src="/dining.webp?v=2" alt="Pratos e bebidas servidos ao lado da piscina do resort" className="mb-3 aspect-[16/10]" />
            <div className="glass-card p-4">
              <div className="flex items-center gap-3">
                <span className="icon-orb"><Utensils className="size-[18px]" /></span>
                <div><h3 className="font-bold">Restaurante Livre</h3><p className="text-xs text-slate-400">Principal restaurante do resort</p></div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  ['Café', '7h–10h'],
                  ['Almoço', '12h–15h'],
                  ['Jantar', '19h–22h'],
                ].map(([meal, time]) => (
                  <div key={meal} className="mini-stat"><small>{meal}</small><strong>{time}</strong></div>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <ExpandableInfoCard icon={Utensils} title="Restaurante à la carte">
                <p>O restaurante oferece diversos pratos e opções com valores variados. Consulte o cardápio abaixo para ter uma ideia dos preços.</p>
                <p className="mt-2 text-slate-400">Valores e itens sujeitos a alterações.</p>
                <ImageGallery pages={menuPages} galleryName="cardápio à la carte" />
              </ExpandableInfoCard>
            </div>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              <ExpandableInfoCard icon={Coffee} title="Café continental no quarto">
                <p>Em torno de R$ 80 e serve até 3 pessoas. Valores sujeitos a alterações.</p>
                <p className="mt-3">Peça pelo ramal <strong className="text-white">6000</strong>.</p>
                <ExpandablePhoto src="/cafe-continental.webp" alt="Café continental servido no quarto com vista para a piscina" />
              </ExpandableInfoCard>
              <ExpandableInfoCard icon={Martini} title="Bar da piscina e praia">
                <p>Lanches e bebidas para aproveitar à beira da piscina ou do mar, com o mesmo cardápio nos dois espaços.</p>
                <ImageGallery pages={barMenuPages} galleryName="cardápio do bar da piscina e praia" />
              </ExpandableInfoCard>
            </div>
            <div className="mt-3 space-y-2.5">
              <ExpandableInfoCard icon={Utensils} title="Restaurante culinária japonesa">
                <p>Conheça o restaurante de culinária japonesa do resort e faça sua reserva.</p>
                <ExpandablePhoto src="/restaurante-japones.webp" alt="Pratos de culinária japonesa servidos no restaurante do resort" />
                <a
                  href={links.okae}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-extrabold text-slate-950 no-underline transition-colors hover:bg-cyan-200"
                >
                  <CalendarDays className="size-4" aria-hidden="true" />
                  Fazer reserva
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </ExpandableInfoCard>
              <ExpandableInfoCard icon={Bike} title="Delivery e tele-entrega">
                <p>Você também pode pedir refeições por delivery pelo iFood.</p>
                <p className="mt-3">Outra opção de marmitas e comida caseira, indicada por hóspedes, é a <strong className="text-white">Porto Raiz Marmitaria</strong>.</p>
                <p className="mt-3 border-l-2 border-cyan-300/50 pl-3"><strong className="text-white">Importante:</strong> alimentos comprados fora do resort devem ser consumidos dentro do apartamento.</p>
                <a
                  href={links.portoRaiz}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl border border-cyan-300/20 bg-white/5 px-4 py-2.5 font-bold text-cyan-300 no-underline transition-colors hover:bg-white/10 hover:text-cyan-200"
                >
                  <Camera className="size-4" aria-hidden="true" />
                  Porto Raiz Marmitaria no Instagram
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </ExpandableInfoCard>
              <ActionLink href={links.floricultura} icon={Sparkles} label="Surpreenda quem você ama" note="Floricultura e cesta de café da manhã • Instagram" />
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">Horários e valores podem mudar conforme a data da hospedagem. Confirme com o resort antes de pedir.</p>
          </Reveal>
        </section>

        <section id="lazer" className="section-block scroll-mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Sol, água e diversão"
              title="Lazer, piscina e praia"
              description="Organize o dia com os principais horários e reservas."
            />
            <Photo src="/lazer-piscina-praia-aerea.webp" alt="Vista aérea das piscinas do resort e da praia de Muro Alto" className="mb-3 aspect-[3/2]" />
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: Sun, label: 'Piscina', value: '9h–22h' },
                { icon: Sparkles, label: 'Sauna', value: '17h–21h' },
                { icon: Gamepad2, label: 'Salão de jogos', value: '8h–22h' },
                { icon: Palmtree, label: 'Brinquedoteca', value: '8h–22h' },
                { icon: Dumbbell, label: 'Academia', value: '24h' },
                { icon: PawPrint, label: 'Dog Care', value: 'Ramal 6069' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass-card p-3.5">
                  <Icon className="size-5 text-cyan-300" />
                  <span className="mt-3 block text-xs text-slate-400">{label}</span>
                  <strong className="text-sm text-white">{value}</strong>
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              <ExpandableInfoCard icon={Gamepad2} title="Boliche">
                <p>Uma das atrações mais disputadas do resort! Reserve seu horário com antecedência, diretamente no local.</p>
                <p className="mt-3">Cotistas têm condições especiais de uso. Hóspedes devem consultar os valores e a disponibilidade.</p>
              </ExpandableInfoCard>
              <InfoCard icon={Bike} title="Tênis e golfe">Retire raquetes de tênis e tacos de golfe no balcão em frente ao boliche.</InfoCard>
              <InfoCard icon={CalendarDays} title="Recreação">
                <p>Há atividades diárias para crianças, jovens e adultos.</p>
                <a
                  href={links.resortInstagram}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 font-bold text-cyan-300 underline decoration-cyan-300/40 underline-offset-4 transition-colors hover:text-cyan-200"
                >
                  <Camera className="size-4" aria-hidden="true" />
                  Ver programação no Instagram
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </InfoCard>
              <ExpandableInfoCard icon={Sailboat} title="Caiaque e stand-up paddle">
                <p>Os agendamentos começam às 9h, na praia. Cotistas têm direito à reserva; hóspedes devem consultar valores e condições de uso.</p>
                <p className="mt-3">As atividades dependem da maré e do vento. Na maré baixa, alguns trechos podem ficar rasos, mas a profundidade e as correntes variam. Consulte a equipe da praia sobre as condições e o acesso seguro antes de tentar chegar ao muro de corais caminhando ou nadando.</p>
                <p className="mt-3">Leve calçado aquático para proteger os pés nas áreas permitidas, sem pisar ou subir nos corais.</p>
              </ExpandableInfoCard>
              <ExpandableInfoCard icon={Scissors} title="Salão de beleza e spa">
                <p>Reserve um momento para cuidar de você!</p>
                <p className="mt-3">Agende pelo link abaixo ou pelo ramal <strong className="text-white">6067</strong>.</p>
                <a
                  href={links.spaWhatsApp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-extrabold text-slate-950 no-underline transition-colors hover:bg-cyan-200"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Agendar pelo WhatsApp
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
                <ImageGallery pages={spaPages} galleryName="tabela de preços do salão e spa" />
                <p className="mt-3 text-slate-400">Preços sujeitos a alterações.</p>
              </ExpandableInfoCard>
              <ExpandableInfoCard icon={MapPin} title="Mapa do resort">
                <p>Consulte o mapa e a legenda para localizar os blocos, piscinas, restaurantes e demais espaços do resort.</p>
                <p className="mt-2 text-slate-400">Toque na imagem para ampliar e visualizar melhor.</p>
                <ImageGallery pages={resortMapPages} galleryName="mapa do resort" />
              </ExpandableInfoCard>
            </div>
            <Photo src="/recreacao-programacao.webp" alt="Equipe de recreação realizando uma atividade ao lado da piscina do resort" className="my-3 aspect-[16/7]" />
            <ActionLink href={links.resortInstagram} icon={Camera} label="Programação do resort" note="@porto2liferesort" />
          </Reveal>
        </section>

        <section id="experiencias" className="section-block scroll-mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Além do resort"
              title="Experiências em Muro Alto"
              description="O centro de Porto de Galinhas fica a cerca de 20 minutos. Reserve um dia para passear, comer e conhecer as lojinhas."
            />
            <div className="glass-card overflow-hidden">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <span className="icon-orb"><MapPin className="size-[18px]" /></span>
                  <div><h3 className="font-bold">Passeios e transfer</h3><p className="text-xs text-slate-400">Saídas do aeroporto e experiências locais</p></div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-slate-300">
                  {['Transfer', 'Passeio de buggy', 'Praia dos Carneiros', 'Piscinas naturais', 'Jet ski', 'Paramotor', 'Quadriciclo'].map((item) => (
                    <span key={item} className="flex items-center gap-2"><Check className="size-3.5 text-cyan-300" />{item}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              <ActionLink href={links.transfers} icon={MessageCircle} label="Transfer e passeios" note="Atendimento via WhatsApp" />
              <ActionLink href={links.ndTour} icon={Camera} label="ND Tour" note="Passeios pelo Instagram" />
            </div>
          </Reveal>
        </section>

        <section id="contatos" className="section-block scroll-mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Para uma estadia tranquila"
              title="Regras e contatos"
              description="Informações importantes para todos aproveitarem o resort."
            />
            <Photo src="/regras-contatos-aerea.webp" alt="Vista aérea do Porto 2 Life, suas piscinas, apartamentos e o mar de Muro Alto" className="mb-3 aspect-[4/5]" />
            <DetailAccordion
              items={[
                {
                  value: 'silencio',
                  icon: Clock3,
                  title: 'Silêncio a partir das 22h',
                  content: <>Não é permitido som em volume elevado no apartamento. O descumprimento pode gerar multa.</>,
                },
                {
                  value: 'consumo',
                  icon: Utensils,
                  title: 'Alimentos nas áreas sociais',
                  content: <>Nas piscinas e áreas sociais, consuma apenas alimentos e bebidas comprados nos pontos de venda do resort. As refeições podem ser feitas no quarto.</>,
                },
                {
                  value: 'livre-de-fumo',
                  icon: CircleAlert,
                  title: 'Ambiente livre de fumo',
                  content: <>É proibido fumar nas dependências do resort, inclusive no apartamento. O descumprimento está sujeito a multa, conforme as regras do empreendimento.</>,
                },
                {
                  value: 'recepcao',
                  icon: Phone,
                  title: 'Recepção 24 horas',
                  content: <>Para dúvidas e imprevistos, use o telefone do quarto e disque <strong className="text-white">6001</strong>.</>,
                },
              ]}
            />
            <div className="mt-3 space-y-2.5">
              <ActionLink href={links.hostWhatsApp} icon={MessageCircle} label="WhatsApp do anfitrião" note="(51) 98207-3632" />
              <a
                href={links.hostInstagram}
                target="_blank"
                rel="noreferrer"
                className="instagram-cta group"
                style={{ '--instagram-image': `url("${assetPath('/instagram-resort.webp')}")` } as CSSProperties}
                aria-label="Siga nosso Instagram: abrir o perfil @2liferesortmuroalto"
              >
                <span className="instagram-cta-icon" aria-hidden="true">
                  <Camera className="size-6" strokeWidth={2} />
                </span>
                <span className="relative z-10 min-w-0 flex-1">
                  <span className="block text-sm font-bold leading-6 text-white">Siga nosso Instagram e descubra novidades, dicas e novas oportunidades para viver dias incríveis em Muro Alto! 🌴</span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-extrabold text-fuchsia-200">
                    @2liferesortmuroalto
                    <ExternalLink className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </a>
            </div>
          </Reveal>
        </section>

        <Reveal className="pb-4 pt-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,.18)]">
            <Palmtree className="size-6" />
          </div>
          <p className="text-xl font-extrabold tracking-tight">Aproveite suas férias.</p>
          <p className="mt-1 text-sm text-slate-400">Tudo o que você precisa, no seu bolso.</p>
          <a href="#inicio" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">
            Voltar ao início <ArrowDown className="size-4 rotate-180" />
          </a>
        </Reveal>
      </div>

      <div className="fixed inset-x-0 bottom-3 z-50 mx-auto flex w-[min(92%,430px)] items-center justify-around rounded-2xl border border-cyan-300/15 bg-[#041226]/90 p-1.5 shadow-[0_16px_60px_rgba(0,0,0,.5)] backdrop-blur-xl sm:hidden">
        {[
          { href: '#inicio', label: 'Início', icon: Palmtree },
          { href: '#gastronomia', label: 'Comer', icon: Utensils },
          { href: '#lazer', label: 'Lazer', icon: Waves },
          { href: links.hostWhatsApp, label: 'Contato', icon: MessageCircle },
        ].map(({ href, label, icon: Icon }) => (
          <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="bottom-nav-link">
            <Icon className="size-[18px]" /><span>{label}</span>
          </a>
        ))}
      </div>
    </main>
  );
}
