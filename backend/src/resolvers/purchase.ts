import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { DeepPartial, FindManyOptions, Like } from "typeorm";
import { Material, Provider, Purchase } from "../entities";
import { MyContext } from "../types";
import {
  CreatePurchase,
  MaterialInput,
  PurchasesResponse,
  Search,
} from "../Types/purchase";
import { validatePurchase } from "../validation/purchase";

const PURCHASE_RELATIONS = [
  "purchase_kind",
  "building",
  "material",
  "building_status",
  "status_purchase",
  "payment_mode",
];

@Resolver(Purchase)
export class PurchaseResolver {
  @FieldResolver(() => Material)
  material(@Root() purchase: Purchase, @Ctx() { dateLoader }: MyContext) {
    return Material.findOne(purchase.material.id, { relations: ["provider"] });
    // return createBuildingLoader.load(building.id);
    // TODO:  do a data loader of this shit
  }

  @Query(() => PurchasesResponse)
  async purchases(
    @Arg("cursor", () => String, { nullable: true }) cursor: string,
    @Arg("limit", () => Int) limit: number
  ): Promise<PurchasesResponse> {
    let purchases: Purchase[];
    const fetchedLimit = limit + 1;
    const configs: FindManyOptions<Purchase> = {
      relations: PURCHASE_RELATIONS,
      order: {
        purchase_date: "DESC",
      },
      take: fetchedLimit,
    };
    if (!cursor)
      purchases = await Purchase.find({
        ...configs,
      });
    else
      purchases = await Purchase.find({
        ...configs,
        where: (db: any) => {
          db.where(
            `"Purchase__building".name LIKE '${cursor}%' OR
             "Purchase"."note_number" LIKE '${cursor}%' OR
             "Purchase__building_status"."status" LIKE '${cursor}%'`
          );
        },
      });

    const hasMore = purchases.length === fetchedLimit;

    return {
      purchases: purchases.slice(0, hasMore ? -1 : purchases.length),
      hasMore,
    };
  }

  @Query(() => Purchase, { nullable: true })
  async purchase(
    @Arg("purchase_id") purchase_id: string
  ): Promise<Purchase | undefined> {
    return Purchase.findOne(purchase_id, {
      relations: PURCHASE_RELATIONS,
    });
  }

  @Query(() => [Search], { nullable: true })
  async materialSearch(
    @Arg("material", { nullable: true }) material: string
  ): Promise<Search[]> {
    const materials = await Material.find({
      where: {
        description: Like(`%${material}%`),
      },
      select: ["description"],
    });
    return materials.map((m) => {
      return {
        value: m.description,
      };
    });
  }

  @Query(() => [Search], { nullable: true })
  async providerSearch(
    @Arg("provider", { nullable: true }) provider: string
  ): Promise<Search[]> {
    const providers = await Provider.find({
      where: {
        name: Like(`%${provider}%`),
      },
    });
    return providers.map((p) => {
      return {
        value: p.name,
      };
    });
  }

  @Mutation(() => CreatePurchase)
  async addEditPurchase(
    @Arg("fields") fields: MaterialInput,
    @Arg("isEditMode", { nullable: true }) isEditMode: boolean = false,
    @Ctx() { db }: MyContext
  ): Promise<CreatePurchase> {
    const { errors, isValid } = validatePurchase(fields);
    if (!isValid) {
      return { errors };
    }
    let purchase: Purchase | undefined;

    await db.transaction(async (tx) => {
      let provider = await tx.findOne(Provider, {
        where: {
          name: fields.provider,
        },
      });
      if (!provider)
        provider = await tx
          .create(Provider, {
            name: fields.provider,
          })
          .save();

      let material = await tx.findOne(Material, {
        where: {
          description: fields.material,
        },
      });

      if (!material) {
        material = await tx
          .create(Material, {
            description: fields.material,
            provider,
          })
          .save();
      } else {
        material.provider = provider;
        await material.save();
      }

      if (!isEditMode) {
        delete fields.id;
        purchase = await tx
          .create(Purchase, {
            ...(fields as DeepPartial<Purchase>),
            material,
          })
          .save();
      } else {
        delete fields.provider;
        delete fields.material;
        console.log(fields);
        await tx.update(Purchase, fields.id, {
          ...(fields as DeepPartial<Purchase>),
          material,
        });

        purchase = { id: fields!.id } as Purchase;
      }
    });

    if (!purchase)
      return {
        errors: [{ error: "Purchase not found", field: "" }],
      };

    purchase = await Purchase.findOne(purchase.id, {
      relations: PURCHASE_RELATIONS,
    });
    return { purchase };
  }
}
