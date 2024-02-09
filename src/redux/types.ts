export interface IInput {
  username: string;
  password: string;
}
export interface ILink {
  link: string;
}

export interface IToken {
  access_token: string;
  token_type: string;
}

export interface IInputForm {
  usernameLogin: string | null;
  usernameRegister: string | null;
  passwordLogin: string | null;
  passwordRegister: string | null;
  link: string | null;
}
export type IInputName =
  | "usernameLogin"
  | "passwordLogin"
  | "usernameRegister"
  | "passwordRegister"
  | "link";

export type IDataLink = {
  counter: number | null;
  id: number | null;
  short: string;
  target: string;
};
