import { useState } from 'react'
import { I18nProvider } from './i18n'
import { AudioProvider } from './audio/AudioProvider'
import { IntroScreen } from './components/IntroScreen'
import { MusicToast } from './components/MusicToast'
import { Grain } from './components/Grain'
import { SectionDivider } from './components/SectionDivider'
import { Hero } from './sections/Hero'
import { Crews } from './sections/Crews'
import { GameModes } from './sections/GameModes'
import { PoliceSystem } from './sections/PoliceSystem'
import { Customization } from './sections/Customization'
import { Footer } from './components/Footer'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <I18nProvider>
      <AudioProvider>
        {!introDone && <IntroScreen onComplete={() => setIntroDone(true)} />}

        {introDone && (
          <main className="bg-bg-main overflow-x-hidden animate-[fadeIn_0.8s_ease-out]">
            <Grain />
            <Hero />
            <SectionDivider />
            <Crews />
            <SectionDivider />
            <GameModes />
            <SectionDivider />
            <PoliceSystem />
            <SectionDivider />
            <Customization />
            <Footer />
          </main>
        )}

        <MusicToast />
      </AudioProvider>
    </I18nProvider>
  )
}
