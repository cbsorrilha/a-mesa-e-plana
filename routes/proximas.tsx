import Session from "../entities/session.ts";
import { NotionSessionService } from "../adapters/notion.ts";
import { HeroBackground } from "../components/HeroBackground.tsx";
import formatDate from "../utils/formatDate.ts";

export default async function Home() {
  const notionService = new NotionSessionService()
  const sessionService = new Session(notionService)
  const { sessions, error } = await sessionService.getNextSessions()

  if (error || !sessions) {
    //TODO: pensar numa forma melhor de exibir o erro
    return <div>Erro ao buscar as próximas sessões</div>
  }
  
  return (
    <HeroBackground>
      <div class="flex flex-col justify-center h-full">
          <div class="mx-auto h-[700px] w-10/12 lg:w-8/12 lg:h-fit">
            <div class="text-1xl font-bold text-center text-white w-full mb-5">PROXIMAS SESSÕES</div>
            {sessions.map((session) => {
              return (
                <div class="bg-black-500 border border-solid opacity-100 mt-5 p-3">
                  <div class="text-l font-bold  text-white">{session.title}</div>
                  <div class="text-m  text-white">Local: {session.place}</div>
                  <div class="text-m  text-white">Data: {formatDate(session.date, 'dd/MM/yyyy')}</div>
                  <div class="text-m  text-white">Mestre: {session.gm}</div>
                </div>
              )
            })}
          </div>
      </div>
    </HeroBackground>
  );
}
