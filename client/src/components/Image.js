const Image = ({ src, ...rest }) => {
  src =
    src && src.includes("https://")
      ? src
      : process.env.REACT_APP_BASEURL + "/" + src;
  return <img {...rest} src={src} alt={""} />;
};

export default Image;
