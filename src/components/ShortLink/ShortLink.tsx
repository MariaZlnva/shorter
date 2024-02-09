import { useEffect } from "react";
import { deleteListLink } from "../../redux/linkSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./ShortLink.scss";

const ShortLink = () => {
  const { listLink } = useAppSelector((state) => state.link);
  const dispatch = useAppDispatch();

  const handlerCopyContent = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  useEffect(() => {
    return () => {
      dispatch(deleteListLink());
    };
  }, []);
  return (
    <>
      {listLink.id !== null && (
        <div className="shortLink">
          <h4 className="shortLink__title">Ваша ссылка готова: </h4>
          <a
            title="Скопировать"
            className="shortLink__link"
            onClick={() =>
              handlerCopyContent(
                `https://front-test.hex.team/s/${listLink.short}`
              )
            }
          >
            {`https://front-test.hex.team/s/${listLink.short}`}
          </a>
        </div>
      )}
    </>
  );
};

export default ShortLink;
