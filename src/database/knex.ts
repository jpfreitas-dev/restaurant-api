import { knex as knexConfig } from "knex"; // importando a função knex do pacote knex, e renomeando ela para knexConfig para evitar conflitos de nomes.

import config from "../../knexfile"; 

export const knex = knexConfig(config);