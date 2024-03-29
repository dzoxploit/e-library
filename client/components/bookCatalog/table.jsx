import React from 'react';
import style from '../../styles/components/bookCatalog/table.css';

function Table({
  catalogs,
  handleGetBookCatalogs,
  handleInfoboxData,
}) {
  const isDev = process.env.NODE_ENV === 'development';

  const formatDate = (args) => {
    const date = new Date(args).toLocaleDateString([], {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return date;
  }

  const handleDeleteBook = async (args) => {
    try {
      const token = localStorage.getItem('token');
      const url = isDev ? 'http://localhost:8000/api/books' : '/api/books';

      const request = await (await fetch(url, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookCode: args.bookCode,
        }),
      })).json();

      if (!request.success) throw request;

      const ctx = document.getElementsByClassName(style.row)[args.index];
      ctx.style = 'opacity: 0';

      setTimeout(() => {
        handleGetBookCatalogs();
        handleInfoboxData();

        setTimeout(() => {
          ctx.style = 'opacity: 1';
        }, 500);
      }, 1000);
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  return (
    <table className={style.table}>
      <thead className={style.thead}>
        <tr className={style.row}>
          <td className={style.column}>No</td>
          <td className={style.column}>Book Code</td>
          <td className={style.column}>Book Title</td>
          <td className={style.column}>Author</td>
          <td className={style.column}>Publisher</td>
          <td className={style.column}>Stock</td>
          <td className={style.column}>Published</td>
          <td className={`${style.column} ${style.action}`}>Action</td>
        </tr>
      </thead>
      <tbody className={style.tbody}>
        {
          catalogs.map((item, index) => (
            <tr className={style.row} key={item.bookCode}>
              <td className={style.column}>{index + 1}</td>
              <td className={style.column}>{item.bookCode}</td>
              <td className={style.column}>{item.title}</td>
              <td className={style.column}>{item.author}</td>
              <td className={style.column}>{item.publisher}</td>
              <td className={style.column}>{item.stock}</td>
              <td className={style.column}>{formatDate(item.publicationDate)}</td>
              <td className={`${style.column} ${style.action}`}>
                <button type="button" className={style.btn}>
                  <box-icon name="pencil"></box-icon>
                </button>
                <button
                  type="button"
                  className={style.btn}
                  onClick={() => handleDeleteBook({
                    index: index + 1,
                    bookCode: item.bookCode,
                  })}
                >
                  <box-icon name="trash"></box-icon>
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
