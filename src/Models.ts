export interface Activity {
  name:string;
  date:Date;
  from:string;
  github?:Github.Repository;
  gist?:Github.Gist;
  jsfiddle?:JsFiddle.Fiddle;
}

export interface Items<T> {
  items: T[];
  updatedAt: number;
}

export interface Action<T> {
  type: string;
  items: T[];
}

export module Github {
  export interface Gist {
    id: string;
    description: string;
    html_url: string;
    url:string;
    created_at:string;
    updated_at:string;
  }

  export interface Repository {
    id: number;
    name:string;
    owner:{login:string};
    full_name:string;
    html_url:string;
    description:string;
    created_at:string;
    updated_at:string;
    pushed_at:string;
    git_url: string;
    open_issues:number;
    default_branch:string;

    branches:string[];
  }
}

export module JsFiddle {
  export interface Fiddle {
    framework:string;
    title:string;
    url:string;
    created:string;
  }
}