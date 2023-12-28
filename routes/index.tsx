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
            <div class="bg-black mx-auto h-100 w-10/12 lg:w-8/12">
              <div class="text-1xl font-bold text-center text-white w-full">PROXIMA SESSÃO</div>
              <div class="text-4xl font-bold text-center text-white">{nextSession.title}</div>
              <div class="font-bold text-center text-white">
                <div class="text-l">
                  Onde? 
                </div>
                <div class="text-2xl ml-3">{nextSession.place}</div>
              </div>
              <div class="font-bold text-center text-white">
                <div class="text-l">Quando? </div>
                <div class="text-2xl">{formatDate(nextSession.date)}</div>
              </div>
              <div class="font-bold text-center text-white">
                <div class="text-l">GM: </div>
                <div class="text-2xl">{nextSession.gm}</div>
                
              </div>
              <SeeMore>
                <div class="text-l font-bold text-center text-white">Descrição:</div>
                <div class="text-xl font-bold text-center text-white text-justify">{nextSession.description}</div>
                <div class="text-l font-bold text-center text-white">Resumo:</div>
                <div class="text-xl font-bold text-center text-white overflow-y-scroll h-40 text-justify">{nextSession.summary}</div>
              </SeeMore>

            </div>
        </div>
      </div>
    </div>
  );
}
