export class RegisterDto {
  public readonly email: string;

  public readonly password: string;

  public readonly name?: string;
}

export class LoginDto {
  public readonly email: string;

  public readonly password: string;
}
