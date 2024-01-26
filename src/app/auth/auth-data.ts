export interface AuthData {
  accessToken: string;
  user: {
    email: string;
    password: string;
    dataNascita: string;
    età: string;
    nome: string;
    cognome: string;
    id: number;
  };
}
