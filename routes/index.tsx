import SeeMore from "../islands/see-more.tsx";

interface Session {
  place: string;
  date: string;
  time: string;
  title: string;
  gm: string;
  description: string;
  summary: string;
}

const NEXT_SESSIONS: Session[] = [
  {
    place: "Online",
    date: "2023-12-22",
    time: "22:00",
    title: "O Dragão e a Ira, sessão 2",
    gm: "Cesar",
    description: "A segunda sessão da two-shot(?) de D&D 5e do Cesar, baseado em seu livro vindouro",
    summary: `
    Ela se passará nos Forgotten Realms.
Na primeira sessão, os jogadores estavam no casamento do príncipe filho do monarca da cidade de Telperis (criada por mim) quando, do céu, começou a chover sangue e um dragão atacou a catedral.
O dragão assassinou o rei, capturou a princesa e enfeitiçou o príncipe que ficou catatônico.
Concorrentemente um exército comandado pelo Dragão atacou a cidade e conseguiu expulsou o príncipe e um pequeno grupo de nobres e soldados. Assim como os jogadores, que acompanhavam o príncipe.
    `
  },
  {
    place: "Casa do MA",
    date: "2024-01-07",
    time: "08:00(?)",
    title: "Curse of Strahd, sessão 4",
    gm: "Fernando",
    description: "A quarta sessão da incrível campanha de D&D 5e do Fernando, baseado em seu livro",
    summary: `Os jogadores estão em Barovia, uma terra dominada por um vampiro chamado Strahd.
    Eles estão buscando levar a filha do burgo-mestre de Barovia para um lugar seguro.
    Na última sessão eles chegaram a uma cidadezinha chamada Vallaki, onde encontraram um grupo de vampiros e um possível aliado chamado. Uma nova aventureira passou a integrar o grupo.
    `
  }
];

const heroIMG = "/hero.jpg";

export default function Home() {
  // order the sessions by date
  NEXT_SESSIONS
    .filter(({date}) => new Date(date).getTime() > new Date().getTime())
    .sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate.getTime() - bDate.getTime();
    });

  const nextSession = NEXT_SESSIONS[0];

  return (
    <div class="w-screen h-screen overflow-hidden bg-no-repeat bg-cover" style={{ backgroundImage: `url(${heroIMG})` }}>
      <div class="w-screen h-screen bg-black opacity-75">
        <div class="flex flex-col justify-center h-full">
            <div class="w-6/12 bg-black mx-auto h-100">
              <div class="text-3xl font-bold text-center text-white">PROXIMA SESSÃO</div>
              <div class="text-4xl font-bold text-center text-white">{nextSession.title}</div>
              <div class="text-2xl font-bold text-center text-white">Onde? {nextSession.place}</div>
              <div class="text-2xl font-bold text-center text-white">Quando? {nextSession.date} {nextSession.time}</div>
              <div class="text-2xl font-bold text-center text-white">GM:{nextSession.gm}</div>
              <SeeMore>
                Descrição:
                <div class="text-2xl font-bold text-center text-white">{nextSession.description}</div>
                Sumario:
                <div class="text-1xl font-bold text-center text-white">{nextSession.summary}</div>
              </SeeMore>

            </div>
        </div>
      </div>
    </div>
  );
}
