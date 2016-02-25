import * as React from 'react';
import {connect} from 'react-redux'
import {Link, IndexLink} from 'react-router';
import * as moment from 'moment';

import {requestGithubRepositories, requestGithubGists, requestJsFiddle} from './Actions';
import {Activity, Github, JsFiddle, Items} from '../Models';

import {Responsive, ResponsiveTarget} from '../Common/Responsive';

import './Style.css';

class AppComponent extends React.Component<any, any> {
  render() {
    return (
      <div>
        <div className="main-menu">
          <nav className="navbar navbar-fixed-top navbar-light bg-faded">
            <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbar">
              &#9776;
            </button>
            <div className="collapse navbar-toggleable-xs" id="navbar">
              <a className="navbar-brand" href="#">TSWEB</a>
              <ul className="nav navbar-nav">
                <li className="nav-item">
                  <IndexLink className="nav-link" to="/" activeClassName="active">Activities</IndexLink>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/github" activeClassName="active">Github</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/jsfiddle" activeClassName="active">JsFiddle</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="container main-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

interface ActivitiesProps {
  dispatch?: Function;
  activities?: Items<Activity>;
}

const ActivitiesLink = ({title, url, key}):JSX.Element => (
  <a href={url} key={key} className="btn btn-info btn-sm" target="_blank">{title}</a>
)

class ActivitiesComponent extends React.Component<ActivitiesProps, any> {
  render() {
    const items:JSX.Element[] = this.props.activities.items.map((item:Activity, i) => {
      let name:string = item.name;
      let date:string = moment(item.date).format('MMM D, YYYY');
      let preview:string;
      let links:JSX.Element[] = [];

      switch (item.from) {
        case 'github':
          preview = 'Assets/github.svg';
          links.push(<ActivitiesLink title="github" key={0} url={item.github.html_url}/>);
          if (item.github.branches.indexOf('gh-pages') > -1) {
            const ghPages:string = `http://${item.github.owner.login}.github.io/${item.github.name}`;
            links.push(<ActivitiesLink title="pages" key={1} url={ghPages}/>);
          }
          break;
        case 'gist':
          preview = 'Assets/gist.svg';
          links.push(<ActivitiesLink title="gist" key={0} url={item.gist.html_url}/>);
          break;
        case 'jsfiddle':
          preview = 'Assets/jsfiddle.svg';
          links.push(<ActivitiesLink title="jsfiddle" key={0} url={item.jsfiddle.url}/>);
          break;
      }

      return (
        <div className="card" key={i}>
          <img className="card-img-top" src={preview} alt={name} width="100%"/>
          <div className="card-block">
            <h4 className="card-title">{date}</h4>
            <p className="card-text">
              {name}
            </p>
            <p className="card-text">
              {links}
            </p>
          </div>
        </div>
      )
    })

    return (
      <div>
        <Responsive>
          <ResponsiveTarget size={10000}>
            <p>MAX</p>
          </ResponsiveTarget>
          <ResponsiveTarget size={1200}>
            <p>render 1200</p>
          </ResponsiveTarget>
          <ResponsiveTarget size={1000}>
            <p>render 1000</p>
          </ResponsiveTarget>
          <ResponsiveTarget size={800}>
            <p>render 800</p>
          </ResponsiveTarget>
          <ResponsiveTarget size={600}>
            <p>render 600</p>
          </ResponsiveTarget>
          <ResponsiveTarget size={400}>
            <p>render 400</p>
          </ResponsiveTarget>
          <ResponsiveTarget size={200}>
            <p>render 200</p>
          </ResponsiveTarget>
        </Responsive>
        <h1 className="content-activity">Activities</h1>
        <div className="content-activity card-columns">
          {items}
        </div>
      </div>
    )
  }

  componentDidMount():void {
    const {dispatch} = this.props;
    dispatch(requestGithubRepositories());
    dispatch(requestGithubGists());
    dispatch(requestJsFiddle());
  }

  shouldComponentUpdate(nextProps:ActivitiesProps, nextState:any, nextContext:any):boolean {
    return this.props.activities !== nextProps.activities;
  }
}

interface GithubProps {
  dispatch?: Function;
  githubRepositories?: Items<Github.Repository>;
  githubGists?: Items<Github.Gist>;
}

class GithubComponent extends React.Component<GithubProps, any> {
  render() {
    const repositories = this.props.githubRepositories.items
      .map((item:Github.Repository, i) => <li key={i}>{item.name}</li>)
    const gists = this.props.githubGists.items.map((item:Github.Gist, i) => <li key={i}>{item.description}</li>)
    return (
      <div>
        <h1>Github Repositories</h1>
        <ul>{repositories}</ul>
        <h1>Github Gists</h1>
        <ul>{gists}</ul>
      </div>
    )
  }

  componentDidMount():void {
    const {dispatch} = this.props;
    dispatch(requestGithubRepositories());
    dispatch(requestGithubGists());
  }

  shouldComponentUpdate(nextProps:GithubProps, nextState:any, nextContext:any):boolean {
    return this.props.githubRepositories !== nextProps.githubRepositories || this.props.githubGists !== nextProps.githubGists;
  }
}

interface JsFiddleProps {
  dispatch?: Function;
  jsFiddles?: Items<JsFiddle.Fiddle>;
}

class JsFiddleComponent extends React.Component<JsFiddleProps, any> {
  render() {
    const fiddles = this.props.jsFiddles.items.map((item:JsFiddle.Fiddle, i) => <li key={i}>{item.title}</li>)
    return (
      <div>
        <h1>Js Fiddle</h1>
        <ul>{fiddles}</ul>
      </div>
    )
  }

  componentDidMount():void {
    const {dispatch} = this.props;
    dispatch(requestJsFiddle());
  }

  shouldComponentUpdate(nextProps:JsFiddleProps, nextState:any, nextContext:any):boolean {
    return this.props.jsFiddles !== nextProps.jsFiddles;
  }
}

const ConnectedApp = connect(state => state)(AppComponent);
const ConnectedActivities = connect(state => ({
  dispatch: state.dispatch,
  activities: state.activities
}))(ActivitiesComponent);
const ConnectedGithub = connect(state => ({
  dispatch: state.dispatch,
  githubRepositories: state.githubRepositories,
  githubGists: state.githubGists
}))(GithubComponent);
const ConnectedJsFiddle = connect(state => ({
  dispatch: state.dispatch,
  jsFiddles: state.jsFiddles
}))(JsFiddleComponent);

interface XRouteProps {
  component: any;
}

class XRoute extends React.Component<XRouteProps, any> {
  render() {
    return (
      <ConnectedActivities/>
    )
  }
}

export {
  ConnectedApp as App,
  ConnectedActivities as Activities,
  ConnectedGithub as Github,
  ConnectedJsFiddle as JsFiddle,
  XRoute
}