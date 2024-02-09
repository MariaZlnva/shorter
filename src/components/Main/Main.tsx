import Form from "../Form/Form";
import ShortLink from "../ShortLink/ShortLink";
import Table from "../Table/Table";
import "./Main.scss";

const Main = () => {
  return (
    <main className="main">
      <Form />
      <ShortLink />
      <Table />
    </main>
  );
};

export default Main;
