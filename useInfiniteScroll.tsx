import { useEffect, useReducer } from "react";

type State = {
  loadingAmount: number;
  showLoadButton: boolean;
  step: number;
  contentLength: number;
};

function reducer(state: State, action) {
  if (
    action.type === "LOAD_MORE" &&
    state.contentLength > state.loadingAmount
  ) {
    return {
      ...state,
      loadingAmount: state.step + state.loadingAmount,
      showLoadButton: false,
    };
  }
  if (action.type === "UPDATE_CONTENT") {
    const { content } = action.payload;
    return {
      ...state,
      contentLength: content.length,
      showLoadButton: content.length > state.step,
    };
  }
  return state;
}

export const useInfiniteScroll = ({ content, step, ref }) => {
  const [state, dispatch] = useReducer(reducer, {
    loadingAmount: step,
    showLoadButton: content?.length > step,
    step,
    contentLength: content?.length,
  });
  const { showLoadButton, loadingAmount } = state;
  const loadMore = () => dispatch({ type: "LOAD_MORE" });
  const infiniteScroll = () => {
    const isOverlapped =
      window.innerHeight + window.pageYOffset >= ref?.current?.offsetTop;
    if (ref.current && isOverlapped && !showLoadButton) {
      loadMore();
    }
  };

  useEffect(() => {
    dispatch({ type: "UPDATE_CONTENT", payload: { content } });
  }, [content]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);

    return () => {
      window.removeEventListener("scroll", () => infiniteScroll);
    };
  }, [showLoadButton]);

  return {
    content: content?.slice(0, loadingAmount),
    loadMore,
    showLoadButton,
  };
};
