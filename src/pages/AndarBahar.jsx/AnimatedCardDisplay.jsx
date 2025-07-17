/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { assets } from './assets';

function AnimatedCardDisplay({ betResultDataAnnouncement }) {
    const [andarCards, setAndarCards] = useState([]);
    const [baharCards, setBaharCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animatedIndex, setAnimatedIndex] = useState(null);

    useEffect(() => {
        if (betResultDataAnnouncement?.json?.length > 0) {
            const cards = JSON.parse(betResultDataAnnouncement.json);

            // Reset states when betResultDataAnnouncement changes
            setAndarCards([]);
            setBaharCards([]);
            setCurrentIndex(0);
            setAnimatedIndex(null);

            let localIndex = 0; // Use a local variable to manage the index
            const interval = setInterval(() => {
                if (localIndex < cards.length) {
                    setAnimatedIndex(localIndex); // Set the current animated index
                    if (localIndex % 2 === 0) {
                        setAndarCards((prev) => [...prev, cards[localIndex]]);
                    } else {
                        setBaharCards((prev) => [...prev, cards[localIndex]]);
                    }
                    localIndex += 1; // Increment the local index
                } else {
                    clearInterval(interval); // Stop the interval when all cards are animated
                    setAnimatedIndex(null); // Clear the animated index
                }
            }, 200); // Animation timing

            return () => clearInterval(interval); // Cleanup interval on unmount or prop change
        }
    }, [betResultDataAnnouncement?.json]); // Dependency only on betResultDataAnnouncement.json

    if (!betResultDataAnnouncement?.json) {
        return null; // Render nothing if JSON data is not available
    }

    const cards = JSON.parse(betResultDataAnnouncement.json);
    const lastCard = cards[cards.length - 1];

    // console.log("betResultDataAnnouncement", betResultDataAnnouncement);
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa", andarCards);
    // console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbb", baharCards);

    return (
        <div className="w-full flex flex-col absolute top-[10vh] px-2">
            {/* Andar Section */}
            <div className="w-full flex items-center gap-2">
                <img className="w-20 h-8" src={assets?.andar} alt="andar" />
                {andarCards.map((item, index) => (
                    <img
                        key={index}
                        className={`w-6.5 h-8 ${index !== 0 ? "-ml-3" : ""} ${
                            item === lastCard ? "border-2 border-gold w-7 h-9" : "w-6.5 h-8"
                        } ${animatedIndex === index ? "animate-slide-in" : ""}`}
                        src={assets.cards[item - 1]}
                        alt=""
                    />
                ))}
            </div>

            {/* Bahar Section */}
            <div className="w-full flex items-center gap-2 mt-5">
                <img className="w-20 h-8" src={assets?.bahar} alt="bahar" />
                {baharCards.map((item, index) => (
                    <img
                        key={index}
                        className={` ${index !== 0 ? "-ml-3" : ""} ${
                            item === lastCard ? "border-2 border-gold w-7 h-9" : "w-6.5 h-8"
                        } ${animatedIndex === index ? "animate-slide-in" : ""}`}
                        src={assets.cards[item - 1]}
                        alt=""
                    />
                ))}
            </div>
        </div>
    );
}

export default AnimatedCardDisplay;
