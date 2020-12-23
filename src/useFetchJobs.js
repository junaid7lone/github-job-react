import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "make_request",
  GET_DATA: "get_data",
  ERROR: "error",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        loading: true,
        jobs: [],
        error: null,
      };
    case ACTIONS.GET_DATA:
      return { loading: false, jobs: action.payload.jobs, error: null };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    default:
      return state;
  }
}

const corsUnblocker = "https://cors-anywhere.herokuapp.com/";
const gitAPIUrl = "https://jobs.github.com/positions.json";
const BASEURL = corsUnblocker + gitAPIUrl;

export function useFetchJobs(params, page) {
  const initialState = { jobs: [], loading: true, errors: null };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    console.log(params);
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(BASEURL, {
        cancelToken: cancelToken.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      });

    return () => {
      cancelToken.cancel();
    };
  }, [params, page]);

  return state;
}
