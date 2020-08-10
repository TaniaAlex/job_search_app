import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get_data",
  ERROR: "error",
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
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(JOBS_URL, {
        CancelToken: cancelToken.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });
    return () => {
      cancelToken.cancel();
    };
  }, [params, page]);

  return state;
}
