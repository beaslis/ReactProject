import { useEffect } from "react";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { PiPlus } from "react-icons/pi";
import useCards from "../../Hooks/useCards";

const MyCards = () => {
  const nav = useNavigate();
  const {
    user,
    searchCards,
    isLikedCard,
    navToCard,
    getMyCards,
    likeUnlikeCard,
    deleteCard,
  } = useCards();

  const navToCreate = () => {
    nav("/create-card");
  };

  useEffect(() => {
    getMyCards();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start gap-2 p-4 bg-pinky dark:bg-brownish">
      <h1 className="text-2xl md:text-3xl">My Cards</h1>
      <p className="text-lg md:text-xl">These cards were made by the user</p>
      <div className="grid w-full max-w-6xl grid-cols-1 gap-4 m-auto sm:grid-cols-2 lg:grid-cols-3">
        {searchCards()!.map((item: TCard) => {
          return (
            <Card key={item._id} className="w-full">
              <img
                onClick={() => navToCard(item._id)}
                src={item.image.url}
                alt={item.image.alt}
                className="h-[200px] w-full object-cover"
              />
              <h1 className="text-xl">{item.title}</h1>
              <h3 className="text-lg">{item.subtitle}</h3>
              <p className="text-sm">{item.description}</p>
              <hr />
              {user && user.user && (
                <div className="flex justify-around mt-2">
                  <FaHeart
                    size={20}
                    className="cursor-pointer"
                    color={isLikedCard(item) ? "red" : "black"}
                    onClick={() => likeUnlikeCard(item)}
                  />
                  <FaPencil
                    size={20}
                    className="cursor-pointer"
                    onClick={() => nav("/edit-card/" + item._id)}
                  />
                  <FaTrash
                    size={20}
                    className="cursor-pointer"
                    onClick={() => deleteCard(item)}
                  />
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="fixed flex p-3 rounded-full shadow-lg cursor-pointer right-4 bottom-4 md:right-10 md:bottom-10 bg-greeny dark:bg-brown">
        <PiPlus size={24} onClick={navToCreate} />
      </div>
    </div>
  );
};

export default MyCards;
