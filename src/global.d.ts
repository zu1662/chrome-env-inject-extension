declare module '*.less' {
  const classes: { [className: string]: string };
  export default classes;
}

interface InjectType {
  id: string;
  title: string;
  url?: string;
  color?: string;
  cookies?: string[];
  scripts?: string[];
}
