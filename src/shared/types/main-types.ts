import { Intersect, Record, String } from "runtypes";
import { Runtype } from "runtypes/lib/runtype";

export type Unique<T extends object> = T & { id: string };

export const unique = <T extends Runtype<unknown>>(
  arg: T,
): Intersect<[typeof arg, Record<{ id: String }, false>]> => {
  return Intersect(arg, Record({ id: String }));
};

export type Roles = "admin" | "user";
