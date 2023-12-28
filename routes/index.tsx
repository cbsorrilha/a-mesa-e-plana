import SeeMore from "../islands/see-more.tsx";
import Session from "../entities/session.ts";
import formatDate from "../utils/formatDate.ts";
import { NotionSessionService } from "../adapters/notion.ts";
import { HeroBackground } from "../components/HeroBackground.tsx";

export default async function Home() {
  const notionService = new NotionSessionService()
  const sessionService = new Session(notionService)
  const { session, error } = await sessionService.getNextSession()

  if (error || !session) {
    //TODO: pensar numa forma melhor de exibir o erro
    return <div>Erro ao buscar a próxima sessão</div>
  }
  
  return (
    <HeroBackground>
      <div class="flex flex-col justify-center h-full">
          <div class="mx-auto h-100 w-10/12 lg:w-8/12">
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
              <div class="text-2xl">{formatDate(session.date, 'dd/MM/yyyy')}</div>
            </div>
            <div class="font-bold text-center text-white">
              <div class="text-l">GM: </div>
              <div class="text-2xl">{session.gm}</div>
              
            </div>
            <SeeMore>
              <div class="text-l font-bold text-center text-white">Descrição:</div>
              <div class="text-xl text-white text-justify">{session.description}</div>
              <div class="text-l font-bold text-center text-white">Resumo:</div>
              <div class="text-xl text-white overflow-y-scroll h-40 text-justify">{session.summary}</div>
            </SeeMore>

          </div>
      </div>
    </HeroBackground>
  );
}
