import React, { useState, useEffect } from "react";
import TrailRoomContext from "./trailRoomContext";
import toast from "react-hot-toast";

const TrailRoomState = (props) => {
    const [trailRoomItems, setTrailRoomItems] = useState([]);

    useEffect(() => {
        const savedItems = localStorage.getItem("trail_room_items");
        if (savedItems) {
            try {
                setTrailRoomItems(JSON.parse(savedItems));
            } catch (e) {
                setTrailRoomItems([]);
            }
        }
    }, []);

    const addToTrailRoom = (productId) => {
        if (trailRoomItems.includes(productId)) {
            toast.error("Already Curated: This product is already in your Virtual Suite.", {
                style: { borderRadius: '1rem', background: '#333', color: '#fff' }
            });
            return false;
        }
        const updatedItems = [...trailRoomItems, productId];
        setTrailRoomItems(updatedItems);
        localStorage.setItem("trail_room_items", JSON.stringify(updatedItems));
        toast.success("Ready for Trial: Product added to your Virtual Suite ✨", {
            style: { borderRadius: '1rem', background: '#333', color: '#fff' }
        });
        return true;
    };

    const removeFromTrailRoom = (productId) => {
        setTrailRoomItems(prevItems => {
            const updatedItems = prevItems.filter(id => id !== productId);
            localStorage.setItem("trail_room_items", JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const clearTrailRoom = () => {
        setTrailRoomItems([]);
        localStorage.removeItem("trail_room_items");
    };

    return (
        <TrailRoomContext.Provider value={{ trailRoomItems, addToTrailRoom, removeFromTrailRoom, clearTrailRoom }}>
            {props.children}
        </TrailRoomContext.Provider>
    );
};

export default TrailRoomState;
