import {useEffect, useState} from "react";
import Dogecoin from "../../../../public/assets/clicker/dogecoin.png";
import MinerA from "../../../../public/assets/clicker/miner_a.png";
import "./style.css"

function ClickerGame() {
    const [money, setMoney] = useState(0);
    const [upgrades, setUpgrades] = useState(0);
    const [upgradeCost, setUpgradeCost] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            setMoney((prevMoney) => prevMoney + upgrades);
        }, 1000);

        return () => clearInterval(interval)
    }, [upgrades]);

    const handleMoneyClick = () => {
        setMoney(money + 1);
    };

    const handleUpgradeClick = () => {
        if (money >= upgradeCost) {
            setMoney(money - upgradeCost);
            setUpgrades(upgrades + 1);
            setUpgradeCost(Math.ceil(upgradeCost * 1.5));
        } else {
            alert("Você não tem dinheiro suficiente para esse upgrade!");
        }
    };

    const saveGame = () => {
        const saveData = {
            money,
            upgrades,
        };
        localStorage.setItem("clickerSave", JSON.stringify(saveData));
        alert("Progresso salvo!");
    };

    const loadGame = () => {
        const savedData = localStorage.getItem("clickerSave");
        if (savedData) {
            const { money, upgrades } = JSON.parse(savedData);
            setMoney(money);
            setUpgrades(upgrades);
            alert("Progresso carregado!");
        } else {
            alert("Nenhum progresso salvo encontrado.");
        }
    };

    useEffect(() => {
        window.addEventListener("beforeunload", saveGame);
        return () => {
            window.removeEventListener("beforeunload", saveGame);
        };
    }, [money, upgrades]);

    return (
        <div className="clicker">
            <h2>Points: {money}</h2>
            <img
                src={Dogecoin}
                onClick={handleMoneyClick}
                alt="Dogecoin"
                style={{cursor: "pointer"}}
            />
            <div className="clicker_upgrades">
                <img
                    src={MinerA}
                    onClick={handleUpgradeClick}
                    alt="Doge Miner"
                    style={{cursor: "pointer"}}
                />
                <p>Upgrades comprados: {upgrades}</p>
                <p>Custo do próximo upgrade: {upgradeCost}</p>
                <p>Minerando {upgrades} por segundo</p>
                <button onClick={saveGame}>Salvar Progresso</button>
                <button onClick={loadGame}>Carregar Progresso</button>
            </div>
        </div>
    );
}

export default ClickerGame;