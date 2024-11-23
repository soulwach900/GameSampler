import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../style.css';

function Home() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    user: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now().toString(),
          name: formData.user,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        setFormData({ user: '', email: '', password: '' });

        // Atualiza a lista de usuários
        const updatedUsers = await fetch("http://localhost:8080/users").then(res => res.json());
        setUsers(updatedUsers);
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/remove-user/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Usuário deletado com sucesso!");

        const updatedUsers = await fetch("http://localhost:8080/users").then(res => res.json());
        setUsers(updatedUsers);
      } else {
        alert("Erro ao deletar usuário.");
      }
    } catch (error) {
      console.error("Falha ao Deletar usuario: ", error);
    }
  }

  const navigate = useNavigate();
  function Login(id) {
    if (id) {
      navigate('/InstitutoEvoluir.testWeb/games');
    } else {
      alert(`Erro Ao Logar com Id: ${id}`)
      return null
    }
  }

  return (
    <div className="home">
      <div className="home_login">
        <form onSubmit={(e) => e.preventDefault()}>
          <p>Registrar:</p>
          <input
            name="user"
            type="text"
            value={formData.user}
            onChange={handleInputChange}
            placeholder="Usuário"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Senha"
          />
          <button type="button" onClick={handleSubmit}>Cadastrar</button>
        </form>
      </div>
      <div className='home_users'>
        <div>
          <h3>Usuários Registrados:</h3>
          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={user.id} className={`user_card user-${index}`}>
                <p>Usuário: {user.name}</p>
                <p>Email: {user.email}</p>
                <button onClick={() => Login(user.id)}>Entrar</button>
                <button onClick={() => handleDelete(user.id)}>Apagar</button>
              </div>
            ))
          ) : (
            <p>Nenhum usuário registrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
