export class User
{
    Username: string;
    Password: string;
    Token?: string;
    Email?: string;
}

export class Login
{
    username: string;
    password: string;
    Email?: string;
    RememberMe?: boolean;
}


export class RegisterAccount
{
     Username?    :string ;   
     Password?       :string;
     ConfirmPassword?:string;
     Email?          :string;
}