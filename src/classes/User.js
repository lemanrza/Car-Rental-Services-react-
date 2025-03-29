class User {
    constructor(name, email, password) {
        this.name = name,
            this.email = email,
            this.password = password,
            this.role = "client",
            this.profileImage = "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
        this.isBanned = false
    }
}
export default User;