import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Role } from "../entities/Auth/Role";
import { User } from "../entities/Auth/User";
import { MyContext } from "../types";
import {
  LogInResponse,
  UsernamePasswordInput,
  UserResponse,
} from "../Types/Auth";
import { validateRegister } from "../validation/validateRegister";

const SECRET_KEY = process.env.SECRET;

@Resolver()
export class AuthResolver {
  @Query(() => String)
  hello() {
    return "Some Data";
  }

  @Mutation(() => LogInResponse)
  async loginUser(
    @Arg("fields") fields: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<LogInResponse> {
    const { errors, isValid } = validateRegister(fields);
    if (!isValid) {
      return { errors };
    }
    try {
      const user = await User.find({
        where: { email: fields.email },
        relations: ["role"],
      });
      if (!user) {
        return {
          errors: [{ error: "No User Found", field: "email" }],
        };
      }
      const hashedPassword = user[0].password;

      const isValidPassword = await argon2.verify(
        hashedPassword,
        fields.password
      );

      if (!isValidPassword) {
        return {
          errors: [{ error: "Incorrect Credentials", field: "email" }],
        };
      }
      console.log(user);
      const token = jwt.sign(
        { email: user[0].email, role: user[0].role },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      return {
        credentials: {
          expiresIn: 3600,
          role: user[0].role,
          token: token,
        },
      };
    } catch (e) {
      return {
        errors: [{ field: "", error: "Not Found" }],
      };
    }
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Arg("fields") fields: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const { isValid, errors } = validateRegister(fields);
    if (!isValid) {
      return { errors };
    }
    let user;
    try {
      const isUserAlready = await User.findOne({
        where: { email: fields.email },
      });

      if (isUserAlready) {
        return {
          errors: [
            {
              field: "email",
              error: "Ya existe ese email",
            },
          ],
        };
      }

      const hashedPassword = await argon2.hash(fields.password);
      const role = await Role.find({ where: { role: "admin" } });
      const result = await User.create({
        email: fields.email,
        password: hashedPassword,
        role: role[0],
      }).save();
      console.log(result);
      user = result;
    } catch (e) {
      console.log(e);

      return {
        errors: [
          {
            field: "email",
            error: "Algo salió mal :(",
          },
        ],
      };
    }
    return { user };
  }
}
