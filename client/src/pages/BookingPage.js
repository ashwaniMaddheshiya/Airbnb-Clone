import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";
import { UserContext } from "../context/UserContext";
import Spinner from "../components/Spinner";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const auth = useContext(UserContext);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        if (id && auth.token) {
          const response = await axios.get(`/api/bookings/${id}`, {
            headers: {
              Authorization: auth.token,
            },
          });

          const foundBooking = response.data;
          if (foundBooking) {
            setBooking(foundBooking);
          }
        }
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    fetchBooking();
  }, [id, auth.token]);

  return (
    <>
      {booking ? (
        <div className="my-8">
          <h1 className="text-3xl">{booking.place.title}</h1>
          <AddressLink className="my-2 block">
            {booking.place.address}
          </AddressLink>
          <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-2xl mb-4">Your booking information:</h2>
              <BookingDates booking={booking} />
            </div>
            <div className="bg-primary p-6 text-white rounded-2xl">
              <div>Total price</div>
              <div className="text-3xl">₹{booking.price}</div>
            </div>
          </div>
          <PlaceGallery place={booking.place} />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default BookingPage;
