import { z } from "zod";

const MAX_UPLOAD_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export type DomainSettingsProps = {
  domain?: string;
  image?: any;
  welcomeMessage?: string;
};

export type HelpDeskQuestionsProps = {
  question:string
  answer:string
}

export type FilterQuestionsProps = {
  id:string;
  question:string;
}

export const DomainSettingsSchema = z.object({
  domain: z
    .string()
    .min(4, { message: "Domain en az 4 karakter olmalıdır" })
    .refine(
      (value) => /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/.test(value),
      "Geçerli bir domain giriniz"
    )
    .optional()
    .or(z.literal("").transform(() => undefined)),
  image: z.any().optional(),
  welcomeMessage: z
    .string()
    .min(6, "Hoşgeldin mesajı en az 6 karakter olmalıdır")
    .optional()
    .or(z.literal("").transform(() => undefined)),
})
.refine(
    (schema) => {
      console.log(schema.image[0],'schema.image?')
        if(schema.image?.length) {
            if (
                ACCEPTED_FILE_TYPES.includes(schema.image?.[0].type!) &&
                schema.image?.[0].size <= MAX_UPLOAD_SIZE
            ) {
                return true;
            }

            if(!schema.image?.length) {
                return true 
            }

            return false
        }


        return true

    }, {
        message: 'Dosya boyutu 2MB\'dan fazla olamaz ve sadece jpg, jpeg, ve png dosya türlerini yükleyebilirsiniz',
        path: ['image']
    }
)

export const AddDomainSchema = z.object({
  domain: z
    .string()
    .min(4, { message: "Domain en az 4 karakter olmalıdır" })
    .refine(
      (value) => /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/.test(value),
      "Geçerli bir domain giriniz"
    ),
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: "Dosya boyutu 2MB'dan fazla olamaz",
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: "Sadece jpg, jpeg, ve png dosya türlerini yükleyebilirsiniz",
    }),
});


export const HelpDeskQuestionsSchema = z.object({
  question: z.string().min(1, {message: 'Soru en az 1 karakter olmalıdır'}),
  answer: z.string().min(1, {message: 'Cevap en az 1 karakter olmalıdır'})
})

export const FilterQuestionsSchema = z.object({
   question: z.string().min(1, {message: 'Soru en az 1 karakter olmalıdır'}),
})

export const AddProductSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Ürün adı en az 3 karakter olmalıdır",
    }),
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: 'Dosya boyutu 2MB\'dan fazla olamaz'
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type!), {
      message: 'Sadece jpg, jpeg, ve png dosya türlerini yükleyebilirsiniz'
    }),
  price: z
    .string()
})