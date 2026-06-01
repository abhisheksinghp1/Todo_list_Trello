from pydantic import BaseModel, EmailStr

class UserCreate(Basemodel):
    name: str
    email : EmailStr
    password: str

class UserLogin(Basemodel):
    email: EmailStr
    password: str

class UserRespaonse(BaseModel):
    id:int
    name: str
    email: str

    class config:
        from_attributes = True

class Token(BaseModel):
    acess_token: str
    token_type: str