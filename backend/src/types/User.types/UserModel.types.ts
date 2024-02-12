interface User{
    name:string,
    email:string,
    password:string,
    avatar:string | null,
    role:"admin" | "user",
}

export default User;