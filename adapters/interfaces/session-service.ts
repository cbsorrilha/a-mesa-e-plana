export interface SessionDTO {
  id: string;
  place: string;
  date: string;
  title: string;
  gm: string;
  description: string;
  summary: string;
  attendees: string;
}

export interface Options {
  filter?: Record<string, unknown>;
  sorts?: Record<string, unknown>[];
  filters?: Record<string, unknown>[];
}

export interface SessionService {
  getSessions(filters: Options): Promise<SessionDTO[]>;
}