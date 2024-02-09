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
  usernameLogin: string | "";
  usernameRegister: string | "";
  passwordLogin: string | "";
  passwordRegister: string | "";
  link: string | "";
}
export type IInputName =
  | "usernameLogin"
  | "passwordLogin"
  | "usernameRegister"
  | "passwordRegister"
  | "link";

export interface IDataLink {
  counter: number;
  id: number;
  short: string;
  target: string;
}
