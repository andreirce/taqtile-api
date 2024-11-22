import { AddressModel } from "./address.model";

export interface UserModel {
  id: string;
  name: string;
  email: string;
  birthDate: Date;
}

export interface UserDetailsModel {
  limit?: number;
  page?: number;
}

export interface UserInputModel {
  name: string;
  email: string;
  password: string;
  bitrhDate?: string;
}

export interface UsersPaginationModel {
  users: UserModel[];
  moreAfter: boolean;
  moreBefore: boolean;
}

export interface UserWithPassword extends UserModel {
  password: string;
}

export interface UserWithAddressModel extends UserWithPassword {
  address: AddressModel[];
}
