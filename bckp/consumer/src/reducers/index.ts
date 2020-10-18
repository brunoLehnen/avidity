import { combineReducers } from 'redux';
import PodcastReducer from './PodcastReducer';

const ApplicationReducer = combineReducers({
  podcast: PodcastReducer,
});

export default ApplicationReducer;
