import React from "react";

export default function useFetchJobs(param, page) {
  return {
    jobs: [],
    loading: false,
    error: true,
  };
}
