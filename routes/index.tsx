import SeeMore from "../islands/see-more.tsx";
import Session from "../entities/session.ts";
import formatDate from "../utils/formatDate.ts";
import { NotionSessionService } from "../adapters/notion.ts";


const heroIMG = "/hero.jpg";

export default async function Home() {
  const notionService = new NotionSessionService()
  const sessionService = new Session(notionService)
  const { session, error } = await sessionService.getNextSession()

  if (error || !session) {
    return <div>Erro ao buscar a próxima sessão</div>
  }
  
  return (
    <div class="w-screen h-screen overflow-hidden bg-no-repeat bg-cover" style={{ backgroundImage: `url(${heroIMG})` }}>
      <div class="w-screen h-screen bg-black opacity-75">
        <div class="flex flex-col justify-center h-full">
            <div class="bg-black mx-auto h-100 w-10/12 lg:w-8/12">
              <div class="text-1xl font-bold text-center text-white w-full">PROXIMA SESSÃO</div>
              <div class="text-4xl font-bold text-center text-white">{session.title}</div>
              <div class="font-bold text-center text-white">
                <div class="text-l">
                  Onde? 
                </div>
                <div class="text-2xl ml-3">{session.place}</div>
              </div>
              <div class="font-bold text-center text-white">
                <div class="text-l">Quando? </div>
                <div class="text-2xl">{formatDate(session.date)}</div>
              </div>
              <div class="font-bold text-center text-white">
                <div class="text-l">GM: </div>
                <div class="text-2xl">{session.gm}</div>
                
              </div>
              <SeeMore>
                <div class="text-l font-bold text-center text-white">Descrição:</div>
                <div class="text-xl font-bold text-center text-white text-justify">{session.description}</div>
                <div class="text-l font-bold text-center text-white">Resumo:</div>
                <div class="text-xl font-bold text-center text-white overflow-y-scroll h-40 text-justify">{session.summary}</div>
              </SeeMore>

            </div>
        </div>
      </div>
    </div>
  );
}
