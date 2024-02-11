interface User{
    name:string,
    email:string,
    password:string,
    avatar:string | null,
    role:"admin" | "user" | "visitor",
}

export default User;