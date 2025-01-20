import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";


export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            email : "test@gmail.com"
        }   
    })
}


export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            email: "test@gmail.com",
            password: await bcrypt.hash("123456", 10),
            name: "test",
            token: "test" 
        }
    });
};

export const getTestUser = async () =>{
    return prismaClient.user.findFirstOrThrow({
        where : {
            email : "test@gmail.com"
        }
    })
}

export const removeAllTestMeal = async () =>{
    return prismaClient.meal.deleteMany({
        where :{
            email : "test@gmail.com"
        }
    })
}

export const createTestMeal = async () => {
    await prismaClient.meal.create({
        data: {
            email: "test@gmail.com",
            nameMeal : "test",
            category : "test",
            instructions : "test",

        }
    });
}

export const getTestMeal = async () =>{
    return await prismaClient.meal.findFirst({
          where:{
              email:"test@gmail.com",
          }
      })
  }