export interface UsersRepositoryCreateUserPayload {
  phoneNumber?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  image?: string | null;
}

export interface UsersRepositoryUpdateUserProfilePayload {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  image?: string | null;
}
