import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GameContext } from '../../../../context/gameContext';

const InGame = () => {
  const { id } = useParams();
  const { game } = useContext(GameContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== game.id) {
      navigate('/game');
    }
  }, [id])

  return (
    <div>
      <div>
        <h1>Game {id}</h1>

      </div>
    </div>
  );
};

export default InGame;
