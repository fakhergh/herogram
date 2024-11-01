import * as yup from "yup";

yup.setLocale({
  mixed: {
    default: "mixed.default",
    required: "mixed.required",
    notNull: `mixed.notNull`,
    notOneOf: ({ values }): string =>
      `mixed.notOneOf/{"values":${values.join()}`,
    notType: ({ type }): string => `mixed.notType/{"type":${type}}`,
  },
  string: {
    length: ({ length }): string => `string.length/{"min":${length}}`,
    min: ({ min }): string => `string.min/{"min":${min}}`,
    max: ({ max }): string => `string.max/{"max":${max}}`,
    matches: ({ regex }): string => `string.matches/{"regex":${regex}}`,
    email: "string.email",
    url: "string.url",
    trim: "string.trim",
    lowercase: "string.lowercase",
    uppercase: "string.uppercase",
  },
  number: {
    min: ({ min }): string => `number.min/{"min":${min}}`,
    max: ({ max }): string => `number.max/{"max":${max}}`,
    lessThan: ({ less }): string => `number.lessThan/{"lessThan":${less}}`,
    moreThan: ({ more }): string => `number.moreThan/{"moreThan":${more}}`,
    positive: "number.positive",
    negative: "number.negative",
    integer: "number.integer",
  },
  date: {
    min: ({ min }): string => `date.min/{"min":${min}}`,
    max: ({ max }): string => `date.max/{"max":${max}}`,
  },
  object: {
    noUnknown: ({ path }): string => `object.noUnknown/{"path": ${path}}`,
  },
  array: {
    min: ({ min }): string => `array.min/{"min":${min}}`,
    max: ({ max }): string => `array.max/{"max":${max}}`,
  },
});

export interface BuildErrorOptions {
  error?: string | object;
  t: any;
}

export function buildError({ t, error }: BuildErrorOptions) {
  if (!error) return "";

  let errorKey = error;
  let options = {};

  if (typeof error === "string" && error.includes("/")) {
    const [key, opts] = error?.split("/");
    errorKey = key;
    try {
      options = JSON.parse(opts || "{}");
    } catch (e) {
      console.error(e);
    }
  }

  return t(errorKey, options).toString();
}

export default yup;
