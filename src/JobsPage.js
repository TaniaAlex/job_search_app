import React from "react";
import { Pagination } from "react-bootstrap";

export default function JobsPage({ page, setPage, hasNextPage }) {
  // show next page if available
  function showNextPage(amount) {
    setPage((prevPage) => prevPage + amount);
  }

  return (
    <Pagination>
      {page !== 1 && <Pagination.Prev onClick={() => showNextPage(-1)} />}
      {page !== 1 && (
        <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>
      )}
      {page > 2 && <Pagination.Ellipsis />}
      {page > 2 && (
        <Pagination.Item onClick={() => showNextPage(-1)}>
          {page - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{page}</Pagination.Item>
      {hasNextPage && (
        <Pagination.Item onClick={() => showNextPage(1)}>
          {page + 1}
        </Pagination.Item>
      )}
      {hasNextPage && <Pagination.Next onClick={() => showNextPage(1)} />}
    </Pagination>
  );
}
