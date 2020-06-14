import ApiService from "./ApiServices";

interface Form {
  _id: string;
  title: string;
  description: string;
  theme: string;
  user_id: string;
  fields: Field[];
  created_at?: Date;
  updated_at?: Date;
  __v: number;
}

interface Field {
  label: string;
  type: string;
  description?: string;
  options: string[];
}

class FormSerice {
  public async add(
    title: string,
    description: string,
    theme: string,
    fields: Field[]
  ): Promise<Form> {
    const { data } = await ApiService.post<Form>("/forms", {
      title,
      description,
      theme,
      fields,
    });

    return data;
  }
}

export default new FormSerice();
