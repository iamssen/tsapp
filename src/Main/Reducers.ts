import {combineReducers} from 'redux';
import * as moment from 'moment';

import {RECEIVE_GITHUB_REPOSITORIES, RECEIVE_GITHUB_GISTS, RECEIVE_JSFIDDLE} from './Actions';
import {Items, Github, JsFiddle, Activity, Action} from '../Models';

type Repository = Github.Repository;
type Gist = Github.Gist;
type Fiddle = JsFiddle.Fiddle;

const now = Date.now;
const freeze = Object.freeze;
const init = <T>():Items<T> => ({items: freeze([]), updatedAt: 0});

const githubRepositories = (state:Items<Repository> = init<Repository>(), action:Action<Repository>) => {
  if (action.type === RECEIVE_GITHUB_REPOSITORIES) {
    return freeze({
      items: freeze(action.items),
      updatedAt: now()
    })
  }
  return state;
}

const githubGists = (state:Items<Gist> = init<Gist>(), action:Action<Gist>) => {
  if (action.type === RECEIVE_GITHUB_GISTS) {
    return freeze({
      items: freeze(action.items),
      updatedAt: now()
    })
  }
  return state;
}

const jsFiddles = (state:Items<Fiddle> = init<Fiddle>(), action:Action<Fiddle>) => {
  if (action.type === RECEIVE_JSFIDDLE) {
    return freeze({
      items: freeze(action.items),
      updatedAt: now()
    })
  }
  return state;
}

const activities = (state:Items<Activity> = {items: [], updatedAt: 0}, action:Action<any>) => {
  if (action.type === RECEIVE_GITHUB_REPOSITORIES || action.type === RECEIVE_GITHUB_GISTS || action.type === RECEIVE_JSFIDDLE) {
    let oldItems:Activity[];
    let newItems:Activity[];

    switch (action.type) {
      case RECEIVE_GITHUB_REPOSITORIES:
        oldItems = state.items.filter(item => item.from !== 'github');
        newItems = action.items.map((item:Repository) => freeze({
          name: item.name,
          date: moment(item.updated_at).toDate(),
          from: 'github',
          github: item
        }));
        break;

      case RECEIVE_GITHUB_GISTS:
        oldItems = state.items.filter(item => item.from !== 'gist');
        newItems = action.items.map((item:Gist) => freeze({
          name: item.description,
          date: moment(item.updated_at).toDate(),
          from: 'gist',
          gist: item
        }));
        break;

      case RECEIVE_JSFIDDLE:
        oldItems = state.items.filter(item => item.from !== 'jsfiddle');
        newItems = action.items.map((item:Fiddle) => freeze({
          name: item.title,
          date: moment(item.created).toDate(),
          from: 'jsfiddle',
          jsfiddle: item
        }));
        break;
    }

    return freeze({
      items: freeze(newItems.concat(oldItems).sort((a, b) => a.date > b.date ? -1 : 1)),
      updatedAt: now()
    })
  }
  return state;
}

export {
  githubRepositories,
  githubGists,
  jsFiddles,
  activities
};