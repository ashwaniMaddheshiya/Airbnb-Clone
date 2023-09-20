import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../components/Image";
import Spinner from "../components/Spinner";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("/api/places");
        setPlaces(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {isLoading ? (
        <Spinner/>
      ) : (
        places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id} key={place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.image?.[0] && (
                <Image
                  className="rounded-2xl object-cover aspect-square"
                  src={place.image?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">₹{place.price}</span> per night
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default IndexPage;
