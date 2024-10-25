import { useEffect } from "react";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import { FaHeart } from "react-icons/fa";
import useCards from "../../Hooks/useCards";

const Favorites = () => {
  const { user, searchFavoriteCards, isLikedCard, navToCard, getData, likeUnlikeCard } = useCards();

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start gap-2 p-4 bg-pinky dark:bg-brownish">
      <h1 className="text-2xl md:text-3xl">Favorites Page</h1>
      <p className="text-lg md:text-xl">Your favorite cards</p>
      <div className="grid w-full max-w-6xl grid-cols-1 gap-4 m-auto sm:grid-cols-2 lg:grid-cols-3">
        {searchFavoriteCards()!.map((item: TCard) => {
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
                <FaHeart
                  size={20}
                  className="m-auto cursor-pointer"
                  color={isLikedCard(item) ? "red" : "black"}
                  onClick={() => likeUnlikeCard(item)}
                />
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
