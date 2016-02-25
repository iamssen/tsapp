import * as React from 'react';

interface Content {
  contents?: JSX.Element;
  contentsClass?: React.ReactType;
  size: number;
}

interface ResponsiveState {
  stageWidth?:number;
  contents?:Content[];
}

export class Responsive extends React.Component<any, ResponsiveState> {
  private resizeHandler:EventListener;

  constructor(props, context) {
    super(props, context);
  }

  render() {
    if (!this.state || !this.state.contents) return <div className="responsive"></div>;


    const content = this.state.contents.reduce((a, b) => {
        if (a) return a;
        if (b.size < this.state.stageWidth) return b;
      }, null) || this.state.contents[this.state.contents.length - 1];

    return <div className="responsive">{content.contents}</div>;
  }

  syncSize() {
    const stageWidth:number = (document.body) ? document.body.clientWidth : window.innerWidth;
    this.setState({stageWidth});
  }

  componentDidMount():void {
    const contents = this.props.children
      .map((target:ResponsiveTarget) => ({
        contents: target.props.children,
        contentsClass: target.props.conent,
        size: target.props.size
      }))
      .sort((a, b) => a.size > b.size ? -1 : 1);

    this.setState({contents});
    this.syncSize();
    this.resizeHandler = (event:Event) => this.syncSize();
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount():void {
    window.removeEventListener('resize', this.resizeHandler);
    this.resizeHandler = null;
  }

  shouldComponentUpdate(nextProps:any, nextState:ResponsiveState, nextContext:any):boolean {
    return this.state !== nextState;
    //return this.state && (this.state.stageWidth !== nextState.stageWidth || this.state.contents !== nextState.contents);
  }
}

interface ResponsiveTargetProps {
  conent?: React.ReactType;
  children?: JSX.Element,
  size:number;
}

export class ResponsiveTarget extends React.Component<ResponsiveTargetProps, any> {
  render() {
    return null;
  }
}