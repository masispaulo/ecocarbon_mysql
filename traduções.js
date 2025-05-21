<script>
  function setLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      } else if (translations['pt'][key]) {
        // Idioma padrão volta para o português
        el.textContent = translations['pt'][key];
      }
    });
  }

  const translations = {
    pt: {
      welcome: "Bem-vindo à cooperativa EcoCarbon",
      intro: "Líder em sustentabilidade e inovação no agronegócio. Nosso compromisso é claro: promover práticas agrícolas sustentáveis, preservar áreas naturais e mitigar os impactos das mudanças climáticas. Junte-se a nós em nossa jornada rumo a um futuro mais verde e próspero.",
      about: "Sobre nós",
      aboutText1: "A cooperativa EcoCarbon nasceu da visão e liderança de seu idealizador, um pioneiro comprometido com a preservação ambiental e a conscientização sobre os efeitos do desmatamento. Nosso propósito é tornar acessível a participação dos produtores em práticas sustentáveis.",
      aboutText2: "Atuamos como elo entre os produtores e o mercado, promovendo a valorização da conservação ambiental com uma abordagem que combina tecnologia e redes profissionais. Estamos expandindo pelo país, alinhando-nos aos Objetivos de Desenvolvimento Sustentável da ONU.",
      aboutText3: "Acreditamos no poder da cooperação e engajamento comunitário. Através de consultorias, projetos e eventos, colaboramos com organizações que promovem sustentabilidade e combate às mudanças climáticas.",
      aboutText4: "Apesar dos desafios, mantemos viva a esperança em um futuro melhor. Com determinação, seguimos trilhando um caminho de inovação e impacto positivo.",
      missionTitle: "Nossa Missão",
      missionText: "Nosso propósito é liderar a mudança em direção a uma matriz energética sustentável, oferecendo soluções inovadoras em energia renovável e neutralização de carbono. Buscamos progresso socioeconômico, preservando o meio ambiente para as futuras gerações.",
      valuesTitle: "Valores",
      value1Title: "Sustentabilidade",
      value1Text: "Compromisso com a preservação dos recursos naturais, mitigação de mudanças climáticas e uso de tecnologias com menor impacto ambiental.",
      value2Title: "Inovação",
      value2Text: "Estímulo à criatividade e busca contínua por soluções tecnológicas que aumentem a eficiência no setor de energias renováveis.",
      value3Title: "Responsabilidade Social",
      value3Text: "Desenvolvimento das comunidades, inclusão social, geração de empregos e acesso à energia limpa e sustentável.",
      value4Title: "Integridade",
      value4Text: "Agir com ética e transparência em todas as relações, cultivando confiança com colaboradores, parceiros e clientes."
    },
    en: {
      // Traduções em inglês (já fornecidas anteriormente)
    },
    jp: {
      // Traduções em japonês (já fornecidas anteriormente)
    }
  };

  setLanguage('pt'); // Define o idioma inicial como português
</script>