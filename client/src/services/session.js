const session = {
    user: null,
    message: [],
    Login(email,password){
        this.user = {
            FirstName: "Huaqi",
            LastName: email,
            Password: password,
            ID:123,
        }
    }
};

export default session;