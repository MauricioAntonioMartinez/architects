import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection, getConnection } from "typeorm";
import {
  Building,
  BuildingStatus,
  Employee,
  Job,
  Material,
  Payment,
  PaymentMode,
  Provider,
  Purchase,
  PurchaseKind,
  Role,
  StatusPayment,
  StatusPurchase,
  User,
  WeekDate,
} from "./entities/index";
import { createUserLoader } from "./loaders/User";
import { createWeekDateLoader } from "./loaders/weekDate";
import { isAuth } from "./middlewares/is-Auth";
import {
  AuthResolver,
  BuildingResolver,
  EmployeeResolver,
  JobResolver,
  KindsResolver,
  PaymentResolver,
  PurchaseResolver,
} from "./resolvers/index";
import { MyContext } from "./types";

const main = async () => {
  const _connection = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URI,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "migrations/*")],
    entities: [
      Building,
      Role,
      User,
      BuildingStatus,
      Employee,
      PaymentMode,
      Purchase,
      StatusPurchase,
      Material,
      PurchaseKind,
      Provider,
      Job,
      Payment,
      StatusPayment,
      WeekDate,
    ],
  });
  const app = express();
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  // await PaymentMode.create({ payment: "Tarjeta" }).save();
  // await PaymentMode.create({ payment: "Efectivo" }).save();
  // await PaymentMode.create({ payment: "Cheque" }).save();

  // await StatusPurchase.create({ status: "Comprado" }).save();
  // await StatusPurchase.create({ status: "En curso" }).save();
  // await StatusPurchase.create({ status: "Pagado" }).save();

  // await PurchaseKind.create({ kind: "Nota" }).save();
  // await PurchaseKind.create({ kind: "Producto" }).save();

  // await StatusPayment.create({ status: "Pagado" }).save();
  // await StatusPayment.create({ status: "Pendiente" }).save();

  // await BuildingStatus.create({ status: "Cimentación" }).save();
  // await BuildingStatus.create({ status: "Preliminar" }).save();
  // await BuildingStatus.create({ status: "Estructura de concreto" }).save();
  // await BuildingStatus.create({ status: "Terminado" }).save();

  // await Role.create({ role: "admin" }).save();

  app.use(isAuth);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AuthResolver,
        EmployeeResolver,
        BuildingResolver,
        JobResolver,
        KindsResolver,
        PurchaseResolver,
        PaymentResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      req,
      res,
      userLoader: createUserLoader(),
      dateLoader: createWeekDateLoader(),
      db: getConnection(),
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
};

main().catch((err) => {
  console.error(err);
});
