export interface Tag {
  no: number;
  name: string;
}

export interface Contact {
  company_name: string | null;
  company_part: string | null;
  company_phone: string | null;
  company_position: string | null;
  email: string | null;
  memo: string | null;
  name: string | null;
  no: number;
  phone: string | null;
  tags: Array<Tag>;
}
