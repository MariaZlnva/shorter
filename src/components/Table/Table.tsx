import { useEffect } from "react";
import { getStatistics } from "../../redux/linkActions";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./Table.scss";
interface ITableProps {}
const Table: React.FC<ITableProps> = () => {
  const dispatch = useAppDispatch();
  const { statistics } = useAppSelector((state) => state.link);
  const { listLink } = useAppSelector((state) => state.link);
  const { isErrorGetStatistics } = useAppSelector((state) => state.link);
  const { isLoading } = useAppSelector((state) => state.link);

  useEffect(() => {
    dispatch(getStatistics());
  }, [listLink]);

  const listToRender = statistics;

  const handlerCopyContent = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return isErrorGetStatistics ? (
    "Что-то пошло не так, попробуйте переавторизоваться"
  ) : isLoading ? (
    "Loading..."
  ) : (
    <>
      {listToRender.length !== 0 && (
        <div className="table">
          <h3 className="table__title">История ссылок:</h3>

          <ul className="table__body">
            <li className="table__row">
              <div className="table__header">Короткая ссылка</div>
              <div className="table__header">Исходная ссылка</div>
              <div className="table__header">Количество переходов</div>
            </li>
            {listToRender.length !== 0 &&
              listToRender.map((el) => {
                const shortUrl = `https://front-test.hex.team/s/${el.short}`;
                return (
                  <li className="table__row" key={el.id}>
                    <div
                      className="table__data table__data_copy"
                      onClick={() => handlerCopyContent(shortUrl)}
                    >
                      {shortUrl}
                    </div>
                    <div className="table__data">{el.target}</div>
                    <div
                      className={
                        el.counter >= 1
                          ? "table__data table__data_style table__data_active"
                          : "table__data table__data_style"
                      }
                    >
                      {el.counter}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Table;
