export interface Iuser {
  name: string,
  email: string,
  password: string,
  mobile: string,
  createdAt?: Date,
  updatedAt?: Date;
}

export interface registerBody {
  name: string,
  email: string,
  password: string
  mobile:string
}

export interface loginBody {
 
  email: string,
  password: string
  
}


export interface JWTpayload {

    userId: string,
    email?: string 

}





