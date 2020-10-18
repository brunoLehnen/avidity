import { ResponsePodcastData } from 'api_types';
import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { ApplicationState, PodcastState } from './States';

import * as ACTION_TYPES from '../constants/actions';
import { ActionWithPayload } from '../common/types';

// Selector Input
const getPodcastState = (state: ApplicationState) => state.podcast;

export const getPodcast = createSelector(
  [getPodcastState],
  (selectedPodcast: PodcastState) => selectedPodcast,
);

interface SelectPodcastPayload {
  url: string;
}

function handleSelectPodcast(
  state: PodcastState,
  action: ActionWithPayload<SelectPodcastPayload>,
): PodcastState {
  return {
    ...state,
    url: action.payload.url,
    loading: true,
  };
}

function handleSelectPodcastSuccess(
  state: PodcastState,
  action: ActionWithPayload<ResponsePodcastData>,
): PodcastState {
  return {
    ...state,
    errors: null,
    podcastData: {
      ...state.podcastData,
      ...action.payload,
    },
    loading: false,
  };
}

interface SelectPodcastErrorPayload {
  message: string
}

function handleSelectPodcastFail(
  state: PodcastState,
  action: ActionWithPayload<SelectPodcastErrorPayload>,
): PodcastState {
  return {
    ...state,
    loading: false,
    errors: {
      message: action.payload.message,
    },
  };
}

const PodcastReducer = handleActions<PodcastState, never>(
  {
    [ACTION_TYPES.SELECT_PODCAST]: handleSelectPodcast,
    [ACTION_TYPES.SELECT_PODCAST_SUCCESS]: handleSelectPodcastSuccess,
    [ACTION_TYPES.SELECT_PODCAST_FAIL]: handleSelectPodcastFail,
  },
  { errors: null, loading: false },
);

export default PodcastReducer;
