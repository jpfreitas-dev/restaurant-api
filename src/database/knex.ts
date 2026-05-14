// IMPORTANTE: Este arquivo é responsável por configurar a conexão com o banco de dados usando o Knex. 

// Importa o método de configuração do Knex do pacote "knex", renomeando-o para "knexConfig" para evitar confusão com a instância do Knex que será criada posteriormente.
import { knex as knexConfig } from "knex"; 

// Importa as configurações do Knex a partir do arquivo "knexfile.ts", que contém as informações de conexão para diferentes ambientes (desenvolvimento, produção, etc.).
import config from "../../knexfile"; 

// Cria uma instância do Knex usando as configurações importadas. O método "knexConfig" é chamado com o objeto de configuração, e a instância resultante é exportada para ser usada em outras partes da aplicação.
export const knex = knexConfig(config);