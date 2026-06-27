import { createContext, useContext, useState, type ReactNode } from 'react'

type Lang = 'en' | 'pt'

const translations = {
  en: {
    // Intro & Audio
    introLoading: 'Loading',
    introPressEnter: 'Ready to race',
    introEnter: 'Enter',
    musicNowPlaying: 'Now Playing',
    musicMute: 'Mute music',
    musicUnmute: 'Unmute music',
    musicVolume: 'Volume',
    navMenu: 'Menu',
    navClose: 'Close',

    // Navbar
    navHome: 'Home',
    navCrews: 'Crews',
    navModes: 'Game Modes',
    navPolice: 'Police',
    navCustom: 'Customization',
    navSteam: 'Steam Wishlist',

    // Hero
    heroBadge: 'Lead The Dragon — Coming to Steam PC',
    heroSub: 'Dominate the underground. Choose your crew, tune your ride, and conquer the most dangerous mountain roads in an open-world illegal racing experience.',
    heroTrailer: 'Watch the Trailer',
    heroDiscord: 'Join the Discord',
    heroStatPlatform: 'PC / Steam',
    heroStatPlatformLabel: 'Solo Indie Developer: 3 Lapz',
    heroStatCrews: '3 Crews',
    heroStatCrewsLabel: 'Unique driving dynamics & tuning',
    heroTag: 'Racing · Open World · Action-Adventure',
    heroAttr1: 'Solo dev: 3 Lapz',
    heroAttr2: 'Map inspired by Tail of the Dragon',
    heroAttr3: 'PT-BR UI Support',

    // Crews
    crewsKicker: '// THE SYNDICATES',
    crewsTitle1: 'CHOOSE YOUR',
    crewsTitle2: 'DRIVING CREW',
    crewsScroll: 'Scroll for Challenges',
    crewAmericanTitle: 'American Crew',
    crewAmericanBody: 'Master the raw power of rear-wheel drive on brutal mountain sprints. Equipped with anti-police gear and high impact resistance.',
    crewEuropeanTitle: 'European Crew',
    crewEuropeanBody: 'Ultra-lightweight engineering with precise AWD traction and active pace notes. Dominate corners, but beware of high fragility.',
    crewJapaneseTitle: 'Japanese Crew',
    crewJapaneseBody: 'Unleash limitless customization and drift-tuned dynamics. The ultimate balance of handling and raw style on tight hairpins.',
    crewAmericanTags: 'Anti-Police,Impact Res.,RWD,Muscle',
    crewEuropeanTags: 'AWD,Pace Notes,Light,Fragile',
    crewJapaneseTags: 'Drift,Tuning,Balanced,Livery',

    // Game Modes
    modesKicker: '// TEST YOUR SKILLS',
    modesTitle1: 'GAMEPLAY',
    modesTitle2: 'CHALLENGES',
    modesDesc: 'Lead The Dragon offers diverse open-world racing challenges. Each mode tests your vehicle setup, crew choice, and raw reaction speed.',
    modesOpenWorld: 'Open World Event System',
    modesOpenWorldDesc: 'Cruise the map freely to challenge rival AI or start races at road junctions.',
    modeTouge: 'Touge 1v1',
    modeTougeDesc: 'Battle head-to-head on narrow mountain roads, uphill and downhill.',
    modeDrift: 'Drift Challenge',
    modeDriftDesc: 'Score massive points for drift angle, speed, and clean lines.',
    modeP2P: 'Point to Point',
    modeP2PDesc: 'Sprint through stages with unforgiving checkpoints.',
    modeDistance: 'Distance Races',
    modeDistanceDesc: 'Test your endurance and vehicle stability at high speed.',
    modeTime: 'Time Trial',
    modeTimeDesc: 'Shave off milliseconds in solo precision runs.',
    modeFree: 'Free Roam',
    modeFreeDesc: 'Explore the open world and challenge rivals dynamically.',

    // Police
    policeKicker: 'ALERT: MAXIMUM THREAT INBOUND',
    policeTitle1: 'TACTICAL',
    policeTitle2: 'POLICE SYSTEM',
    policeDesc: "The police won't just follow—they deploy to trap you. Use heavy modifications or agile maneuvers to escape.",
    policeActive: 'Active Threat',
    threatRoadblocks: 'Tactical Roadblocks',
    threatRoadblocksDesc: 'Local units block key exits and hairpins. Smash through or find an escape path.',
    threatPit: 'Pit Maneuvers',
    threatPitDesc: 'Aggressive interceptors match your speed to clip your rear and spin you out.',
    threatSpike: 'Spike Strips',
    threatSpikeDesc: 'Deployed at blind corners. Avoid or risk blowing your tires immediately.',
    threatRam: 'Colliding Pursuits',
    threatRamDesc: 'Heavy ram units crash into you directly, testing your crew vehicle resilience.',
    threatHeli: 'Helicopter Tracking',
    threatHeliDesc: 'Air units follow from above, illuminating dark roads and directing ground forces.',

    // Customization
    customKicker: '// WORKSHOP & TUNING',
    customTitle1: 'CUSTOMIZATION &',
    customTitle2: 'DETAILED TUNING',
    customLiveryTitle: 'Livery & Decal Editor',
    customLiveryDesc: 'Build fully custom liveries, place vinyl layers, size decals, and share your designs with the community.',
    customLightsTitle: 'Real-World Taillights',
    customLightsDesc: 'Select taillights modeled after real aftermarket parts to personalize your car\'s night presence.',
    customTuningTitle: 'Crew Tuning System',
    customTuningDesc: 'Modify alignment, gear ratios, suspension dampening, and engine mapping tailored to your crew\'s philosophy.',
    customLiveryTags: 'Vector Layers,Gloss & Matte,Custom Paint',
    customLightsTags: 'LED Glow,Aftermarket,Night Style',
    customTuningTags: 'Dyno Graph,Handling,Gear Ratios',

    // Footer
    footerCopyright: '© 2026 Lead The Dragon. Created by',
    footerSteam: 'Steam Store',
    footerDiscord: 'Discord Community',
    footerTwitter: 'X / Twitter',
    footerLegal: 'Lead The Dragon is a game developed by 3 Lapz. All rights reserved.',
    footerInspiration: 'Map inspired by Tail of the Dragon, North Carolina.',
  },

  pt: {
    // Intro & Audio
    introLoading: 'Carregando',
    introPressEnter: 'Pronto para correr',
    introEnter: 'Entrar',
    musicNowPlaying: 'Tocando agora',
    musicMute: 'Silenciar música',
    musicUnmute: 'Ativar música',
    musicVolume: 'Volume',
    navMenu: 'Menu',
    navClose: 'Fechar',

    // Navbar
    navHome: 'Início',
    navCrews: 'Equipes',
    navModes: 'Modos de Jogo',
    navPolice: 'Polícia',
    navCustom: 'Customização',
    navSteam: 'Lista de desejos Steam',

    // Hero
    heroBadge: 'Lead The Dragon — Em breve na Steam PC',
    heroSub: 'Domine o underground. Escolha sua equipe, prepare seu carro, e conquiste as estradas mais perigosas em uma experiência de corrida ilegal em mundo aberto.',
    heroTrailer: 'Assista ao trailer',
    heroDiscord: 'Entre no Discord',
    heroStatPlatform: 'PC / Steam',
    heroStatPlatformLabel: 'Desenvolvedor Solo: 3 Lapz',
    heroStatCrews: '3 Equipes',
    heroStatCrewsLabel: 'Dinâmicas e tuning únicos',
    heroTag: 'Corrida · Mundo Aberto · Ação-Aventura',
    heroAttr1: 'Dev solo: 3 Lapz',
    heroAttr2: 'Mapa inspirado no Tail of the Dragon',
    heroAttr3: 'Suporte PT-BR',

    // Crews
    crewsKicker: '// OS SINDICATOS',
    crewsTitle1: 'ESCOLHA SUA',
    crewsTitle2: 'EQUIPE',
    crewsScroll: 'Role para os Desafios',
    crewAmericanTitle: 'Equipe Americana',
    crewAmericanBody: 'Domine a força bruta da tração traseira em sprints brutais na montanha. Equipada com anti-polícia e alta resistência a impacto.',
    crewEuropeanTitle: 'Equipe Europeia',
    crewEuropeanBody: 'Engenharia ultraleve com tração AWD precisa e sistema de pace notes. Domine curvas, mas cuidado com a fragilidade.',
    crewJapaneseTitle: 'Equipe Japonesa',
    crewJapaneseBody: 'Liberte a customização ilimitada e dinâmicas de drift. O equilíbrio definitivo entre controle e estilo bruto.',
    crewAmericanTags: 'Anti-Polícia,Res. Impacto,RWD,Muscle',
    crewEuropeanTags: 'AWD,Pace Notes,Leve,Frágil',
    crewJapaneseTags: 'Drift,Tuning,Balanceado,Livery',

    // Game Modes
    modesKicker: '// TESTE SUAS HABILIDADES',
    modesTitle1: 'DESAFIOS',
    modesTitle2: 'DE GAMEPLAY',
    modesDesc: 'Lead The Dragon oferece desafios diversos de corrida em mundo aberto. Cada modo testa seu setup, escolha de equipe e velocidade de reação.',
    modesOpenWorld: 'Sistema de Eventos Mundo Aberto',
    modesOpenWorldDesc: 'Cruze o mapa livremente para desafiar rivais ou iniciar corridas em cruzamentos.',
    modeTouge: 'Touge 1v1',
    modeTougeDesc: 'Batalhe cara a cara em estradas de montanha estreitas, subida e descida.',
    modeDrift: 'Desafio de Drift',
    modeDriftDesc: 'Pontue com ângulo de drift, velocidade e linhas limpas.',
    modeP2P: 'Ponto a Ponto',
    modeP2PDesc: 'Sprinte por fases com checkpoints implacáveis.',
    modeDistance: 'Corridas de Distância',
    modeDistanceDesc: 'Teste resistência e estabilidade do veículo em alta velocidade.',
    modeTime: 'Contra-Relógio',
    modeTimeDesc: 'Milésimos importam em corridas solo de precisão.',
    modeFree: 'Mundo Livre',
    modeFreeDesc: 'Explore o mundo aberto e desafie rivais dinamicamente.',

    // Police
    policeKicker: 'ALERTA: AMEAÇA MÁXIMA IMINENTE',
    policeTitle1: 'SISTEMA',
    policeTitle2: 'POLICIAL TÁTICO',
    policeDesc: 'A polícia não vai só seguir — eles armam emboscadas para te parar. Use modificações pesadas ou manobras ágeis para escapar.',
    policeActive: 'Ameaça Ativa',
    threatRoadblocks: 'Bloqueios Táticos',
    threatRoadblocksDesc: 'Unidades locais bloqueiam saídas e curvas fechadas. Passe por cima ou ache uma rota de fuga.',
    threatPit: 'Manobras PIT',
    threatPitDesc: 'Interceptadores agressivos igualam sua velocidade para girar seu carro.',
    threatSpike: 'Spike Strips',
    threatSpikeDesc: 'Implantados em curvas cegas. Evite ou arrisque estourar seus pneus na hora.',
    threatRam: 'Perseguições por Colisão',
    threatRamDesc: 'Unidades de impacto pesado batem direto em você, testando a resistência do seu carro.',
    threatHeli: 'Rastreamento Aéreo',
    threatHeliDesc: 'Unidades aéreas seguem de cima, iluminando estradas escuras e coordenando forças terrestres.',

    // Customization
    customKicker: '// OFICINA & TUNING',
    customTitle1: 'CUSTOMIZAÇÃO &',
    customTitle2: 'TUNING DETALHADO',
    customLiveryTitle: 'Editor de Livery & Decalques',
    customLiveryDesc: 'Crie liveries totalmente personalizadas, posicione adesivos, e compartilhe seus designs com a comunidade.',
    customLightsTitle: 'Lanternas Reais',
    customLightsDesc: 'Selecione lanternas modeladas com base em peças reais do mercado aftermarket.',
    customTuningTitle: 'Tuning por Equipe',
    customTuningDesc: 'Modifique alinhamento, relação de marchas, amortecimento e mapeamento do motor com a filosofia da sua equipe.',
    customWorkshop: 'Abrir Oficina',
    customLiveryTags: 'Camadas Vetoriais,Gloss & Matte,Pintura Custom',
    customLightsTags: 'LED Glow,Aftermarket,Estilo Noturno',
    customTuningTags: 'Gráfico Dyno,Handling,Relação de Marchas',

    // Footer
    footerCopyright: '© 2026 Lead The Dragon. Criado por',
    footerSteam: 'Loja Steam',
    footerDiscord: 'Comunidade Discord',
    footerTwitter: 'X / Twitter',
    footerLegal: 'Lead The Dragon é um jogo desenvolvido por 3 Lapz. Todos os direitos reservados.',
    footerInspiration: 'Mapa inspirado no Tail of the Dragon, Carolina do Norte.',
  },
} as const

type Translations = { [K in keyof typeof translations['en']]: string }

interface I18nContextType {
  lang: Lang
  t: Translations
  toggle: () => void
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  t: translations.en,
  toggle: () => { },
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggle = () => setLang((l) => (l === 'en' ? 'pt' : 'en'))
  return (
    <I18nContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
