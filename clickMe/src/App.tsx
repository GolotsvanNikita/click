import { useState, useEffect } from 'react';
import './App.css';

function App()
{
    const [stage, setStage] = useState<'initial' | 'stars' | 'heart' | 'text'>('initial');
    const [stars, setStars] = useState<{ id: number; x: number; y: number; targetX: number; targetY: number }[]>([]);

    useEffect(() =>
    {
        if (stage === 'stars')
        {
            const newStars = Array.from({ length: 200 }, (_, id) =>
            ({
                id,
                x: Math.random() * 100,
                y: Math.random() * 100,
                targetX: 0,
                targetY: 0,
            }));

            newStars.forEach((star, index) =>
            {
                const t = (index / newStars.length) * 2 * Math.PI;
                const heartX = 50 + 16 * Math.pow(Math.sin(t), 3) * 1.5;
                const heartY = 45 - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 1.5;
                star.targetX = heartX;
                star.targetY = heartY;
            });

            setStars(newStars);
            setTimeout(() => setStage('heart'), 10000);
        }
        else if (stage === 'heart')
        {
            setTimeout(() => setStage('text'), 5500);
        }
    }, [stage]);

    const handleClick = () =>
    {
        setStage('stars');
    };

    return (
        <div className={`app ${stage}`}>
            {stage === 'initial' && (
                <button onClick={handleClick}>Click me</button>
            )}
            {stage !== 'initial' && (
                <div className="stars-container">
                    {stars.map(star =>
                    (
                        <div
                            key={star.id}
                            className="star"
                            style={{
                                left: `${star.x}vw`,
                                top: `${star.y}vh`,
                                animation: stage === 'stars' ? `moveToHeart 3s forwards ${star.id * 0.01}s, blink 1s infinite` : undefined,
                                '--target-x': `${star.targetX}vw`,
                                '--target-y': `${star.targetY}vh`,
                            } as React.CSSProperties}
                        />
                    ))}
                </div>
            )}
            {stage === 'heart' || stage === 'text' ?
            (
                <div className="heart" />
            ) : null}
            {stage === 'text' && (
                <div className="text">I LOVE YOU.</div>
            )}
        </div>
    );
}

export default App;