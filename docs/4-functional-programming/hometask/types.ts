export interface Image {
  userID: string
  url: string
}

export interface User {
  userID: string
  username: string
  country: string
  name: string
}

interface Payment {
  totalSum: number
  date: string
}

export interface Account {
  userID: string;
  posts: number;
  payments: Payment[];
}

export interface Rows {
  url: string;
  username: string;
  country: string;
  name: string;
  payments: number;
  posts: number;
}
