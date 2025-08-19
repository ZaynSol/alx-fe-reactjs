import { useState } from "react";

function RegistrationForm() {
    const [{username, email, password}, setFormData] = useState({});
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({username, email, password});

        const errors = [];

        if (!username) errors.push("Username is required")
        if (!email) errors.push("Email is required")
        if (!password) errors.push("Password is required")

        if (errors.length) {
            setErrors(errors);
            return;
        }

        setErrors('');
        setFormData({});
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
            {errors.length > 0 && <ul>{errors.map(errMsg => <li>{errMsg}</li>)}</ul>}
        </form>
    );
}

export default RegistrationForm;
