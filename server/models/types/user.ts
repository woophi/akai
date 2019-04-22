import { Model } from "./mongoModel";

export type User = Model<{
  email: string,
  name: string,
  avatarUrl: string,
  roles: string[]
  password: string
  refershToken: string
  accessToken: string
}>
