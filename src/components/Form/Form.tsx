import useValidation from "../../redux/hook/useValidation";
import { createShortLink } from "../../redux/linkActions";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Input from "../Input/Input";
import "./Form.scss";

const Form = () => {
  const { values, onChange, isValidForm, setValues } = useValidation();
  const dispatch = useAppDispatch();
  const { messageErrorCreate } = useAppSelector((state) => state.link);
  const { isErrorCreate } = useAppSelector((state) => state.link);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { link } = values;

    dispatch(createShortLink({ link }));
    setValues({});
  };

  const handleChange = (evt) => {
    onChange(evt);
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__wrap">
          <Input
            type="text"
            value={values.link || ""}
            placeholder="Введите ссылку, которую нужно сократить"
            name="link"
            onChange={handleChange}
          />
          <button type="submit" className="form__btn" disabled={!isValidForm}>
            Сократить
          </button>
        </div>
        {isErrorCreate && <p className="form__error">{messageErrorCreate}</p>}
      </form>
    </>
  );
};

export default Form;
