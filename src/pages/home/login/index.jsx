import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import "./style.css"

function Login() {
    const location = useLocation();
    const [userId, setUserId] = useState(null);
    const [password, setPassword] = useState("");
    const [, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.userId) {
            setUserId(location.state.userId);
        }

        fetch("http://localhost:8080/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Erro ao buscar usuários:", error));
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: userId, password})
            });
            if (response.ok) {
                alert("Login Sucedido");
                navigate("/games");
            } else {
                alert("Falha ao Logar no Usuário");
            }
        } catch (error) {
            console.error("Erro no Login: ", error);
        }
    };

    return (
        <div className="home_login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Senha:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite sua senha"
                        />
                    </label>
                </div>
                <button type="submit" disabled={!userId || !password}>
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default Login;