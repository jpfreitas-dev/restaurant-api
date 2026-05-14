// Este arquivo é responsável por definir as rotas da aplicação. Ele importa os arquivos de rotas específicos para cada recurso (produtos, mesas, sessões de mesa e pedidos) e os agrupa em um único router principal. O router principal é exportado para ser usado no arquivo de entrada da aplicação (src/server.ts), onde será registrado como middleware para que as rotas definidas aqui sejam acessíveis a partir do servidor Express.

import { Router } from "express"; 
import { productsRoutes } from "./products-routes";
import { tablesRoutes } from "./tables-routes";
import { tablesSessionsRoutes } from "./tables-sessions-routes";
import { ordersRoutes } from "./orders-routes";

const routes = Router(); 

routes.use("/products", productsRoutes); 
routes.use("/tables", tablesRoutes);
routes.use("/tables-sessions", tablesSessionsRoutes);
routes.use("/orders", ordersRoutes);

export { routes };
