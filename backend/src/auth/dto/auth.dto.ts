export interface AuthenticationResultDto {
  id: number;
  username: string;
  jwt?: {
    access_token: string;
    expired_at: number;
  };
}
