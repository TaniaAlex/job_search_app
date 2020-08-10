import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get_data",
  ERROR: "error",
  UPDATE_HAS_NEXT_PAGE: "update-has-next-page",
};

const JOBS_URL =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { jobs: [], loading: true };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        jobs: [],
        error: action.payload.error,
      };
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return {
        ...state,
        hasNextPage: action.payload.hasNextPage,
      };

    default:
      return state;
  }
}

export default function useFetchJobs(params, page) {
  // test useFetchJobs by returning static object
  //   return {
  //     jobs: ["d", "f", "m"],
  //     loading: false,
  //     error: true,
  //   };

  const [state, dispatch] = useReducer(reducer, {
    jobs: [],
    loading: true,
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //   cancel multiple requests by typing
    // A good nifty example is when you have a search component, and imagine on every keyboard strike into the input tag, an axios request is made, which can lead to an overload of requests. The cancel token idea can help cancel the previous request, made by previous keyboard hit.
    const cancelToken1 = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(JOBS_URL, {
        CancelToken: cancelToken1.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });

    // axios request for a next page update
    const cancelToken2 = axios.CancelToken.source();

    axios
      .get(JOBS_URL, {
        CancelToken: cancelToken2.token,
        params: { markdown: true, page: page + 1, ...params },
      })
      .then((res) => {
        dispatch({
          type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length !== 0 },
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });

    return () => {
      // individualy cancel each request
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);

  return state;
}
