import React, { useState, useEffect } from "react";
import style from "../../styles/components/loanBook/addLoanBook.css";

function AddLoanBook({ setAddLoanBookIsOpen, add }) {
  const isDev = process.env.NODE_ENV === "development";
  const [response, setResponse] = useState({
    success: false,
    message: "",
    active: false,
  });

  const [valid, setValid] = useState({
    title: false,
    author: false,
    publisher: false,
    stock: false,
  });

  const [fields, setFields] = useState({
    loanCode: "",
    description: "",
    status: "",
  });

  const handleChange = (event) => {
    setFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (!valid.loanCode || !valid.status) {
        const newError = {
          message: "Please fill out the form correctly",
        };
        throw newError;
      }

      const token = localStorage.getItem("token");
      const url = isDev ? "http://localhost:8000/api/loans" : "/api/loans";

      const request = await (
        await fetch(url, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(fields),
        })
      ).json();

      if (!request.success) throw request;

      setFields((prev) => ({
        ...prev,
        loanCode: "",
        description: "",
        status: "",
      }));

      setResponse((prev) => ({
        ...prev,
        success: true,
        message: request.message,
        active: true,
      }));

      handleGetLoanBooks();
      handleInfoboxData();

      setTimeout(() => {
        setAddLoanBooksIsOpen(false);
        setResponse((prev) => ({
          ...prev,
          message: "",
          active: false,
        }));
      }, 2000);
    } catch (error0) {
      setResponse((prev) => ({
        ...prev,
        success: false,
        message: error0.message,
        active: true,
      }));
    }
  };

  useEffect(() => {
    setValid((prev) => ({
      ...prev,
      description: fields.title.length <= 200,
      status: fields.stock != null,
    }));
  }, [fields]);

  return (
    <div className={`${style.addbook} ${addBookIsOpen && style.active}`}>
      <div className={style["addbook-wrap"]}>
        <div className={style.nav}>
          <div className={style.top}>
            <button
              type="button"
              className={style.btn}
              onClick={() => setAddLoanBookIsOpen(false)}
            >
              <box-icon name="arrow-back"></box-icon>
            </button>
            <h2 className={style.title}>Add New Loan Book</h2>
          </div>
          <p className={style.text}>
            Fill out all the available forms to loan several book into the
            library.
          </p>
        </div>
        <form method="post" className={style.form} onSubmit={handleSubmit}>
          <label className={style.fields} htmlFor="loanCode">
            <div className={style.center}>
              <p className={style.label}>Loan Code</p>
              <input
                type="text"
                name="loanCode"
                id="loanCode"
                className={style.control}
                placeholder="character not using symbol"
                onChange={handleChange}
                required
              />
            </div>
            <box-icon
              name={valid.title ? "check-circle" : "x-circle"}
              className={style.valid}
              color={valid.title ? "#188c94" : "#9B0000"}
            ></box-icon>
          </label>
          <label className={style.fields} htmlFor="description">
            <div className={style.center}>
              <p className={style.label}>Description</p>
              <textarea
                name="description"
                id="description"
                className={style.control}
                placeholder="character length not more than 200"
                onChange={handleChange}
                required
              >
                {fields.description}
              </textarea>
            </div>
            <box-icon
              name={valid.author ? "check-circle" : "x-circle"}
              className={style.valid}
              color={valid.author ? "#188c94" : "#9B0000"}
            ></box-icon>
          </label>
          <label className={style.fields} htmlFor="publisher">
            <div className={style.center}>
              <p className={style.label}>status</p>
              <select
                name="status"
                id="status"
                className={style.control}
                onChange={handleChange}
                required
              >
                <option value="1">Aktif</option>
                <option value="0">Non Aktif</option>
              </select>
            </div>
          </label>
          <span className={style.response}>
            {response.active && (
              <box-icon
                name={response.success ? "check-circle" : "x-circle"}
                color={response.success ? "#188c94" : "#9B0000"}
              ></box-icon>
            )}
            <p className={style.text}>{response.message}</p>
          </span>
          <button type="submit" className={style["submit-btn"]}>
            <p className={style.text}>Submit</p>
            <box-icon name="plus-circle" color="#ffffff"></box-icon>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
