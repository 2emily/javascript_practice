{

  type Video = {
    title: string;
    keywords: string;
  };

  type Optional<T> = {
    [P in keyof T]?: T[P]; // for...in
  };

  type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
  };

  type VideoOptional = Optional<Video>;

  type Animal = {
    name: string;
    age: number;
  };
  const animal: Optional<Animal> = {
    name: 'dog',
  };
  animal.name = '나비';

  const video: ReadOnly<Video> = {
    title: 'hi',
    keywords: '먹방',
  };

  type Nullable<T> = { [P in keyof T]: T[P] | null };
  const obj2: Nullable<Video> = {
    title: 'hi',
    keywords: null,
  };

  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };

  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  };
}
