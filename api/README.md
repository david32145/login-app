# API

Usar mongoDB para entidades do sistema.

## Documents

### User

- _id: Mongo.ObjectID;
- name: String;
- bio: String;
- email: String;
- password_hash: String;
- avatar_uri: String;
- forms: Form[];
- created_at: Date;
- updated_at: Date;
- _v: number.

### Form

- _id: Mongo.ObjectID;
- title: String;
- description: String;
- theme: String;
- user_id: User._id;
- fields: {label: String, type: String, options: String[]} [];
- created_at: Date;
- updated_at: Date;
- _v: number.

### FormResponse

- _id: Mongo.ObjectID
- form_id: Form._id;
- fields: {label: String, response: String} [];
- created_at: Date;
- updated_at: Date;
- _v: number.
