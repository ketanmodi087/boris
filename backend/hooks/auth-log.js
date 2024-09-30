module.exports = ({ services }) => {
    const { AuthenticationService } = services;

    const originalLogin = AuthenticationService.login;

    AuthenticationService.login = async (payload) => {
        console.log('Login attempt:', payload); // Log the login attempt
        try {
            const result = await originalLogin.call(this, payload);
            console.log('Login successful:', result); // Log successful login
            return result;
        } catch (error) {
            console.error('Login failed:', error); // Log failed login
            throw error;
        }
    };
};
