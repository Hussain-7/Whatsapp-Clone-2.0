import { Circle } from "better-react-spinkit";
import Head from "next/head";
const Loading = () => {
  return (
    <center
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        zIndex: "1000",
      }}
    >
      <Head>
        <title>Loading</title>
      </Head>
      <div>
        <img
          src="/whatsapp.svg"
          alt="daadasds"
          style={{
            marginBottom: 50,
          }}
          height={170}
        />
        <Circle color="#3CBC28" size={45} />
      </div>
    </center>
  );
};

export default Loading;
