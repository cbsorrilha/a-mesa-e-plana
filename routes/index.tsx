import SeeMore from "../islands/see-more.tsx";
import { getNextSession } from "../services/session.ts";
import formatDate from "../utils/formatDate.ts";


const heroIMG = "/hero.jpg";

export default async function Home() {
  const nextSession = await getNextSession()

  return (
    <div class="w-screen h-screen overflow-hidden bg-no-repeat bg-cover" style={{ backgroundImage: `url(${heroIMG})` }}>
      <div class="w-screen h-screen bg-black opacity-75">
        <div class="flex flex-col justify-center h-full">
            <div class="w-6/12 bg-black mx-auto h-100">
              <div class="text-3xl font-bold text-center text-white">PROXIMA SESSÃO</div>
              <div class="text-4xl font-bold text-center text-white">{nextSession.title}</div>
              <div class="text-2xl font-bold text-center text-white">Onde? {nextSession.place}</div>
              <div class="text-2xl font-bold text-center text-white">Quando? {formatDate(nextSession.date)}</div>
              <div class="text-2xl font-bold text-center text-white">GM:{nextSession.gm}</div>
              <SeeMore>
                <div class="text-l font-bold text-center text-white">Descrição:</div>
                <div class="text-2xl font-bold text-center text-white">{nextSession.description}</div>
                <div class="text-l font-bold text-center text-white">Resumo:</div>
                <div class="text-xl font-bold text-center text-white">{nextSession.summary}</div>
              </SeeMore>

            </div>
        </div>
      </div>
    </div>
  );
}
