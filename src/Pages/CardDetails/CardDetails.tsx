import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TCard } from "../../Types/TCard";
import { toast } from "react-toastify";
import { Card } from "flowbite-react";

const CardDetails = () => {
  const [card, setCard] = useState<TCard>();
  const { id } = useParams<{ id: string }>();

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id,
      );
      setCard(res.data);
    } catch (error) {
      toast.error("fail")
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <section className="flex flex-col pt-20 text-center dark:text-white place-items-center">
    <h1 style={{fontSize: "2rem"}}> Card Details </h1>
    <p style={{fontSize: "1.5rem"}}> Here you can find all the card details </p>
    </section>
    <div className="flex flex-col items-center justify-start h-screen">
      <div className="flex flex-wrap items-center justify-center gap-3 m-auto md:w-4/5 max-md:flex-col">

        <Card
          key={card?._id}
          className="
           m-auto max-sm:w-[90%] max-md:w-[80%] md:w-[600px]
           mt-0 h-auto 
           bg-gradient-to-r from-pink-200 to-pink-300
           border-black
           dark:border-black
           dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800
           dark:text-white
           dark:ring-2
           ring-slate-600
           shadow-lg
           shadow-slate-800
           dark:shadow-slate-500
           hover:opacity-70
           transition-all
           duration-300
       "
        >
          <h1 className="text-xl text-center md:text-2xl">{card?.title}</h1>
          <img
            src={card?.image.url}
            alt={card?.image.alt}
            className="object-cover m-auto w-full md:w-[300px] h-[200px] md:h-[250px]"
          />
          <hr />
          <div className="flex flex-col gap-4 text-center">
            <h1>Email: {card?.email}</h1>
            <h1>Phone: {card?.phone}</h1>
            <h1 className="max-w-full overflow-auto">Description: {card?.description}</h1>
            <h1>
              Address: {card?.address.country}, {card?.address.city}, {card?.address.street}
            </h1>
          </div>
        </Card>
      </div>
    </div>
    </>
  );
};

export default CardDetails;
