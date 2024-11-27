import "./style.css";

function HomeGamesList() {
    const games = [
        { id: 1, name: "Tic-Tac Toe)", image: "../../../public/tictactoe_preview.png", link: "/tictactoe" },
    ];

    const handleButtonClick = (link) => {
        if (navigator) {
            window.open(link, "_blank");
        } else {
            alert("Navegador não suporta essa funcionalidade.");
        }
    };

    return (
        <div className="game-grid">
            {games.map((game) => (
                <button
                    key={game.id}
                    className="game-button"
                    onClick={() => handleButtonClick(game.link)}
                >
                    <img src={game.image} alt={game.name} className="game-image" />
                </button>
            ))}
        </div>
    );
}

export default HomeGamesList;