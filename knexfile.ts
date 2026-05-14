export default {
  client: "sqlite3",
  connection: {
    filename: "./src/database/restaurant.db", 
  },

  // Configura o pool de conexões para o SQLite, garantindo que a chave estrangeira seja ativada para cada conexão criada. Isso é necessário porque o SQLite não ativa as chaves estrangeiras por padrão.
  pool: { 
    afterCreate: (connection: any, done: any) => {
      connection.run("PRAGMA foreign_keys = ON");
      done();
    }
  },
  
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./src/database/migrations",
  },
  seeds: {
    extension: "ts",
    directory: "./src/database/seeds",
  }
}