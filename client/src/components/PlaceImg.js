import Image from "./Image";

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.image?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return <Image className={className} src={place.image[index]} alt="" />;
};

export default PlaceImg;
