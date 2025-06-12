export interface Users {
  id : number,
  name : string,
  email: string;
  roldId : number,
  roleName :String,
  createdAt : Date,

}
export interface AddUsersForm {
  name: string;
  email: string;
  password : string
  roleId: number;
}
export interface UpdateUsersForm {
  id: number;
  name: string;
  email: string;
  roleId: number;
}
