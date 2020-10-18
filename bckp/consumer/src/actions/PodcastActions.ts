import { ResponsePodcastData } from 'api_types';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { Dispatch } from '../common/types';
import { ApplicationState } from '../reducers/States';

import * as ACTION_TYPES from '../constants/actions';
import * as PodcastService from '../services/PodcastService';

function selectPodcast(url: string) {
  return {
    type: ACTION_TYPES.SELECT_PODCAST,
    payload: { url },
  };
}

function selectPodcastSuccess(podcast: ResponsePodcastData) {
  return {
    type: ACTION_TYPES.SELECT_PODCAST_SUCCESS,
    payload: podcast,
  };
}

function selectPodcastFail(error: Error) {
  return {
    type: ACTION_TYPES.SELECT_PODCAST_FAIL,
    payload: { error },
  };
}

function fetchPodcast(url: string): ThunkAction<void, ApplicationState, unknown, Action> {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(selectPodcast(url));
      const podcast = await PodcastService.getPodcastByURL(url);
      dispatch(selectPodcastSuccess(podcast));
    } catch (e) {
      dispatch(selectPodcastFail(e));
    }
  };
}

export default fetchPodcast;
