function Login() {
    const handleLogin = () => {
        localStorage.setItem('authToken', 'my-token');
        window.location.href = '/profile'; // Redirect to the profile after login
    };

    return <button onClick={handleLogin}>Login</button>;
}

export default Login;
