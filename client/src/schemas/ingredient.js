import yup from 'schemas/yup'

const ingredientsValidationSchema = yup.object({
  synonyms: yup.string(),
  id: yup.string().required(),
  name: yup.string().required(),
  translation_heb: yup.string(),
  description: yup.string(),
  tags: yup.array().of(yup.string()),
  groups: yup.array().of(yup.string()),
  isSearchable: yup.boolean().required(),
  subIngredients: yup.array().of(yup.string()),
  excludedInDiets: yup.array().of(yup.string()),
})

export default ingredientsValidationSchema
