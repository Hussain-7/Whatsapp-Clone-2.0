import { Circle } from "better-react-spinkit";
import Head from "next/head";
const Loading = () => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <Head>
        <title>Loading</title>
      </Head>
      <div>
        <img
          src="WhatsApp.svg"
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
