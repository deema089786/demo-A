export interface ConfigDatabase {
  host: string;
  database: string;
  username: string;
  password: string;
  port: number;
  synchronize: boolean;
}

export interface ConfigGoogle {
  clientId: string;
  clientSecrete: string;
}

export interface Config {
  database: ConfigDatabase;
  google: ConfigGoogle;
}
