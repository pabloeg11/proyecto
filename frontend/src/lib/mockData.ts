// =============================================================================
// Mock Data - Simula las respuestas de Strapi CMS
// Estructura: { data: [{ id, attributes: { ... } }] }
// Para conectar con Strapi real, solo hay que cambiar la fuente en api.ts
// =============================================================================

export interface StrapiResponse<T> {
  data: StrapiEntity<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

export interface ReviewAttributes {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  rating: number;
  category: 'peliculas' | 'series' | 'videojuegos';
  categoryLabel: string;
  image: string;
  author: string;
  publishedAt: string;
  featured: boolean;
  director?: string;
  platform?: string;
  genre: string;
  year: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  comments: CommentData[];
}

export interface BlogAttributes {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

export interface CategoryAttributes {
  name: string;
  slug: string;
  description: string;
  image: string;
  count: number;
}

export interface CommentData {
  id: number;
  author: string;
  content: string;
  date: string;
  rating: number;
}

// --- REVIEWS DATA ---
export const reviewsData: StrapiEntity<ReviewAttributes>[] = [
  {
    id: 1,
    attributes: {
      title: 'Dune: Parte Dos',
      slug: 'dune-parte-dos',
      excerpt: 'Denis Villeneuve completa su visión épica del universo de Frank Herbert con una secuela que supera a la original en todos los aspectos.',
      content: `<p>Denis Villeneuve ha logrado lo que muchos consideraban imposible: adaptar la segunda mitad de la novela de Frank Herbert de manera que no solo honra el material original, sino que lo eleva a nuevas alturas cinematográficas.</p>
      <h2>Una epopeya visual sin precedentes</h2>
      <p>Desde los primeros fotogramas, <strong>Dune: Parte Dos</strong> establece un tono diferente al de su predecesora. La fotografía de Greig Fraser alcanza cotas sublimes, capturando los vastos paisajes de Arrakis con una belleza que roza lo pictórico. Cada plano está compuesto con una precisión casi obsesiva, creando imágenes que se graban en la retina del espectador.</p>
      <h2>Actuaciones memorables</h2>
      <p>Timothée Chalamet entrega una actuación transformadora como Paul Atreides. Su evolución de joven inseguro a líder mesiánico es convincente y matizada, evitando caer en los clichés del héroe convencional. Zendaya, por su parte, dota a Chani de una complejidad emocional que ancla la historia en lo humano.</p>
      <h2>Veredicto</h2>
      <p>Dune: Parte Dos no es simplemente una gran película de ciencia ficción; es una declaración de intenciones sobre lo que el cine épico puede y debe ser en el siglo XXI. Villeneuve ha creado una obra maestra que resistirá el paso del tiempo.</p>`,
      rating: 9.2,
      category: 'peliculas',
      categoryLabel: 'Películas',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=450&fit=crop',
      author: 'Carlos Mendoza',
      publishedAt: '2025-11-15',
      featured: true,
      director: 'Denis Villeneuve',
      genre: 'Ciencia Ficción',
      year: 2024,
      seo: {
        metaTitle: 'Reseña Dune: Parte Dos - Una epopeya visual sin precedentes',
        metaDescription: 'Análisis completo de Dune: Parte Dos de Denis Villeneuve. Una obra maestra del cine de ciencia ficción que supera a su predecesora.',
      },
      comments: [
        { id: 1, author: 'Ana García', content: 'Totalmente de acuerdo, una obra maestra visual. La escena de los gusanos de arena es espectacular.', date: '2025-11-16', rating: 9 },
        { id: 2, author: 'Pedro López', content: 'Buena película pero creo que el ritmo baja un poco en el segundo acto. Aun así, imprescindible.', date: '2025-11-17', rating: 8 },
      ],
    },
  },
  {
    id: 2,
    attributes: {
      title: 'The Last of Us: Temporada 2',
      slug: 'the-last-of-us-temporada-2',
      excerpt: 'HBO adapta la segunda entrega del videojuego con una fidelidad y una intensidad emocional que redefinen el drama televisivo.',
      content: `<p>La segunda temporada de The Last of Us llega con el peso de adaptar uno de los videojuegos más controvertidos y emocionalmente devastadores de la historia. Y lo consigue con creces.</p>
      <h2>Fidelidad con inteligencia</h2>
      <p>Craig Mazin y Neil Druckmann han encontrado el equilibrio perfecto entre respetar el material original y aprovechar las posibilidades narrativas del medio televisivo. Las expansiones de personajes secundarios enriquecen la trama sin diluirla.</p>
      <h2>Actuaciones de otro nivel</h2>
      <p>Bella Ramsey entrega una actuación que debería ser recordada durante años. Su Ellie es rabia, dolor y vulnerabilidad a partes iguales. Pedro Pascal, aunque con menos tiempo en pantalla, hace que cada momento cuente.</p>
      <h2>Veredicto</h2>
      <p>Una temporada que no tiene miedo de incomodar al espectador, de plantear preguntas difíciles y de mostrar las consecuencias de la violencia sin glamour ni justificación.</p>`,
      rating: 9.5,
      category: 'series',
      categoryLabel: 'Series',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=450&fit=crop',
      author: 'Laura Fernández',
      publishedAt: '2025-10-20',
      featured: true,
      genre: 'Drama',
      year: 2025,
      seo: {
        metaTitle: 'Reseña The Last of Us Temporada 2 - Drama televisivo en su máxima expresión',
        metaDescription: 'Análisis de la segunda temporada de The Last of Us en HBO. Actuaciones memorables y una narrativa que no deja indiferente.',
      },
      comments: [
        { id: 3, author: 'Miguel Santos', content: 'Bella Ramsey se merece todos los premios. Una actuación brutal.', date: '2025-10-21', rating: 10 },
      ],
    },
  },
  {
    id: 3,
    attributes: {
      title: 'Elden Ring: Shadow of the Erdtree',
      slug: 'elden-ring-shadow-of-the-erdtree',
      excerpt: 'FromSoftware entrega la expansión definitiva de Elden Ring, ampliando el Lands Between con contenido que rivaliza con juegos completos.',
      content: `<p>Cuando FromSoftware anunció Shadow of the Erdtree, las expectativas eran estratosféricas. Y de alguna manera, Hidetaka Miyazaki y su equipo han logrado superarlas.</p>
      <h2>Un mundo dentro del mundo</h2>
      <p>La Realm of Shadow es un logro de diseño de niveles que desafía toda lógica. Cada zona está interconectada de maneras que solo se revelan tras horas de exploración, manteniendo esa sensación de descubrimiento constante que definió al juego base.</p>
      <h2>Combate refinado</h2>
      <p>Las nuevas armas y habilidades amplían significativamente el repertorio del jugador. Los nuevos jefes son de los mejores que FromSoftware ha diseñado jamás, exigiendo dominio de las mecánicas y paciencia a partes iguales.</p>
      <h2>Veredicto</h2>
      <p>Shadow of the Erdtree no es solo la mejor expansión de FromSoftware; es uno de los mejores contenidos descargables en la historia de los videojuegos. Imprescindible.</p>`,
      rating: 9.7,
      category: 'videojuegos',
      categoryLabel: 'Videojuegos',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop',
      author: 'David Ruiz',
      publishedAt: '2025-09-10',
      featured: true,
      platform: 'PS5, Xbox Series X, PC',
      genre: 'RPG de Acción',
      year: 2024,
      seo: {
        metaTitle: 'Reseña Elden Ring: Shadow of the Erdtree - La expansión definitiva',
        metaDescription: 'Análisis de Shadow of the Erdtree, la expansión de Elden Ring. FromSoftware supera todas las expectativas con contenido magistral.',
      },
      comments: [
        { id: 4, author: 'Sofía Martín', content: 'El jefe final es increíble. Me tomó 30 intentos pero valió cada segundo.', date: '2025-09-11', rating: 10 },
        { id: 5, author: 'Javier Díaz', content: 'La dificultad puede ser excesiva para algunos, pero la exploración compensa.', date: '2025-09-12', rating: 8 },
      ],
    },
  },
  {
    id: 4,
    attributes: {
      title: 'Oppenheimer',
      slug: 'oppenheimer',
      excerpt: 'Christopher Nolan entrega su obra más ambiciosa y personal, una exploración fascinante del hombre que cambió el mundo para siempre.',
      content: `<p>Christopher Nolan se adentra en territorio nuevo con Oppenheimer, un biopic que es al mismo tiempo un thriller político, un drama psicológico y una reflexión filosófica sobre la responsabilidad científica.</p>
      <h2>Cillian Murphy, por fin protagonista</h2>
      <p>Tras años de colaboración con Nolan en papeles secundarios, Cillian Murphy demuestra que siempre fue una estrella en espera. Su interpretación de J. Robert Oppenheimer es hipnótica: un hombre brillante consumido por el peso de su propia creación.</p>
      <h2>Narrativa no lineal magistral</h2>
      <p>Nolan estructura la película en tres líneas temporales que se entrelazan con la precisión de un reloj suizo. El montaje de Jennifer Lame es soberbio, creando tensión incluso en las escenas de diálogo más íntimas.</p>
      <h2>Veredicto</h2>
      <p>Oppenheimer es cine adulto en su máxima expresión. Exigente, estimulante y profundamente humana. Una de las mejores películas de la década.</p>`,
      rating: 9.0,
      category: 'peliculas',
      categoryLabel: 'Películas',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop',
      author: 'Carlos Mendoza',
      publishedAt: '2025-08-05',
      featured: false,
      director: 'Christopher Nolan',
      genre: 'Drama Histórico',
      year: 2023,
      seo: {
        metaTitle: 'Reseña Oppenheimer - La obra maestra de Christopher Nolan',
        metaDescription: 'Análisis de Oppenheimer de Christopher Nolan. Cillian Murphy brilla en esta reflexión sobre ciencia, poder y responsabilidad.',
      },
      comments: [
        { id: 6, author: 'Elena Vega', content: 'Las 3 horas se pasan volando. Cillian Murphy está extraordinario.', date: '2025-08-06', rating: 9 },
      ],
    },
  },
  {
    id: 5,
    attributes: {
      title: 'Severance: Temporada 2',
      slug: 'severance-temporada-2',
      excerpt: 'Apple TV+ continúa uno de los thrillers más originales de la televisión con una segunda temporada que profundiza en sus misterios.',
      content: `<p>Tras una espera de más de dos años, Severance regresa con una segunda temporada que justifica cada minuto de anticipación. Ben Stiller y Dan Erickson han creado algo verdaderamente especial.</p>
      <h2>Expansión del universo</h2>
      <p>La segunda temporada amplía el mundo de Lumon Industries de maneras inesperadas, revelando nuevas capas del misterio sin perder el enfoque íntimo en sus personajes. Cada episodio añade piezas al rompecabezas con una precisión narrativa admirable.</p>
      <h2>Adam Scott al timón</h2>
      <p>Adam Scott continúa ofreciendo una de las mejores interpretaciones en televisión actual. La dualidad entre el Mark innie y el outie alcanza nuevas cotas de complejidad emocional.</p>
      <h2>Veredicto</h2>
      <p>Severance confirma su estatus como una de las series más originales e inteligentes de la era del streaming. Televisión que desafía y recompensa al espectador.</p>`,
      rating: 9.3,
      category: 'series',
      categoryLabel: 'Series',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop',
      author: 'Laura Fernández',
      publishedAt: '2025-07-18',
      featured: false,
      genre: 'Thriller Psicológico',
      year: 2025,
      seo: {
        metaTitle: 'Reseña Severance Temporada 2 - El thriller más original de la TV',
        metaDescription: 'Análisis de la segunda temporada de Severance en Apple TV+. Un thriller que desafía las convenciones televisivas.',
      },
      comments: [
        { id: 7, author: 'Roberto Jiménez', content: 'El cliffhanger del episodio 7 es de los mejores que he visto. Serie imprescindible.', date: '2025-07-19', rating: 10 },
        { id: 8, author: 'Carmen Alonso', content: 'Excelente en todos los niveles. La dirección artística es sublime.', date: '2025-07-20', rating: 9 },
      ],
    },
  },
  {
    id: 6,
    attributes: {
      title: 'Baldur\'s Gate 3',
      slug: 'baldurs-gate-3',
      excerpt: 'Larian Studios redefine el RPG moderno con una aventura que ofrece una libertad de elección sin precedentes en la historia del género.',
      content: `<p>Baldur\'s Gate 3 no es simplemente un gran RPG. Es una declaración de principios sobre lo que es posible cuando un estudio apasionado tiene el tiempo y los recursos para realizar su visión sin compromisos.</p>
      <h2>Libertad absoluta</h2>
      <p>Cada situación en Baldur\'s Gate 3 puede abordarse de múltiples maneras. El motor de juego permite soluciones creativas que van más allá de lo que los desarrolladores jamás anticiparon, creando momentos únicos en cada partida.</p>
      <h2>Narrativa ramificada</h2>
      <p>Las decisiones del jugador tienen consecuencias reales y significativas. Los personajes reaccionan de manera coherente a tus acciones, y el mundo se transforma según tus elecciones. Es un logro técnico y narrativo sin precedentes.</p>
      <h2>Veredicto</h2>
      <p>Baldur\'s Gate 3 es, sencillamente, uno de los mejores RPG jamás creados. Un juego que recordaremos como un antes y un después en el género.</p>`,
      rating: 9.8,
      category: 'videojuegos',
      categoryLabel: 'Videojuegos',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=800&h=450&fit=crop',
      author: 'David Ruiz',
      publishedAt: '2025-06-25',
      featured: true,
      platform: 'PC, PS5, Xbox Series X',
      genre: 'RPG',
      year: 2023,
      seo: {
        metaTitle: 'Reseña Baldur\'s Gate 3 - El RPG definitivo',
        metaDescription: 'Análisis de Baldur\'s Gate 3 de Larian Studios. Una obra maestra del género RPG con libertad de elección sin precedentes.',
      },
      comments: [
        { id: 9, author: 'Pablo Herrero', content: 'Más de 200 horas y aún descubro cosas nuevas. Obra maestra absoluta.', date: '2025-06-26', rating: 10 },
        { id: 10, author: 'Lucía Torres', content: 'El Acto 3 podría estar más pulido, pero el conjunto es extraordinario.', date: '2025-06-27', rating: 9 },
      ],
    },
  },
  {
    id: 7,
    attributes: {
      title: 'Pobres Criaturas',
      slug: 'pobres-criaturas',
      excerpt: 'Yorgos Lanthimos y Emma Stone crean una fábula feminista tan visualmente deslumbrante como intelectualmente provocadora.',
      content: `<p>Pobres Criaturas es el tipo de película que solo podría existir en la mente de Yorgos Lanthimos. Una adaptación libre de la novela de Alasdair Gray que funciona como sátira social, comedia negra y cuento de hadas contemporáneo.</p>
      <h2>Emma Stone en estado de gracia</h2>
      <p>La interpretación de Emma Stone como Bella Baxter es un tour de force actoral. Stone transmite la evolución de su personaje con una fisicalidad y una libertad que rozan lo sublime, creando uno de los personajes femeninos más memorables del cine reciente.</p>
      <h2>Dirección artística de ensueño</h2>
      <p>Los decorados de Shona Heath y James Price son un personaje más de la película. Cada escenario es un lienzo surrealista que complementa la narrativa y la estética steampunk-victoriana de la cinta.</p>
      <h2>Veredicto</h2>
      <p>Una película arriesgada, original y profundamente entretenida. Lanthimos consolida su posición como uno de los directores más importantes del cine contemporáneo.</p>`,
      rating: 8.8,
      category: 'peliculas',
      categoryLabel: 'Películas',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop',
      author: 'María Jiménez',
      publishedAt: '2025-05-12',
      featured: false,
      director: 'Yorgos Lanthimos',
      genre: 'Drama Fantástico',
      year: 2023,
      seo: {
        metaTitle: 'Reseña Pobres Criaturas - La fábula feminista de Lanthimos',
        metaDescription: 'Análisis de Pobres Criaturas de Yorgos Lanthimos. Emma Stone brilla en esta provocadora y visualmente espectacular fábula.',
      },
      comments: [
        { id: 11, author: 'Andrés Moreno', content: 'No es para todos los gustos, pero si te atrapa es una experiencia única.', date: '2025-05-13', rating: 8 },
      ],
    },
  },
  {
    id: 8,
    attributes: {
      title: 'Shogun',
      slug: 'shogun',
      excerpt: 'FX entrega la serie épica del año con una adaptación magistral de la novela de James Clavell ambientada en el Japón feudal.',
      content: `<p>Shogun es una muestra de lo que la televisión puede lograr cuando se combina una ambición artística con una ejecución impecable. La serie transporta al espectador al Japón de 1600 con un nivel de detalle y autenticidad que establece nuevos estándares.</p>
      <h2>Inmersión total</h2>
      <p>La decisión de filmar gran parte del diálogo en japonés con subtítulos fue arriesgada pero fundamental. Otorga a la serie una autenticidad que habría sido imposible de otro modo y respeta tanto la cultura retratada como la inteligencia del espectador.</p>
      <h2>Cosima Shivashi brilla</h2>
      <p>Anna Sawai entrega una actuación que define carreras. Su Lady Mariko es el corazón emocional de la serie, un personaje de una complejidad y una fuerza que trasciende la época histórica.</p>
      <h2>Veredicto</h2>
      <p>Shogun es televisión de prestigio en su máxima expresión. Una serie que merece cada uno de sus premios y que permanecerá en la memoria del espectador mucho después de los créditos finales.</p>`,
      rating: 9.4,
      category: 'series',
      categoryLabel: 'Series',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&h=450&fit=crop',
      author: 'Laura Fernández',
      publishedAt: '2025-04-08',
      featured: false,
      genre: 'Drama Histórico',
      year: 2024,
      seo: {
        metaTitle: 'Reseña Shogun - La serie épica del año',
        metaDescription: 'Análisis de Shogun en FX. Una adaptación magistral que transporta al espectador al Japón feudal con detalle y autenticidad.',
      },
      comments: [
        { id: 12, author: 'Teresa Blanco', content: 'De las mejores series que he visto en años. La fotografía es espectacular.', date: '2025-04-09', rating: 10 },
        { id: 13, author: 'Marcos Prieto', content: 'Puede ser lenta para quien busque acción constante, pero la recompensa narrativa es inmensa.', date: '2025-04-10', rating: 9 },
      ],
    },
  },
  {
    id: 9,
    attributes: {
      title: 'Astro Bot',
      slug: 'astro-bot',
      excerpt: 'Team Asobi demuestra que la alegría pura del gaming sigue viva con un plataformas que celebra la historia de PlayStation.',
      content: `<p>En una industria cada vez más obsesionada con mundos abiertos y narrativas cinematográficas, Astro Bot es un recordatorio de que la diversión pura es el pilar fundamental de los videojuegos.</p>
      <h2>Diseño de niveles magistral</h2>
      <p>Cada nivel de Astro Bot es una caja de sorpresas. Team Asobi demuestra una creatividad desbordante, introduciendo nuevas mecánicas con una frecuencia que mantiene al jugador en un estado constante de asombro y diversión.</p>
      <h2>Un homenaje al gaming</h2>
      <p>Las referencias a la historia de PlayStation son un deleite para los veteranos, pero el juego nunca depende de la nostalgia. Cada cameo y guiño funciona dentro del contexto del gameplay, enriqueciendo la experiencia sin convertirla en un ejercicio de fan service vacío.</p>
      <h2>Veredicto</h2>
      <p>Astro Bot es pura alegría condensada en forma de videojuego. Un título que debería estar en la biblioteca de todo propietario de PS5.</p>`,
      rating: 9.1,
      category: 'videojuegos',
      categoryLabel: 'Videojuegos',
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop',
      author: 'David Ruiz',
      publishedAt: '2025-03-15',
      featured: false,
      platform: 'PS5',
      genre: 'Plataformas',
      year: 2024,
      seo: {
        metaTitle: 'Reseña Astro Bot - La alegría del gaming en estado puro',
        metaDescription: 'Análisis de Astro Bot para PS5. Team Asobi demuestra que la diversión pura sigue siendo el pilar de los videojuegos.',
      },
      comments: [
        { id: 14, author: 'Alejandro Ruiz', content: 'Hacía mucho que un juego no me hacía sonreír tanto. Perfecto para todas las edades.', date: '2025-03-16', rating: 9 },
      ],
    },
  },
];

// --- BLOG DATA ---
export const blogData: StrapiEntity<BlogAttributes>[] = [
  {
    id: 1,
    attributes: {
      title: 'El renacimiento del cine de ciencia ficción',
      slug: 'renacimiento-cine-ciencia-ficcion',
      excerpt: 'Desde Dune hasta Interstellar, analizamos cómo la ciencia ficción ha vuelto a conquistar la pantalla grande con historias ambiciosas y visuales deslumbrantes.',
      content: `<p>El cine de ciencia ficción está viviendo una nueva edad dorada. Directores como Denis Villeneuve, Christopher Nolan y Alex Garland están creando obras que combinan el espectáculo visual con la profundidad narrativa, elevando el género a nuevas cotas de reconocimiento crítico y comercial.</p>
      <h2>De los efectos especiales a las ideas</h2>
      <p>Lo que distingue a esta nueva ola de ciencia ficción es su enfoque en las ideas por encima del espectáculo. Películas como Arrival, Ex Machina y Annihilation priorizan la exploración de conceptos filosóficos y científicos, utilizando los efectos especiales como herramienta narrativa en lugar de como fin en sí mismos.</p>
      <p>Este cambio de paradigma ha atraído a un público más amplio y diverso al género, demostrando que la ciencia ficción no es solo naves espaciales y alienígenas, sino un vehículo para explorar las preguntas más profundas sobre la condición humana.</p>
      <h2>El impacto del streaming</h2>
      <p>Las plataformas de streaming han jugado un papel crucial en este renacimiento. Series como Black Mirror, Love Death + Robots y Severance han demostrado que el formato serial puede ser ideal para explorar conceptos de ciencia ficción con la profundidad que una película de dos horas no siempre permite.</p>
      <h2>El futuro del género</h2>
      <p>Con proyectos ambiciosos como la adaptación de El Problema de los Tres Cuerpos por Netflix y la continuación del universo de Dune, el futuro de la ciencia ficción en el cine y la televisión parece más brillante que nunca. Estamos viviendo un momento privilegiado para los amantes del género.</p>`,
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=450&fit=crop',
      author: 'Carlos Mendoza',
      publishedAt: '2025-11-01',
      category: 'Análisis',
      seo: {
        metaTitle: 'El renacimiento del cine de ciencia ficción - CritiX Blog',
        metaDescription: 'Análisis de la nueva edad dorada de la ciencia ficción en el cine. De Dune a Interstellar, el género vive su mejor momento.',
      },
    },
  },
  {
    id: 2,
    attributes: {
      title: 'Los 10 videojuegos que definieron 2024',
      slug: 'videojuegos-que-definieron-2024',
      excerpt: 'Repasamos los títulos que marcaron tendencia, innovaron en diseño y conquistaron a millones de jugadores durante el año.',
      content: `<p>2024 fue un año extraordinario para la industria del videojuego. Con lanzamientos que abarcaron todos los géneros y plataformas, seleccionar solo diez títulos es una tarea casi imposible. Sin embargo, estos son los juegos que, en nuestra opinión, dejaron una huella imborrable.</p>
      <h2>1. Elden Ring: Shadow of the Erdtree</h2>
      <p>La expansión de FromSoftware no solo fue el mejor DLC del año, sino que muchos argumentan que es mejor que la mayoría de juegos completos. Su mundo interconectado y sus jefes memorables lo sitúan en lo más alto.</p>
      <h2>2. Astro Bot</h2>
      <p>Team Asobi demostró que la alegría pura del gaming sigue siendo una fórmula ganadora. Un juego que hizo sonreír a una industria necesitada de optimismo.</p>
      <h2>3. Metaphor: ReFantazio</h2>
      <p>Atlus creó una nueva IP que combina lo mejor de Persona con un mundo de fantasía original y fascinante. Un RPG que no se parece a nada que hayamos visto antes.</p>
      <h2>4. Final Fantasy VII Rebirth</h2>
      <p>Square Enix expandió su ambiciosa reimaginación del clásico con un mundo abierto que sorprendió por su escala y contenido.</p>
      <h2>5. Balatro</h2>
      <p>El roguelike de póker que nadie esperaba pero que todos necesitaban. Adictivo hasta niveles casi preocupantes.</p>
      <p>Los restantes cinco títulos de nuestra lista incluyen Black Myth: Wukong, Silent Hill 2 Remake, Indiana Jones, Dragon Age: The Veilguard y Helldivers 2, cada uno brillante a su manera.</p>`,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop',
      author: 'David Ruiz',
      publishedAt: '2025-10-15',
      category: 'Listas',
      seo: {
        metaTitle: 'Los 10 videojuegos que definieron 2024 - CritiX Blog',
        metaDescription: 'Repaso de los mejores videojuegos de 2024. De Elden Ring a Astro Bot, los títulos que marcaron el año.',
      },
    },
  },
  {
    id: 3,
    attributes: {
      title: 'La era dorada de las series de televisión',
      slug: 'era-dorada-series-television',
      excerpt: 'Vivimos en el mejor momento de la historia para la ficción televisiva. Analizamos por qué y qué nos depara el futuro.',
      content: `<p>Nunca ha habido tanta televisión de calidad como ahora. El auge de las plataformas de streaming ha multiplicado la producción de contenido, pero también ha elevado los estándares de calidad a niveles que habrían sido impensables hace apenas una década.</p>
      <h2>Diversidad de voces</h2>
      <p>Una de las mayores virtudes de esta era dorada es la diversidad de voces y perspectivas. Series como Shogun, Pachinko y Beef han demostrado que las historias universales pueden contarse desde cualquier cultura y en cualquier idioma.</p>
      <h2>El problema de la cantidad</h2>
      <p>Sin embargo, no todo es positivo. La sobreproducción de contenido ha creado un problema de descubrimiento: hay tantas series buenas que es imposible verlas todas. Esto ha llevado a fenómenos como el peak TV fatigue, donde los espectadores se sienten abrumados por la cantidad de opciones disponibles.</p>
      <h2>Calidad sobre cantidad</h2>
      <p>La tendencia reciente de las plataformas a reducir el número de producciones y apostar por la calidad sobre la cantidad es una señal positiva. Series como The Bear, Severance y The White Lotus demuestran que una temporada corta bien ejecutada vale más que una larga y diluida.</p>`,
      image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=450&fit=crop',
      author: 'Laura Fernández',
      publishedAt: '2025-09-28',
      category: 'Opinión',
      seo: {
        metaTitle: 'La era dorada de las series de televisión - CritiX Blog',
        metaDescription: 'Análisis del mejor momento de la ficción televisiva. Las series de TV viven su era dorada gracias al streaming.',
      },
    },
  },
  {
    id: 4,
    attributes: {
      title: 'Cómo la IA está transformando los videojuegos',
      slug: 'ia-transformando-videojuegos',
      excerpt: 'La inteligencia artificial está cambiando radicalmente cómo se crean y se experimentan los videojuegos. Exploramos las implicaciones.',
      content: `<p>La inteligencia artificial no es nueva en los videojuegos. Desde los patrones de los fantasmas en Pac-Man hasta los NPCs de The Elder Scrolls, la IA siempre ha sido un componente fundamental del diseño de juegos. Sin embargo, los avances recientes en machine learning y modelos generativos están abriendo posibilidades que transformarán el medio.</p>
      <h2>Generación procedural avanzada</h2>
      <p>Los algoritmos de IA generativa pueden crear mundos, texturas, diálogos y misiones de manera procedural con una calidad que se acerca cada vez más al contenido creado por humanos. Juegos como No Man\'s Sky fueron pioneros, pero los nuevos modelos llevan esta tecnología a otro nivel.</p>
      <h2>NPCs con personalidad</h2>
      <p>La integración de modelos de lenguaje en NPCs promete revolucionar las interacciones en juegos de mundo abierto. Imagina poder mantener conversaciones naturales con cualquier personaje, que recuerde tus interacciones previas y adapte su comportamiento.</p>
      <h2>El debate ético</h2>
      <p>El uso de IA en el desarrollo de videojuegos también plantea preguntas importantes sobre el empleo en la industria, los derechos de autor y la autenticidad artística. Es un debate que apenas comienza y que definirá el futuro del medio.</p>`,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
      author: 'David Ruiz',
      publishedAt: '2025-08-20',
      category: 'Tecnología',
      seo: {
        metaTitle: 'Cómo la IA está transformando los videojuegos - CritiX Blog',
        metaDescription: 'Exploramos el impacto de la inteligencia artificial en el diseño y la experiencia de los videojuegos modernos.',
      },
    },
  },
];

// --- CATEGORIES DATA ---
export const categoriesData: StrapiEntity<CategoryAttributes>[] = [
  {
    id: 1,
    attributes: {
      name: 'Películas',
      slug: 'peliculas',
      description: 'Reseñas y análisis de los estrenos cinematográficos más importantes. Del cine de autor al blockbuster, cubrimos todo el espectro.',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop',
      count: 3,
    },
  },
  {
    id: 2,
    attributes: {
      name: 'Series',
      slug: 'series',
      description: 'Las mejores series de televisión y streaming analizadas en profundidad. Drama, comedia, thriller y mucho más.',
      image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=450&fit=crop',
      count: 3,
    },
  },
  {
    id: 3,
    attributes: {
      name: 'Videojuegos',
      slug: 'videojuegos',
      description: 'Reviews de los últimos lanzamientos en PC, PlayStation, Xbox y Nintendo. Desde indies hasta AAA.',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop',
      count: 3,
    },
  },
];
